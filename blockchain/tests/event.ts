import * as anchor from '@coral-xyz/anchor'
import { Event } from '../target/types/event'
import { expect } from 'chai'
import * as splToken from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY, SYSVAR_SLOT_HISTORY_PUBKEY } from '@solana/web3.js'
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import {
  agency, singer, participant1 as par1, participant2 as par2, participant3 as par3,
  collectionMint, par1sMint, par2sMint, par3sMint
} from './env'

describe('event', async () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Event as anchor.Program<Event>

  const server = (provider.wallet as NodeWallet).payer
  const event = anchor.web3.Keypair.generate()
  const entry = anchor.web3.Keypair.generate()
  // let entry: anchor.web3.PublicKey;

  let collectionToken: anchor.web3.PublicKey;
  let collectionMetadataPda: anchor.web3.PublicKey;
  let par1sToken: anchor.web3.PublicKey;
  let par2sToken: anchor.web3.PublicKey;
  let par3sToken: anchor.web3.PublicKey;
  let par1sMetadataPda: anchor.web3.PublicKey;
  let par2sMetadataPda: anchor.web3.PublicKey;
  let par3sMetadataPda: anchor.web3.PublicKey;

  before(async () => {
    await provider.connection.requestAirdrop(agency.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(singer.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(par1.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(par2.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(par3.publicKey, anchor.web3.LAMPORTS_PER_SOL)

    // entry = anchor.web3.PublicKey.findProgramAddressSync(
    //   [
    //     anchor.utils.bytes.utf8.encode('entry'),
    //     par1.publicKey.toBuffer(),
    //   ],
    //   program.programId
    // )[0]
    // console.log('Event ::', entry)

    collectionToken = splToken.getAssociatedTokenAddressSync(
      collectionMint,
      server.publicKey,
    )
    par1sToken = splToken.getAssociatedTokenAddressSync(
      par1sMint,
      par1.publicKey,
    )
    par2sToken = splToken.getAssociatedTokenAddressSync(
      par2sMint,
      par2.publicKey,
    )
    par3sToken = splToken.getAssociatedTokenAddressSync(
      par3sMint,
      par3.publicKey,
    )
    const metaplex = Metaplex.make(provider.connection)
    collectionMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: collectionMint })
    par1sMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: par1sMint })
    par2sMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: par2sMint })
    par3sMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: par3sMint })

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Create Event', async () => {
    const now = Date.now() / 1000
    const start = now - 3
    const end = now + 2

    const tx = await program.methods.createEvent(
      new anchor.BN(start),
      new anchor.BN(end),
      1,
      'singer_name',
      'name',
      'description',
      'goods',
      'uri',
    )
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
    const tx = await program.methods.entryEvent()
      .accounts({
        participant: par1.publicKey,
        event: event.publicKey,
        entry: entry.publicKey,
        mint: par1sMint,
        token: par1sToken,
        metadataPda: par1sMetadataPda,
        // metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY
      })
      .signers([par1, entry])
      .rpc()
    console.log('TxHash ::', tx)

    const entries = await program.account.entry.all()
    expect(entries.length).to.eq(1)
  })

  it('Pick Winner', async () => {
    await new Promise((resolve) => setTimeout(resolve, 3500))
    const participants = [par1.publicKey]

    const tx = await program.methods.pickWinner(
      participants,
    )
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
