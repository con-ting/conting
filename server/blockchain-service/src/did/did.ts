import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { encode } from '@coral-xyz/anchor/dist/cjs/utils/bytes/utf8.js'
import { Keypair, PublicKey } from '@solana/web3.js'

import { Did, IDL } from '../../types/did.js'
import { DidInput } from './types.js'

const DID_PROGRAM_ID = 'DiDiDgTdcYhe7jemETo4u5B6GNtsv1BPDnRHBQJtVoEj'

export const issueFamily = async (
  provider: AnchorProvider,
  input: DidInput,
) => {
  const { lower, lowerId, upper, upperId } = input
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider)
  const family = PublicKey.findProgramAddressSync(
    [encode('family'), lower.toBuffer(), upper.toBuffer()],
    program.programId,
  )[0]
  const tx = await program.methods
    .issueCert(lowerId, upperId)
    .accounts({
      server: program.provider.publicKey,
      family,
      lower,
      upper,
    })
    .signers([])
    .rpc()
  return tx
}

/**
 * 테스트 목적으로 생성한 함수입니다.
 */
export const revokeFamilyByLower = async (
  provider: AnchorProvider,
  family: PublicKey,
  lower: PublicKey,
  secret: Keypair,
) => {
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider)
  const tx = await program.methods
    .revokeCertLower()
    .accounts({
      lower,
      server: program.provider.publicKey,
      family,
    })
    .signers([secret])
    .rpc()
  return tx
}
