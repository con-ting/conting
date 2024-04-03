import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { encode } from '@coral-xyz/anchor/dist/cjs/utils/bytes/utf8.js'
import { Keypair, PublicKey } from '@solana/web3.js'

import { Did, IDL } from '../../types/did.js'
import { DidInput } from './types.js'

const DID_PROGRAM_ID = 'DiDiDgTdcYhe7jemETo4u5B6GNtsv1BPDnRHBQJtVoEj'

export const getFamilyList = async (provider: AnchorProvider) => {
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider)
  return await program.account.family.all()
}

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
export const revokeFamily = async (
  provider: AnchorProvider,
  family: PublicKey,
  secret: Keypair,
) => {
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider)
  const familyInfo = await program.account.family.fetch(family)
  const lower_or_upper = secret.publicKey
  let tx: string
  if (lower_or_upper.equals(familyInfo.lower)) {
    tx = await program.methods
      .revokeCertLower()
      .accounts({
        lower: lower_or_upper,
        server: program.provider.publicKey,
        family,
      })
      .signers([secret])
      .rpc()
  } else if (lower_or_upper.equals(familyInfo.upper)) {
    tx = await program.methods
      .revokeCertUpper()
      .accounts({
        upper: lower_or_upper,
        server: program.provider.publicKey,
        family,
      })
      .signers([secret])
      .rpc()
  } else {
    throw new Error('lower 또는 upper 중 하나가 아닙니다.')
  }
  return tx
}
