use anchor_lang::{prelude::*, system_program};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount},
};
use mpl_token_metadata::accounts::Metadata;

declare_id!("MarqygkQw8N9f1byiDrWvtbKs6iDfeWiUmBpovQiJpi");

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

#[program]
pub mod market {
    use super::*;

    pub fn sell_ticket(ctx: Context<SellTicket>, lamports: u64) -> Result<()> {
        let metadata = Metadata::try_from(&ctx.accounts.metadata_pda.to_account_info())?;
        let metadata_collection = metadata.collection.unwrap();
        require_eq!(metadata_collection.verified, true);
        require_keys_eq!(metadata_collection.key, ctx.accounts.collection_token.mint);

        let escrow = &mut ctx.accounts.escrow;
        escrow.authority = ctx.accounts.seller.key();
        escrow.mint = ctx.accounts.mint.key();
        escrow.escrowed_token = ctx.accounts.escrowed_token.key();
        escrow.lamports = lamports;
        escrow.bump = ctx.bumps.escrow;

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

        token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::CloseAccount {
                account: ctx.accounts.escrowed_token.to_account_info(),
                destination: ctx.accounts.seller.to_account_info(),
                authority: ctx.accounts.escrow.to_account_info(),
            },
            &[&[
                "escrow".as_bytes(),
                ctx.accounts.escrow.authority.as_ref(),
                &[ctx.accounts.escrow.bump],
            ]],
        ))?;
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
        Ok(())
    }
}

#[account]
pub struct Escrow {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub escrowed_token: Pubkey,
    pub lamports: u64,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct SellTicket<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,

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
        space = 8 + 120,
        seeds = ["escrow".as_bytes(), seller.key().as_ref()],
        bump,
    )]
    pub escrow: Account<'info, Escrow>,
    #[account(
        init_if_needed,
        payer = seller,
        associated_token::mint = mint,
        associated_token::authority = escrow,
    )]
    pub escrowed_token: Account<'info, TokenAccount>,

    #[account(constraint = collection_token.owner == SERVER_PUBKEY)]
    pub collection_token: Account<'info, TokenAccount>,
    /// CHECK:
    pub metadata_pda: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyTicket<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut, constraint = seller.key() == escrow.authority)]
    pub seller: SystemAccount<'info>,

    #[account(
        mut,
        seeds = ["escrow".as_bytes(), seller.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(constraint = mint.key() == escrow.mint)]
    pub mint: Account<'info, Mint>,
    #[account(mut, constraint = escrowed_token.key() == escrow.escrowed_token)]
    pub escrowed_token: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = buyer,
    )]
    pub buyers_token: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Cancel<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,

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
