import * as anchor from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import * as spl from '@solana/spl-token'
import * as web3 from '@solana/web3.js'
import { SYSVAR_SLOT_HASHES_PUBKEY } from '@solana/web3.js'
import { expect } from 'chai'

import { Event } from '../target/types/event'
import {
  agency,
  collectionMint,
  getMetadataAddress,
  par1sMint,
  par2sMint,
  par3sMint,
  participant1,
  participant2,
  participant3,
  singer,
} from './common'

describe('event', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Event as anchor.Program<Event>

  const server = (provider.wallet as NodeWallet).payer
  const event = web3.Keypair.generate()
  const entry = web3.Keypair.generate()

  const collectionToken = spl.getAssociatedTokenAddressSync(collectionMint, server.publicKey)
  const collectionMetadataPda = getMetadataAddress(collectionMint)
  const par1sToken = spl.getAssociatedTokenAddressSync(par1sMint, participant1.publicKey)
  const par2sToken = spl.getAssociatedTokenAddressSync(par2sMint, participant2.publicKey)
  const par3sToken = spl.getAssociatedTokenAddressSync(par3sMint, participant3.publicKey)
  const par1sMetadataPda = getMetadataAddress(par1sMint)
  const par2sMetadataPda = getMetadataAddress(par2sMint)
  const par3sMetadataPda = getMetadataAddress(par3sMint)

  before(async () => {
    await provider.connection.requestAirdrop(agency.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(singer.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(participant1.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(participant2.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(participant3.publicKey, web3.LAMPORTS_PER_SOL)

    // entry = web3.PublicKey.findProgramAddressSync(
    //   [
    //     anchor.utils.bytes.utf8.encode('entry'),
    //     par1.publicKey.toBuffer(),
    //   ],
    //   program.programId
    // )[0]
    // console.log('Event ::', entry)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Create Event', async () => {
    const now = Date.now() / 1000
    const start = now - 3
    const end = now + 1

    const tx = await program.methods
      .createEvent(new anchor.BN(start), new anchor.BN(end), 1, 'singer_name', 'name', 'description', 'goods', 'uri')
      .accounts({
        agency: agency.publicKey,
        singer: singer.publicKey,
        event: event.publicKey,
        collectionToken,
        collectionMetadataPda,
      })
      .signers([agency, event])
      .rpc()
    console.log('TxHash ::', tx)

    const events = await program.account.event.all()
    expect(events.length).to.eq(1)
  })

  it('Entry Event', async () => {
    const tx = await program.methods
      .entryEvent()
      .accounts({
        participant: participant1.publicKey,
        event: event.publicKey,
        entry: entry.publicKey,
        mint: par1sMint,
        token: par1sToken,
        metadataPda: par1sMetadataPda,
        // delegate: server.publicKey,
        // tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        // sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY
      })
      .signers([participant1, entry])
      .rpc()
    console.log('TxHash ::', tx)

    const entries = await program.account.entry.all()
    expect(entries.length).to.eq(1)
  })

  it('Pick Winner', async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const participants = [participant1.publicKey]

    const tx = await program.methods
      .pickWinner(participants)
      .accounts({
        agency: agency.publicKey,
        event: event.publicKey,
        recentSlotHashes: SYSVAR_SLOT_HASHES_PUBKEY,
      })
      .signers([agency])
      .rpc()
    console.log('TxHash ::', tx)

    const eventState = await program.account.event.fetch(event.publicKey)
    expect(eventState.winners.length).to.eq(1)
  })
})
