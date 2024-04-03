import { updateV1, usesToggle } from '@metaplex-foundation/mpl-token-metadata'
import { publicKey } from '@metaplex-foundation/umi'
import { PartiallyDecodedInstruction, PublicKey } from '@solana/web3.js'
import Fastify from 'fastify'

import { getPort, getSecret, initConnection, initUmi } from './init.js'

const connection = initConnection()
const secret = getSecret()
const umi = initUmi(connection, secret)
const fastify = Fastify({ logger: true })
const port = getPort()

const EVENT_PROGRAM_ID = new PublicKey('Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn')

fastify.post<{ Params: { tx: string } }>('/use/:tx', async (request, reply) => {
  const transaction = await connection.getParsedTransaction(request.params.tx)
  const instruction = transaction.transaction.message.instructions[0] as PartiallyDecodedInstruction
  const programId = instruction.programId
  if (!EVENT_PROGRAM_ID.equals(programId)) {
    throw new Error(`'${EVENT_PROGRAM_ID}'에서 생성된 Transaction이 아닙니다.`)
  }
  const mint = instruction.accounts[3]
  const { signature: tx } = await updateV1(umi, {
    mint: publicKey(mint),
    uses: usesToggle('Clear'),
  }).sendAndConfirm(umi)
  return { tx }
})

const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
