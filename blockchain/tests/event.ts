import * as anchor from '@coral-xyz/anchor'
import { Event } from '../target/types/event'
import { expect } from 'chai'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'

describe('market', async () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Event>

  const server = (provider.wallet as NodeWallet).payer

  it('Create Event', async () => {
    const tx = program.methods.createEvent(
      'name',
      'description',
      'uri',
      'signer',
      'goods',
    )
      .accounts({})
      .signers([])
      .rpc()
    console.log('TxHash ::', tx)

    const events = await program.account.event.all()
    expect(events.length).to.eq(1)
  })

  it('Entry Event', async () => {
    const tx = program.methods.entryEvent()
      .accounts({})
      .signers([])
      .rpc()
    console.log('TxHash ::', tx)

    const entries = await program.account.entry.all()
    expect(entries.length).to.eq(1)
  })

  it('Pick Winner', async () => {
    const tx = program.methods.pickWinner()
      .accounts({})
      .signers([])
      .rpc()
    console.log('TxHash ::', tx)

    const [entry] = await program.account.entry.all()
    expect(entry.account.isWinner).to.eq(1)
  })
})
