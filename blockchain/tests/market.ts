import * as anchor from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import * as spl from '@solana/spl-token'
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { expect } from 'chai'

import { Market } from '../target/types/market'
import { buyer, collectionMint, getMetadataAddress, sellersMint as mint, seller } from './common'

describe('market', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Market>
  const getPDA = (seller: web3.PublicKey): web3.PublicKey =>
    web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('escrow'), seller.toBuffer()],
      program.programId,
    )[0]

  const server = (provider.wallet as NodeWallet).payer
  const sellersEscrow = getPDA(seller.publicKey)
  const buyersEscrow = getPDA(buyer.publicKey)
  const collectionToken = spl.getAssociatedTokenAddressSync(collectionMint, server.publicKey)
  const sellersToken = spl.getAssociatedTokenAddressSync(mint, seller.publicKey)
  const buyersToken = spl.getAssociatedTokenAddressSync(mint, buyer.publicKey)
  const sellersEscrowedToken = spl.getAssociatedTokenAddressSync(mint, sellersEscrow, true)
  const buyersEscrowedToken = spl.getAssociatedTokenAddressSync(mint, buyersEscrow, true)
  const metadataPda = getMetadataAddress(mint)

  before(async () => {
    await provider.connection.requestAirdrop(seller.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(buyer.publicKey, web3.LAMPORTS_PER_SOL)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Sells a ticket of seller', async () => {
    const tx = await program.methods
      .sellTicket(new anchor.BN(0.1 * LAMPORTS_PER_SOL))
      .accounts({
        seller: seller.publicKey,
        mint,
        sellersToken,
        escrow: sellersEscrow,
        escrowedToken: sellersEscrowedToken,
        collectionToken,
        metadataPda,
      })
      .signers([seller])
      .rpc()
    console.log('TxHash ::', tx)

    const escrowState = await program.account.escrow.fetch(sellersEscrow)
    expect(escrowState.lamports.eqn(0.1 * LAMPORTS_PER_SOL))
  })

  it('Buys a ticket of seller', async () => {
    const tx = await program.methods
      .buyTicket()
      .accounts({
        buyer: buyer.publicKey,
        seller: seller.publicKey,
        mint,
        escrow: sellersEscrow,
        escrowedToken: sellersEscrowedToken,
        buyersToken,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    const buyersTokenAccount = await spl.getAccount(provider.connection, buyersToken)
    expect(buyersTokenAccount.amount).to.eq(1n)
  })

  it('Sells a ticket of buyer', async () => {
    const tx = await program.methods
      .sellTicket(new anchor.BN(0.2 * LAMPORTS_PER_SOL))
      .accounts({
        seller: buyer.publicKey,
        mint,
        sellersToken: buyersToken,
        escrow: buyersEscrow,
        escrowedToken: buyersEscrowedToken,
        collectionToken,
        metadataPda,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    await program.account.escrow.fetch(sellersEscrow)
  })

  it('Cancels a trade of buyer', async () => {
    const tx = await program.methods
      .cancel()
      .accounts({
        seller: buyer.publicKey,
        escrow: buyersEscrow,
        escrowedToken: buyersEscrowedToken,
        sellersToken: buyersToken,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    const buyersTokenAccount = await spl.getAccount(provider.connection, buyersToken)
    expect(buyersTokenAccount.amount).to.eq(1n)
  })
})
