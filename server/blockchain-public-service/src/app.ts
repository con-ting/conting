import { updateV1, usesToggle } from '@metaplex-foundation/mpl-token-metadata'
import { publicKey } from '@metaplex-foundation/umi'
import { ParsedTransactionWithMeta, PartiallyDecodedInstruction, PublicKey } from '@solana/web3.js'
import Fastify from 'fastify'

import { getPort, getSecret, initConnection, initUmi } from './init.js'

const connection = initConnection()
const secret = getSecret()
const umi = initUmi(connection, secret)
const fastify = Fastify({ logger: true })
const port = getPort()

const EVENT_PROGRAM_ID = new PublicKey('Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn')

fastify.post<{ Params: { tx: string } }>('/use/:tx', async (request, reply) => {
  const maxRetry = 5
  let tx: ParsedTransactionWithMeta | null
  for (let i = 0; i < maxRetry; i++) {
    tx = await connection.getParsedTransaction(request.params.tx)
    if (tx !== null) {
      break
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  if (tx === null) {
    throw new Error('트랜잭션을 찾을 수 없습니다.')
  }
  const instruction = tx.transaction.message.instructions[0] as PartiallyDecodedInstruction

  if (!EVENT_PROGRAM_ID.equals(instruction.programId)) {
    throw new Error(`'${EVENT_PROGRAM_ID}'에서 생성된 트랜잭션이 아닙니다.`)
  }
  const mint = instruction.accounts[3]
  const { signature } = await updateV1(umi, {
    mint: publicKey(mint),
    uses: usesToggle('Clear'),
  }).sendAndConfirm(umi)
  return { tx: signature }
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
