use anchor_lang::prelude::*;

declare_id!("8Zg6pznFrTJTLgeT6p5FVhLSwiaMR3xHEGrBLpLQoYpx");

#[program]
pub mod market {
    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>) -> Result<()> {
        ctx.accounts.market.tickets = Vec::new();
        Ok(())
    }

    pub fn sell(ctx: Context<Sell>, nft_address: Pubkey, lamports_price: u64) -> Result<()> {
        let ticket = Ticket {
            nft_address,
            lamports_price,
        };
        ctx.accounts.market.tickets.push(ticket);
        Ok(())
    }

    pub fn buy(ctx: Context<Buy>, nft_address: Pubkey) -> Result<()> {
        ctx.accounts
            .market
            .tickets
            .retain(|item| item.nft_address != nft_address);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(init, payer = user, space = 9000)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Market {
    pub tickets: Vec<Ticket>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Ticket {
    pub nft_address: Pubkey,
    pub lamports_price: u64,
}

#[derive(Accounts)]
pub struct Sell<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    pub seller: Signer<'info>,
}

#[derive(Accounts)]
pub struct Buy<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    pub buyer: Signer<'info>,
}
