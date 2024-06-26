import * as anchor from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import * as web3 from '@solana/web3.js'
import { expect } from 'chai'

import { Did } from '../target/types/did'
import { participant1 as par1, participant2 as par2, participant3 as par3 } from './common'

describe('did', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Did as anchor.Program<Did>
  const server = (provider.wallet as NodeWallet).payer

  let family12: web3.PublicKey
  let family23: web3.PublicKey
  before(async () => {
    await provider.connection.requestAirdrop(par1.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(par2.publicKey, web3.LAMPORTS_PER_SOL)
    await provider.connection.requestAirdrop(par3.publicKey, web3.LAMPORTS_PER_SOL)

    family12 = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('family'), par1.publicKey.toBuffer(), par2.publicKey.toBuffer()],
      program.programId,
    )[0]
    family23 = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('family'), par2.publicKey.toBuffer(), par3.publicKey.toBuffer()],
      program.programId,
    )[0]

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  it('Issue Cert 1+2', async () => {
    const tx = await program.methods
      .issueCert(new anchor.BN(1), new anchor.BN(2))
      .accounts({
        server: server.publicKey,
        family: family12,
        lower: par1.publicKey,
        upper: par2.publicKey,
      })
      .signers([])
      .rpc()
    console.log('TxHash ::', tx)

    const families = await program.account.family.all()
    expect(families.length).to.eq(1)
  })

  it('Issue Cert 2+3', async () => {
    const tx = await program.methods
      .issueCert(new anchor.BN(2), new anchor.BN(3))
      .accounts({
        server: server.publicKey,
        family: family23,
        lower: par2.publicKey,
        upper: par3.publicKey,
      })
      .signers([])
      .rpc()
    console.log('TxHash ::', tx)

    const families = await program.account.family.all()
    expect(families.length).to.eq(2)
  })

  it('Revoke Cert Lower', async () => {
    const tx = await program.methods
      .revokeCertLower()
      .accounts({
        lower: par1.publicKey,
        family: family12,
        server: server.publicKey,
      })
      .signers([par1])
      .rpc()
    console.log('TxHash ::', tx)

    const families = await program.account.family.all()
    expect(families.length).to.eq(1)
  })

  it('Revoke Cert Upper', async () => {
    const tx = await program.methods
      .revokeCertUpper()
      .accounts({
        upper: par3.publicKey,
        family: family23,
        server: server.publicKey,
      })
      .signers([par3])
      .rpc()
    console.log('TxHash ::', tx)

    const families = await program.account.family.all()
    expect(families.length).to.eq(0)
  })
})
