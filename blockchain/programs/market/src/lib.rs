use anchor_lang::prelude::*;
use anchor_spl::token;
use anchor_spl::token::{Token, TokenAccount};

declare_id!("9dC52fm1DiZyrZkfG6ZhmTn5PM6ekMENKoAeBxHhjRpA");

#[program]
pub mod market {
    use mpl_token_metadata::accounts::Metadata;

    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>) -> Result<()> {
        ctx.accounts.market.authority = ctx.accounts.server.key();
        ctx.accounts.market.items = Vec::new();
        Ok(())
    }

    pub fn sell_ticket(ctx: Context<SellTicket>, lamports: u64) -> Result<()> {
        // collection이 server owned여야 함
        let market = &mut ctx.accounts.market;
        let collection = &ctx.accounts.collection;
        require_keys_eq!(collection.owner.key(), market.authority);

        // ticket이 collection verified여야 함
        let ticket = &ctx.accounts.ticket;
        let metadata = Metadata::try_from(&ticket.to_account_info())?;
        let metadata_collection = metadata.collection.unwrap();
        require_keys_eq!(metadata_collection.key, collection.key());
        require_eq!(metadata_collection.verified, true);

        let item = Item {
            ticket: ticket.key(),
            lamports,
        };
        market.items.push(item);
        Ok(())
    }

    pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
        let market = &mut ctx.accounts.market;
        let ticket = &ctx.accounts.ticket;
        if let Some(item_index) = market
            .items
            .iter()
            .position(|item| item.ticket == ticket.key())
        {
            let item = &market.items[item_index];
            let buyer = &ctx.accounts.buyer;

            // **seller.to_account_info().try_borrow_mut_lamports()? = item.lamports;
            // **buyer.to_account_info().try_borrow_mut_lamports()? = item.lamports;
        } else {
            return Err(ErrorCode::TicketNotFound.into());
        }

        market
            .items
            .retain(|item| item.ticket != ctx.accounts.ticket.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(init, payer = server, space = 8 + 24 + 32 + 40 * 100)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub server: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Market {
    pub authority: Pubkey,
    pub items: Vec<Item>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Item {
    pub ticket: Pubkey,
    pub lamports: u64,
}

#[derive(Accounts)]
pub struct SellTicket<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    pub seller: Signer<'info>,
    pub collection: Account<'info, TokenAccount>, // owned by server
    pub ticket: Account<'info, TokenAccount>,     // owned by seller
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    pub buyer: Signer<'info>,
    pub ticket: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Ticket not found")]
    TicketNotFound,
}
