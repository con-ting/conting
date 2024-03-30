import * as anchor from '@coral-xyz/anchor'
import { Market } from '../target/types/market'
import { expect } from 'chai'
import * as splToken from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { seller, buyer, sellersMint as mint, collectionMint } from './env'

describe('market', async () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Market as anchor.Program<Market>
  const server = (provider.wallet as NodeWallet).payer

  let sellersEscrow: anchor.web3.PublicKey
  let buyersEscrow: anchor.web3.PublicKey
  let collectionToken: anchor.web3.PublicKey
  let sellersToken: anchor.web3.PublicKey
  let buyersToken: anchor.web3.PublicKey
  let sellersEscrowedToken: anchor.web3.PublicKey
  let buyersEscrowedToken: anchor.web3.PublicKey
  let metadataPda: anchor.web3.PublicKey

  before(async () => {
    await provider.connection.requestAirdrop(seller.publicKey, anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(buyer.publicKey, anchor.web3.LAMPORTS_PER_SOL)

    sellersEscrow = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('escrow'),
        seller.publicKey.toBuffer(),
      ],
      program.programId
    )[0]
    buyersEscrow = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('escrow'),
        buyer.publicKey.toBuffer(),
      ],
      program.programId
    )[0]

    collectionToken = splToken.getAssociatedTokenAddressSync(
      collectionMint,
      server.publicKey,
    )
    sellersToken = splToken.getAssociatedTokenAddressSync(
      mint,
      seller.publicKey,
    )
    buyersToken = splToken.getAssociatedTokenAddressSync(
      mint,
      buyer.publicKey,
    )
    sellersEscrowedToken = splToken.getAssociatedTokenAddressSync(
      mint,
      sellersEscrow,
      true,
    )
    buyersEscrowedToken = splToken.getAssociatedTokenAddressSync(
      mint,
      buyersEscrow,
      true,
    )

    // ticket MetadataPda
    metadataPda = Metaplex.make(provider.connection)
      .nfts()
      .pdas()
      .metadata({ mint: mint })

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Sells a ticket of seller', async () => {
    const tx = await program.methods.sellTicket(
      new anchor.BN(0.1 * LAMPORTS_PER_SOL),
    )
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
    const tx = await program.methods.buyTicket()
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

    const buyersTokenAccount = await splToken.getAccount(provider.connection, buyersToken)
    expect(buyersTokenAccount.amount).to.eq(1n)
  })

  it('Sells a ticket of buyer', async () => {
    const tx = await program.methods.sellTicket(
      new anchor.BN(0.2 * LAMPORTS_PER_SOL),
    )
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
    const tx = await program.methods.cancel()
      .accounts({
        seller: buyer.publicKey,
        escrow: buyersEscrow,
        escrowedToken: buyersEscrowedToken,
        sellersToken: buyersToken,
      })
      .signers([buyer])
      .rpc()
    console.log('TxHash ::', tx)

    const buyersTokenAccount = await splToken.getAccount(provider.connection, buyersToken)
    expect(buyersTokenAccount.amount).to.eq(1n)
  })
})
