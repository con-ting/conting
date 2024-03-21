import * as anchor from '@coral-xyz/anchor'
import { Market } from '../target/types/market'
import { expect } from 'chai'
import { createAssociatedTokenAccount, transfer } from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'

describe('market', async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Market>

  const market = anchor.web3.Keypair.generate()
  const sellerSecret = new Uint8Array([2, 159, 38, 178, 107, 22, 241, 30, 221, 81, 232, 19, 47, 183, 90, 205, 194, 216, 174, 68, 39, 137, 58, 163, 56, 205, 122, 161, 237, 222, 58, 194, 112, 116, 181, 185, 249, 21, 0, 196, 104, 99, 202, 219, 94, 194, 207, 157, 219, 110, 5, 236, 208, 103, 62, 10, 64, 232, 176, 24, 75, 52, 65, 92])
  const buyerSecret = new Uint8Array([73, 143, 92, 2, 59, 15, 51, 126, 75, 55, 110, 95, 56, 28, 52, 102, 243, 7, 167, 149, 33, 81, 212, 208, 184, 153, 172, 4, 65, 121, 232, 110, 26, 225, 94, 248, 166, 222, 52, 178, 119, 20, 45, 43, 180, 71, 159, 163, 145, 46, 166, 192, 95, 192, 100, 128, 149, 186, 15, 136, 18, 86, 57, 128])
  const seller = anchor.web3.Keypair.fromSecretKey(sellerSecret)
  const buyer = anchor.web3.Keypair.fromSecretKey(buyerSecret)

  const collectionMint = new anchor.web3.PublicKey('GFktYvJLGkh5jfdv9ZFuzcXzgNu8bKLhsYnX3DsRU2L6')
  const collectionTokenAccount = new anchor.web3.PublicKey('BEcsABKxv3TCHcYJuhjifTTqAU69bukUQR5pJb87PBjY')

  const ticketMint = new anchor.web3.PublicKey('5FD27ojtnUrbLg1D2aErsoYQEMUvMXDiyFDtw25TZg5d')
  const ticketTokenAccount = new anchor.web3.PublicKey('FHH4cKJ44UcAQgpQkW5nkjE47rz1vrWhVdXzPAEKxg4r')

  before('airdrop', async () => {
    await provider.connection.requestAirdrop(seller.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(buyer.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL)
  })

  it('Creates a market account', async () => {
    const tx = await program.methods.createMarket()
      .accounts({
        market: market.publicKey
      })
      .signers([market])
      .rpc()
    console.log('TxHash ::', tx)
  })

  it('Sells a ticket', async () => {
    // metadata pda
    const metaplex = Metaplex.make(provider.connection)
    const ticketMetadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: ticketMint })

    // ticketTokenAccount of market
    const ticketTokenAccountMarket = await createAssociatedTokenAccount(
      provider.connection,
      seller,
      ticketMint,
      market.publicKey,
    )

    const tx = await program.methods.sellTicket(
      new anchor.BN(anchor.web3.LAMPORTS_PER_SOL),
    )
      .accounts({
        seller: seller.publicKey,
        market: market.publicKey,
        collectionTokenAccount,
        ticketTokenAccount,
        ticketTokenAccountMarket,
        ticketMetadataPda,
      })
      .signers([seller])
      .rpc()
    console.log('TxHash ::', tx)

    const marketState = await program.account.market.fetch(market.publicKey)
    expect(marketState.items.length).to.eq(1)
    console.log('Tickets for sale ::', marketState.items)
  })

  it('Buys a ticket', async () => {
    const tx = await program.methods.buyTicket()
      .accounts({
        buyer: buyer.publicKey,
        market: market.publicKey,
        ticketMint,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    const marketState = await program.account.market.fetch(market.publicKey)
    expect(marketState.items.length).to.eq(0)
    console.log('Tickets for sale ::', marketState.items)
  })
})
