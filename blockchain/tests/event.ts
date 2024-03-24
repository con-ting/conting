import * as anchor from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { Event } from '../target/types/event'
import { expect } from 'chai'
import * as splToken from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js'
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'

describe('market', async () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Event>

  const server = (provider.wallet as NodeWallet).payer
  const creator = anchor.web3.Keypair.generate()
  const singer = anchor.web3.Keypair.generate()
  const participant = anchor.web3.Keypair.generate()

  const event = anchor.web3.Keypair.generate()
  const entry = anchor.web3.Keypair.generate()

  const collectionMint = anchor.web3.Keypair.generate().publicKey
  const mint = anchor.web3.Keypair.generate().publicKey
  let collectionToken: anchor.web3.PublicKey;
  let collectionMetadataPda: anchor.web3.PublicKey;
  let token: anchor.web3.PublicKey;
  let metadataPda: anchor.web3.PublicKey;

  before(async () => {
    await provider.connection.requestAirdrop(creator.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(participant.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)

    collectionToken = splToken.getAssociatedTokenAddressSync(
      collectionMint,
      server.publicKey,
    )
    token = splToken.getAssociatedTokenAddressSync(
      mint,
      participant.publicKey,
    )

    const metaplex = Metaplex.make(provider.connection)
    collectionMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: collectionMint })
    metadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint })
  })

  it('Create Event', async () => {
    const start = new Date()
    const end = new Date()
    end.setDate(end.getDate() + 3)

    const tx = program.methods.createEvent(
      new anchor.BN(start.getTime()),
      new anchor.BN(end.getTime()),
      1,
      'singer_name',
      'name',
      'description',
      'goods',
      'uri',
    )
      .accounts({
        creator: creator.publicKey,
        singer: singer.publicKey,
        event: event.publicKey,
        collectionToken,
        collectionMetadataPda,
      })
      .signers([creator, event])
      .rpc()
    console.log('TxHash ::', tx)

    const events = await program.account.event.all()
    expect(events.length).to.eq(1)
  })

  it('Entry Event', async () => {
    const tx = program.methods.entryEvent()
      .accounts({
        participant: participant.publicKey,
        event: event.publicKey,
        entry: entry.publicKey,
        mint,
        token,
        metadataPda,
        metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
      })
      .signers([participant, entry])
      .rpc()
    console.log('TxHash ::', tx)

    const entries = await program.account.entry.all()
    expect(entries.length).to.eq(1)
  })

  it('Pick Winner', async () => {
    const participants = [participant.publicKey]

    const tx = program.methods.pickWinner(participants)
      .accounts({
        creator: creator.publicKey,
        event: event.publicKey,
      })
      .signers([creator])
      .rpc()
    console.log('TxHash ::', tx)

    const eventState = await program.account.event.fetch(event.publicKey)
    expect(eventState.winners.length).to.eq(0)
  })
})
