import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Market } from '../target/types/market'
import { expect } from 'chai'

describe('market', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())
  const program = anchor.workspace.Market as Program<Market>
  const market = anchor.web3.Keypair.generate()
  const ticket = anchor.web3.Keypair.generate()
  const seller = anchor.web3.Keypair.generate()
  const buyer = anchor.web3.Keypair.generate()


  it('Creates a market account', async () => {
    // Add your test here.
    const tx = await program.methods.createMarket()
      .accounts({ market: market.publicKey })
      .signers([market])
      .rpc()
    console.log('TxHash ::', tx)
  })

  it('Sells a ticket', async () => {
    const tx = await program.methods.sell(
      ticket.publicKey,
      new anchor.BN(1000000),
    )
      .accounts({
        market: market.publicKey,
        seller: seller.publicKey,
      })
      .signers([seller])
      .rpc()
    console.log('TxHash ::', tx)
  })

  it('Lists tickets for sale', async () => {
    const marketState = await program.account.market.fetch(market.publicKey)
    console.log('Tickets for sale ::', marketState.tickets)
    expect(marketState.tickets.length).to.eq(1)
  })

  it('Buys a ticket', async () => {
    const tx = await program.methods.buy(
      ticket.publicKey,
    )
      .accounts({
        market: market.publicKey,
        buyer: buyer.publicKey,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)
  })
})
