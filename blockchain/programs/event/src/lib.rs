use anchor_lang::prelude::*;

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
        name: String,
        description: String,
        uri: String,
        goods: String,
        singer: String,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        event.name = name;
        event.description = description;
        event.uri = uri;
        event.goods = goods;
        event.singer = singer;

        let clock = Clock::get()?;
        // TODO: collection의 owner가 server인 경우에만 이벤트 등록 가능
        // TODO: collection의 creator 중 하나가 server (verified)인 경우에만 이벤트 등록 가능
        // TODO: collection의 creator 중 하나인 경우에만 이벤트 등록 가능
        Ok(())
    }

    pub fn entry_event(ctx: Context<EntryEvent>) -> Result<()> {
        // TODO: token의 owner인 경우에만 응모 가능
        // TODO: token의 creators 중 하나가 server (verified)인 경우에만 응모 가능
        // TODO: token의 creators 중 하나가 event의 creator와 일치하는 경우에만 응모 가능
        // TODO: token의 uses의 remaining이 1 이상인 경우에만 응모 가능
        // TODO: token의 uses의 remaining을 0으로 set
        // TODO: token에 대응하는 유일한 Pda 생성
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>) -> Result<()> {
        // TODO: event의 authority인 경우에만 당첨자 선정 가능
        // TODO: event의 ended_timestamp 이후에만 당첨자 선정 가능
        // TODO: event의 winners_remaining이 1 이상인 경우에만 당첨자 선정 가능
        // TODO: event의 remaining을 1 낮추고 무작위 뽑기
        // TODO: 뽑힌 당첨자의 Entry의 is_winner를 true로 set
        Ok(())
    }
}

#[account]
pub struct Event {
    pub authority: Pubkey,
    pub creator: Pubkey,
    pub started_timestamp: i64,
    pub ended_timestamp: i64,
    pub winners_remaining: u16,
    pub winners_total: u16,

    pub name: String,
    pub description: String,
    pub uri: String,
    pub singer: String,
    pub goods: String,
}

#[account]
pub struct Entry {
    pub event: Pubkey,
    pub participant: Pubkey,
    pub is_winner: bool,
}

#[derive(Accounts)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = 8
            + (4 + 20) + (4 + 40) + (4 + 256) + (4 + 40) + (4 + 20)
            + 32 + 32 + 2 + 2 + 8 + 8
    )]
    pub event: Account<'info, Event>,

    pub clock: Sysvar<'info, Clock>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EntryEvent<'info> {
    #[account(mut)]
    pub participant: Signer<'info>,
}

#[derive(Accounts)]
pub struct PickWinner<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(mut)]
    pub event: Account<'info, Event>,
}
