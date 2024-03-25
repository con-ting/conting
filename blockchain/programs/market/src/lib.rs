use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use mpl_token_metadata::accounts::Metadata;

declare_id!("MarqygkQw8N9f1byiDrWvtbKs6iDfeWiUmBpovQiJpi");

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

#[program]
pub mod market {
    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>) -> Result<()> {
        ctx.accounts.market.escrows = Vec::new();
        Ok(())
    }

    pub fn sell_ticket(ctx: Context<SellTicket>, lamports: u64) -> Result<()> {
        let metadata = Metadata::try_from(&ctx.accounts.metadata_pda.to_account_info())?;
        let metadata_collection = metadata.collection.unwrap();
        require_eq!(metadata_collection.verified, true);
        require_keys_eq!(metadata_collection.key, ctx.accounts.collection_token.mint);

        let escrow = &mut ctx.accounts.escrow;
        escrow.bump = ctx.bumps.escrow;
        escrow.authority = ctx.accounts.seller.key();
        escrow.escrowed_token = ctx.accounts.escrowed_token.key();
        escrow.lamports = lamports;

        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.sellers_token.to_account_info(),
                    to: ctx.accounts.escrowed_token.to_account_info(),
                    authority: ctx.accounts.seller.to_account_info(),
                },
            ),
            1,
        )?;

        let market = &mut ctx.accounts.market;
        market.escrows.push(escrow.key());
        Ok(())
    }

    pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.escrowed_token.to_account_info(),
                    to: ctx.accounts.buyers_token.to_account_info(),
                    authority: ctx.accounts.escrow.to_account_info(),
                },
                &[&[
                    "escrow".as_bytes(),
                    ctx.accounts.escrow.authority.as_ref(),
                    &[ctx.accounts.escrow.bump],
                ]],
            ),
            ctx.accounts.escrowed_token.amount,
        )?;

        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.buyer.to_account_info(),
                    to: ctx.accounts.seller.to_account_info(),
                },
            ),
            ctx.accounts.escrow.lamports,
        )?;

        // token::close_account(CpiContext::new_with_signer(
        //     ctx.accounts.token_program.to_account_info(),
        //     token::CloseAccount {
        //         account: ctx.accounts.escrowed_token.to_account_info(),
        //         destination: ctx.accounts.seller.to_account_info(),
        //         authority: ctx.accounts.escrow.to_account_info(),
        //     },
        //     &[&[
        //         "escrow".as_bytes(),
        //         ctx.accounts.escrow.authority.as_ref(),
        //         &[ctx.accounts.escrow.bump],
        //     ]],
        // ))?;

        let escrow = ctx.accounts.escrow.key();
        let escrows = &mut ctx.accounts.market.escrows;
        if let Some(index) = escrows.iter().position(|x| *x == escrow) {
            escrows.remove(index);
        }
        Ok(())
    }

    pub fn cancel(ctx: Context<Cancel>) -> Result<()> {
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.escrowed_token.to_account_info(),
                    to: ctx.accounts.sellers_token.to_account_info(),
                    authority: ctx.accounts.escrow.to_account_info(),
                },
                &[&[
                    "escrow".as_bytes(),
                    ctx.accounts.seller.key().as_ref(),
                    &[ctx.accounts.escrow.bump],
                ]],
            ),
            ctx.accounts.escrowed_token.amount,
        )?;

        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::CloseAccount {
                account: ctx.accounts.escrowed_token.to_account_info(),
                destination: ctx.accounts.seller.to_account_info(),
                authority: ctx.accounts.escrow.to_account_info(),
            },
            &[&[
                "escrow".as_bytes(),
                ctx.accounts.seller.key().as_ref(),
                &[ctx.accounts.escrow.bump],
            ]],
        ))?;

        let escrow = ctx.accounts.escrow.key();
        let escrows = &mut ctx.accounts.market.escrows;
        if let Some(index) = escrows.iter().position(|x| *x == escrow) {
            escrows.remove(index);
        }
        Ok(())
    }
}

#[account]
pub struct Market {
    pub escrows: Vec<Pubkey>,
}

#[account]
pub struct Escrow {
    pub authority: Pubkey,
    pub bump: u8,
    pub escrowed_token: Pubkey,
    pub lamports: u64,
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(mut, address = SERVER_PUBKEY)]
    pub server: Signer<'info>,

    #[account(
        init,
        payer = server,
        space = 8 + 24 + 32 * 100
    )]
    pub market: Account<'info, Market>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SellTicket<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(mut)]
    pub market: Account<'info, Market>,

    pub mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = sellers_token.mint == mint.key(),
        constraint = sellers_token.owner == seller.key()
    )]
    pub sellers_token: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = seller,
        space = 8 + 80,
        seeds = ["escrow".as_bytes(), seller.key().as_ref()],
        bump,
    )]
    pub escrow: Account<'info, Escrow>,
    #[account(
        init,
        payer = seller,
        token::mint = mint,
        token::authority = escrow,
    )]
    pub escrowed_token: Account<'info, TokenAccount>,

    #[account(constraint = collection_token.owner == SERVER_PUBKEY)]
    pub collection_token: Account<'info, TokenAccount>,
    /// CHECK:
    pub metadata_pda: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK:
    #[account(mut)]
    pub seller: UncheckedAccount<'info>,
    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(
        mut,
        seeds = ["escrow".as_bytes(), seller.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(mut, constraint = escrowed_token.key() == escrow.escrowed_token)]
    pub escrowed_token: Account<'info, TokenAccount>,
    #[account(mut, constraint = buyers_token.mint == escrowed_token.mint)]
    pub buyers_token: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Cancel<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(
        mut,
        close = seller,
        constraint = escrow.authority == seller.key(),
        seeds = ["escrow".as_bytes(), seller.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(mut, constraint = escrowed_token.key() == escrow.escrowed_token)]
    pub escrowed_token: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = sellers_token.mint == escrowed_token.mint,
        constraint = sellers_token.owner == seller.key(),
    )]
    sellers_token: Account<'info, TokenAccount>,

    token_program: Program<'info, Token>,
}
