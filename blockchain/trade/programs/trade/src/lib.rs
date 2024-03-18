use anchor_lang::prelude::*;

declare_id!("8Zg6pznFrTJTLgeT6p5FVhLSwiaMR3xHEGrBLpLQoYpx");

#[program]
pub mod trade {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
