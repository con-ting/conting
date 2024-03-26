import * as anchor from '@coral-xyz/anchor'
import { Market } from '../target/types/market'
import { expect } from 'chai'
import * as splToken from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { LAMPORTS_PER_SOL, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { seller, buyer, sellersMint, collectionMint } from './env'

describe('market', async () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Market>

  const server = (provider.wallet as NodeWallet).payer

  const market = anchor.web3.Keypair.generate()
  const escrowedToken = anchor.web3.Keypair.generate()
  let escrow: anchor.web3.PublicKey;

  let collectionToken: anchor.web3.PublicKey;
  let sellersToken: anchor.web3.PublicKey;
  let metadataPda: anchor.web3.PublicKey;

  before(async () => {
    await provider.connection.requestAirdrop(seller.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(buyer.publicKey, anchor.web3.LAMPORTS_PER_SOL)

    escrow = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('escrow'),
        seller.publicKey.toBuffer(),
      ],
      program.programId
    )[0]
    console.log('Escrow ::', escrow)

    collectionToken = splToken.getAssociatedTokenAddressSync(
      collectionMint,
      server.publicKey,
    )
    sellersToken = splToken.getAssociatedTokenAddressSync(
      sellersMint,
      seller.publicKey,
    )

    // ticket MetadataPda
    metadataPda = Metaplex.make(provider.connection)
      .nfts()
      .pdas()
      .metadata({ mint: sellersMint })

    // mint = await splToken.createMint(
    //   provider.connection,
    //   server,
    //   server.publicKey,
    //   server.publicKey,
    //   1,
    // )

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Creates a market account', async () => {
    const tx = await program.methods.createMarket()
      .accounts({ market: market.publicKey })
      .signers([market])
      .rpc()
    console.log('TxHash ::', tx)
  })

  it('Sells a ticket', async () => {
    const tx = await program.methods.sellTicket(
      new anchor.BN(0.1 * LAMPORTS_PER_SOL),
    )
      .accounts({
        seller: seller.publicKey,
        market: market.publicKey,
        mint: sellersMint,
        sellersToken,
        escrow,
        escrowedToken: escrowedToken.publicKey,
        collectionToken,
        metadataPda,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([seller, escrowedToken])
      .rpc()
    console.log('TxHash ::', tx)

    const marketState = await program.account.market.fetch(market.publicKey)
    expect(marketState.escrows.length).to.eq(1)
    console.log('Tickets for sale ::', marketState.escrows)

    const escrowState = await program.account.escrow.fetch(escrow)
    console.log('Escrow ::', escrowState)
  })

  it('Buys a ticket', async () => {
    const { address: buyersToken } = await splToken.getOrCreateAssociatedTokenAccount(
      provider.connection,
      buyer,
      sellersMint,
      buyer.publicKey,
    )

    const tx = await program.methods.buyTicket()
      .accounts({
        buyer: buyer.publicKey,
        seller: seller.publicKey,
        market: market.publicKey,
        escrow,
        escrowedToken: escrowedToken.publicKey,
        buyersToken,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    const marketState = await program.account.market.fetch(market.publicKey)
    expect(marketState.escrows.length).to.eq(0)
    console.log('Tickets for sale ::', marketState.escrows)
  })

  it('Cancels a trade', async () => {
    const tx = await program.methods.cancel()
      .accounts({
        seller: seller.publicKey,
        market: market.publicKey,
        escrow,
        escrowedToken: escrowedToken.publicKey,
        sellersToken,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      })
      .signers([seller])
      .rpc()
    console.log('TxHash ::', tx)

    const marketState = await program.account.market.fetch(market.publicKey)
    expect(marketState.escrows.length).to.eq(0)
    console.log('Tickets for sale ::', marketState.escrows)
  })
})
