use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};
use arrayref::array_ref;
use mpl_token_metadata::accounts::Metadata;
use mpl_token_metadata::instructions::UseV1CpiBuilder;
use solana_program::sysvar::{self, SysvarId};

declare_id!("Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn");

const SERVER_PUBKEY: Pubkey = Pubkey::new_from_array([
    136, 5, 219, 160, 32, 90, 40, 48, 191, 238, 134, 32, 24, 42, 140, 100, 90, 234, 161, 150, 187,
    81, 89, 3, 188, 143, 164, 145, 14, 44, 167, 74,
]);

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
        let maybe_agency = creators.get(1).unwrap();
        let maybe_singer = creators.get(2).unwrap();
        require_eq!(maybe_server.verified, true);
        require_keys_eq!(maybe_server.address, SERVER_PUBKEY);
        require_keys_eq!(maybe_agency.address, ctx.accounts.agency.key());
        require_keys_eq!(maybe_singer.address, ctx.accounts.singer.key());

        let clock = Clock::get()?;
        require_gt!(end_timestamp, clock.unix_timestamp);

        let event = &mut ctx.accounts.event;
        event.authority = ctx.accounts.agency.key();
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

        let metadata = Metadata::try_from(&ctx.accounts.metadata_pda.to_account_info())?;
        let creators = metadata.creators.unwrap();
        let maybe_server = creators.get(0).unwrap();
        let maybe_singer = creators.get(2).unwrap();
        require_eq!(maybe_server.verified, true);
        require_keys_eq!(maybe_server.address, SERVER_PUBKEY);
        require_keys_eq!(maybe_singer.address, event.singer);

        let uses = metadata.uses.unwrap();
        require_gte!(uses.remaining, 1);

        let participant = &ctx.accounts.participant;
        // UseV1CpiBuilder::new(&ctx.accounts.metadata_program)
        //     .authority(&participant)
        //     .mint(&ctx.accounts.mint.to_account_info())
        //     .metadata(&ctx.accounts.metadata_pda)
        //     .payer(&participant)
        //     .system_program(&ctx.accounts.system_program)
        //     .sysvar_instructions(&ctx.accounts.sysvar_instructions)
        //     .invoke()?;

        let entry = &mut ctx.accounts.entry;
        entry.event = event.key();
        entry.participant = participant.key();
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>, participants: Vec<Pubkey>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let clock = Clock::get()?;
        require_gt!(clock.unix_timestamp, event.end_timestamp);

        let recent_slot_hashes = &ctx.accounts.recent_slot_hashes.to_account_info();
        let data = recent_slot_hashes.data.borrow();
        let most_recent = array_ref![data, 12, 8];
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
    pub agency: Signer<'info>,
    pub singer: SystemAccount<'info>,

    #[account(
        init,
        payer = agency,
        space = 8 + 40 + 32 + 32 + 8 + 8 + 2 + (4 + 32 * 100) + (4 + 20) + (4 + 40) + (4 + 256) + (4 + 40) + (4 + 20),
    )]
    pub event: Account<'info, Event>,

    #[account(constraint = collection_token.owner == SERVER_PUBKEY)]
    pub collection_token: Account<'info, TokenAccount>,
    /// CHECK:
    pub collection_metadata_pda: UncheckedAccount<'info>,

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
        space = 8 + 72,
        // seeds = ["entry".as_bytes(), participant.key().as_ref()],
        // bump,
    )]
    pub entry: Account<'info, Entry>,

    pub mint: Account<'info, Mint>,
    #[account(mut, constraint = token.owner == participant.key())]
    pub token: Account<'info, TokenAccount>,
    /// CHECK:
    #[account(mut)]
    pub metadata_pda: UncheckedAccount<'info>,

    // Error: failed to send transaction: Transaction simulation failed: This program may not be used for executing instructions
    // /// CHECK:
    // #[account(address = mpl_token_metadata::ID)]
    // pub metadata_program: UncheckedAccount<'info>,
    /// CHECK:
    #[account(address = Instructions::id())]
    pub sysvar_instructions: UncheckedAccount<'info>,
    // pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PickWinner<'info> {
    #[account(mut, address = event.authority)]
    pub agency: Signer<'info>,

    #[account(mut, constraint = event.winners.len() < event.winners_total as usize)]
    pub event: Account<'info, Event>,

    /// CHECK:
    #[account(address = sysvar::slot_hashes::ID)]
    pub recent_slot_hashes: UncheckedAccount<'info>,
}
