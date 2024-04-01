import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { encode } from '@coral-xyz/anchor/dist/cjs/utils/bytes/utf8.js'
import { PublicKey } from '@solana/web3.js'

import { Did, IDL } from '../../types/did.js'
import { DidInput } from './types.js'

export const issueFamily = async (
  provider: AnchorProvider,
  input: DidInput,
) => {
  const { lower, lowerId, upper, upperId } = input
  const program = new Program<Did>(
    IDL,
    'DiDiDgTdcYhe7jemETo4u5B6GNtsv1BPDnRHBQJtVoEj',
    provider,
  )
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
