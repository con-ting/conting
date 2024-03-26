use anchor_lang::prelude::*;

declare_id!("DiDiDgTdcYhe7jemETo4u5B6GNtsv1BPDnRHBQJtVoEj");

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

#[program]
pub mod did {
    use super::*;

    pub fn issue_cert(ctx: Context<IssueCert>, lower_id: i64, upper_id: i64) -> Result<()> {
        let family = &mut ctx.accounts.family;
        family.lower = ctx.accounts.lower.key();
        family.upper = ctx.accounts.upper.key();
        family.lower_id = lower_id;
        family.upper_id = upper_id;
        family.bump = ctx.bumps.family;
        Ok(())
    }

    pub fn revoke_cert_lower(_ctx: Context<RevokeCertLower>) -> Result<()> {
        Ok(())
    }

    pub fn revoke_cert_upper(_ctx: Context<RevokeCertUpper>) -> Result<()> {
        Ok(())
    }
}

#[account]
pub struct Family {
    pub lower: Pubkey,
    pub upper: Pubkey,
    pub lower_id: i64,
    pub upper_id: i64,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct IssueCert<'info> {
    #[account(mut, address = SERVER_PUBKEY)]
    pub server: Signer<'info>,

    #[account(
        init,
        payer = server,
        space = 8 + 96,
        constraint = lower.key() < upper.key(),
        seeds = ["family".as_bytes(), lower.key().as_ref(), upper.key().as_ref()],
        bump,
    )]
    pub family: Account<'info, Family>,

    pub lower: SystemAccount<'info>,
    pub upper: SystemAccount<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeCertLower<'info> {
    #[account(mut)]
    pub lower: Signer<'info>,
    #[account(mut, address = SERVER_PUBKEY)]
    pub server: SystemAccount<'info>,

    #[account(
        mut,
        close = server,
        seeds = ["family".as_bytes(), lower.key().as_ref(), family.upper.key().as_ref()],
        bump = family.bump,
    )]
    pub family: Account<'info, Family>,
}

#[derive(Accounts)]
pub struct RevokeCertUpper<'info> {
    #[account(mut)]
    pub upper: Signer<'info>,
    #[account(mut, address = SERVER_PUBKEY)]
    pub server: SystemAccount<'info>,

    #[account(
        mut,
        close = server,
        seeds = ["family".as_bytes(), family.lower.key().as_ref(), upper.key().as_ref()],
        bump = family.bump,
    )]
    pub family: Account<'info, Family>,
}
