use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use mpl_token_metadata::accounts::Metadata;

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

declare_id!("9dC52fm1DiZyrZkfG6ZhmTn5PM6ekMENKoAeBxHhjRpA");

#[program]
pub mod market {
    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>) -> Result<()> {
        ctx.accounts.market.items = Vec::new();
        Ok(())
    }

    pub fn sell_ticket(ctx: Context<SellTicket>, lamports: u64) -> Result<()> {
        // collection은 server owned여야 함
        let collection_token_account = &ctx.accounts.collection_token_account;
        require_keys_eq!(collection_token_account.owner.key(), SERVER_PUBKEY);

        // ticket은 collection verified여야 함
        let ticket_metadata_pda = &ctx.accounts.ticket_metadata_pda;
        let metadata = Metadata::try_from(&ticket_metadata_pda.to_account_info())?;
        let metadata_collection = metadata.collection.unwrap();
        require_eq!(metadata_collection.verified, true);
        require_keys_eq!(metadata_collection.key, collection_token_account.mint);

        // seller의 ticket을 market에게 전송함
        let ticket_token_account = &ctx.accounts.ticket_token_account;
        let ticket_token_account_market = &ctx.accounts.ticket_token_account_market;
        let seller = &ctx.accounts.seller;
        let token_program = &ctx.accounts.token_program;

        let cpi_accounts = Transfer {
            from: ticket_token_account.to_account_info(),
            to: ticket_token_account_market.to_account_info(),
            authority: seller.to_account_info(),
        };
        let cpi_program = token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, 1)?;

        let market = &mut ctx.accounts.market;
        let item = Item {
            seller: seller.key(),
            ticket_mint: ticket_token_account.mint,
            lamports,
        };
        market.items.push(item);
        Ok(())
    }

    pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
        let market = &mut ctx.accounts.market;
        let ticket_mint = &ctx.accounts.ticket_mint;

        if let Some(item_index) = market
            .items
            .iter()
            .position(|item| item.ticket_mint == ticket_mint.key())
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
            .retain(|item| item.ticket_mint != ticket_mint.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(
        mut,
        address = SERVER_PUBKEY
    )]
    pub server: Signer<'info>,

    #[account(
        init,
        payer = server,
        space = 8 + 24 + 72 * 100
    )]
    pub market: Account<'info, Market>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Market {
    pub items: Vec<Item>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Item {
    pub seller: Pubkey,
    pub ticket_mint: Pubkey,
    pub lamports: u64,
}

#[derive(Accounts)]
pub struct SellTicket<'info> {
    pub seller: Signer<'info>,

    #[account(mut)]
    pub market: Account<'info, Market>,

    pub collection_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub ticket_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub ticket_token_account_market: Account<'info, TokenAccount>,
    /// CHECK: validated in access control logic
    pub ticket_metadata_pda: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    pub buyer: Signer<'info>,

    #[account(mut)]
    pub market: Account<'info, Market>,

    pub ticket_mint: Account<'info, Mint>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Ticket not found")]
    TicketNotFound,
}
