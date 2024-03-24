use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::SysvarId;
use anchor_spl::token::{Mint, TokenAccount};
use arrayref::array_ref;
use mpl_token_metadata::accounts::Metadata;
use mpl_token_metadata::instructions::UseV1CpiBuilder;

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

declare_id!("GaZApi6LfvqsEBTpcz9smXHTxq9eERvvXxAQX8vQNm5k");

#[program]
pub mod event {
    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        start_timestamp: i64,
        end_timestamp: i64,
        winners_total: u16,
        singer_name: String,
        name: String,
        description: String,
        goods: String,
        uri: String,
    ) -> Result<()> {
        let metadata = Metadata::try_from(&ctx.accounts.collection_metadata_pda.to_account_info())?;
        let creators = metadata.creators.unwrap();
        let maybe_server = creators.get(0).unwrap();
        let maybe_creator = creators.get(1).unwrap();
        let maybe_singer = creators.get(2).unwrap();
        require_eq!(maybe_server.verified, true);
        require_keys_eq!(maybe_server.address, SERVER_PUBKEY);
        require_keys_eq!(maybe_creator.address, ctx.accounts.creator.key());
        require_keys_eq!(maybe_singer.address, ctx.accounts.singer.key());

        let clock = Clock::get()?;
        require_gt!(end_timestamp, clock.unix_timestamp);

        let event = &mut ctx.accounts.event;
        event.authority = ctx.accounts.creator.key();
        event.singer = ctx.accounts.singer.key();
        event.start_timestamp = start_timestamp;
        event.end_timestamp = end_timestamp;
        event.winners_total = winners_total;
        event.winners = Vec::new();
        event.singer_name = singer_name;
        event.name = name;
        event.description = description;
        event.goods = goods;
        event.uri = uri;
        Ok(())
    }

    pub fn entry_event(ctx: Context<EntryEvent>) -> Result<()> {
        let event = &ctx.accounts.event;

        let clock = Clock::get()?;
        let now = clock.unix_timestamp;
        require_gt!(now, event.start_timestamp);
        require_gt!(event.end_timestamp, now);

        let metadata = Metadata::try_from(&ctx.accounts.metadata_pda)?;
        let creators = metadata.creators.unwrap();
        let maybe_server = creators.get(0).unwrap();
        let maybe_singer = creators.get(2).unwrap();
        require_eq!(maybe_server.verified, true);
        require_keys_eq!(maybe_server.address, SERVER_PUBKEY);
        require_keys_eq!(maybe_singer.address, event.singer);

        let uses = metadata.uses.unwrap();
        require_gte!(uses.remaining, 1);

        let participant = &ctx.accounts.participant;
        UseV1CpiBuilder::new(&ctx.accounts.metadata_program)
            .authority(&participant)
            .mint(&ctx.accounts.mint.to_account_info())
            .metadata(&ctx.accounts.metadata_pda)
            .payer(&participant)
            .system_program(&ctx.accounts.system_program)
            .sysvar_instructions(&ctx.accounts.sysvar_instructions)
            .invoke()?;

        let entry = &mut ctx.accounts.entry;
        entry.event = event.key();
        entry.participant = participant.key();
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>, participants: Vec<Pubkey>) -> Result<()> {
        let event = &mut ctx.accounts.event;

        let recent_slothashes = &ctx.accounts.recent_slothashes.to_account_info();
        let data = recent_slothashes.data.borrow();
        let most_recent = array_ref![data, 12, 8];

        let clock = Clock::get()?;
        let seed = u64::from_le_bytes(*most_recent).saturating_sub(clock.unix_timestamp as u64);

        let remainder = seed as usize % (participants.len());
        let winner = participants.get(remainder).unwrap();

        event.winners.push(*winner);
        Ok(())
    }
}

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub singer: Pubkey,
    pub start_timestamp: i64,
    pub end_timestamp: i64,
    pub winners_total: u16,
    pub winners: Vec<Pubkey>,

    pub singer_name: String,
    pub name: String,
    pub description: String,
    pub goods: String,
    pub uri: String,
}

#[account]
pub struct Entry {
    pub event: Pubkey,
    pub participant: Pubkey,
}

#[derive(Accounts)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    /// CHECK:
    pub singer: AccountInfo<'info>,

    #[account(
        init,
        payer = creator,
        space = 8
            + 32 + 32 + 8 + 8 + 2 + (4 + 32 * 100)
            + (4 + 20) + (4 + 40) + (4 + 256) + (4 + 40) + (4 + 20)
    )]
    pub event: Account<'info, Event>,

    #[account(owner = SERVER_PUBKEY)]
    pub collection_token: Account<'info, TokenAccount>,
    /// CHECK:
    pub collection_metadata_pda: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EntryEvent<'info> {
    #[account(mut)]
    pub participant: Signer<'info>,

    pub event: Account<'info, Event>,
    #[account(
        init,
        payer = participant,
        space = 72
    )]
    pub entry: Account<'info, Entry>,

    pub mint: Account<'info, Mint>,
    #[account(mut, owner = participant.key())]
    pub token: Account<'info, TokenAccount>,
    /// CHECK:
    #[account(mut)]
    pub metadata_pda: AccountInfo<'info>,

    /// CHECK:
    #[account(address = mpl_token_metadata::ID)]
    pub metadata_program: AccountInfo<'info>,
    /// CHECK:
    #[account(address = Instructions::id())]
    pub sysvar_instructions: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PickWinner<'info> {
    #[account(mut, address = event.authority)]
    pub creator: Signer<'info>,

    #[account(
        mut,
        constraint = event.end_timestamp < Clock::get()?.unix_timestamp,
        constraint = event.winners.len() < event.winners_total as usize
    )]
    pub event: Account<'info, Event>,

    pub recent_slothashes: Sysvar<'info, SlotHashes>,
}
