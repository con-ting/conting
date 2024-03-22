import * as anchor from '@coral-xyz/anchor'
import { Market } from '../target/types/market'
import { expect } from 'chai'
import * as splToken from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { LAMPORTS_PER_SOL, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'

describe('market', async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Market>

  const server = (provider.wallet as NodeWallet).payer
  const sellerSecret = new Uint8Array([2, 159, 38, 178, 107, 22, 241, 30, 221, 81, 232, 19, 47, 183, 90, 205, 194, 216, 174, 68, 39, 137, 58, 163, 56, 205, 122, 161, 237, 222, 58, 194, 112, 116, 181, 185, 249, 21, 0, 196, 104, 99, 202, 219, 94, 194, 207, 157, 219, 110, 5, 236, 208, 103, 62, 10, 64, 232, 176, 24, 75, 52, 65, 92])
  const buyerSecret = new Uint8Array([73, 143, 92, 2, 59, 15, 51, 126, 75, 55, 110, 95, 56, 28, 52, 102, 243, 7, 167, 149, 33, 81, 212, 208, 184, 153, 172, 4, 65, 121, 232, 110, 26, 225, 94, 248, 166, 222, 52, 178, 119, 20, 45, 43, 180, 71, 159, 163, 145, 46, 166, 192, 95, 192, 100, 128, 149, 186, 15, 136, 18, 86, 57, 128])
  const seller = anchor.web3.Keypair.fromSecretKey(sellerSecret)
  const buyer = anchor.web3.Keypair.fromSecretKey(buyerSecret)

  const mint = new anchor.web3.PublicKey('5FD27ojtnUrbLg1D2aErsoYQEMUvMXDiyFDtw25TZg5d')
  const collectionMint = new anchor.web3.PublicKey('GFktYvJLGkh5jfdv9ZFuzcXzgNu8bKLhsYnX3DsRU2L6')

  const market = anchor.web3.Keypair.generate()
  const escrowedToken = anchor.web3.Keypair.generate()
  let escrow: anchor.web3.PublicKey;

  before(async () => {
    await provider.connection.requestAirdrop(seller.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(buyer.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)

    escrow = anchor.web3.PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('escrow'),
      seller.publicKey.toBuffer(),
    ], program.programId)[0]
    console.log('Escrow ::', escrow)

    // mint = await splToken.createMint(
    //   provider.connection,
    //   server,
    //   server.publicKey,
    //   server.publicKey,
    //   1,
    // )
  })

  it('Creates a market account', async () => {
    const tx = await program.methods.createMarket()
      .accounts({ market: market.publicKey })
      .signers([market])
      .rpc()
    console.log('TxHash ::', tx)
  })

  it('Sells a ticket', async () => {
    const collectionToken = splToken.getAssociatedTokenAddressSync(
      collectionMint,
      server.publicKey,
    )
    const sellersToken = await splToken.getAssociatedTokenAddressSync(
      mint,
      seller.publicKey,
    )

    // ticket MetadataPda
    const metaplex = Metaplex.make(provider.connection)
    const metadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: mint })

    const tx = await program.methods.sellTicket(
      new anchor.BN(0.1 * LAMPORTS_PER_SOL),
    )
      .accounts({
        seller: seller.publicKey,
        market: market.publicKey,
        mint,
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
      mint,
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
    const sellersToken = await splToken.getAssociatedTokenAddressSync(
      mint,
      seller.publicKey,
    )

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
