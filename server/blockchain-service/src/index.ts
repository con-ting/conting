import Fastify from 'fastify'
import { publicKey } from '@metaplex-foundation/umi'
import { initForest, initUmi } from './init.js'
import { CollectionBody, TokenBody, TreeBody } from './types.js'
import { createMerkleTree } from './tree.js'
import { mintCollection, mintCNftToCollection } from './nft.js'

const umi = initUmi()
const trees = initForest()

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.post<{ Body: TreeBody }>('/trees', async (request, reply) => {
  const size = request.body.size

  const merkleTree = await createMerkleTree(umi, size)
  trees.push(merkleTree)
  return { merkleTree }
})

fastify.post<{ Body: CollectionBody }>('/collections', async (request, reply) => {
  const input = {
    ...request.body,
    creator: publicKey(request.body.creator),
  }

  const collection = await mintCollection(umi, input)
  return { collection }
})

fastify.post<{ Body: TokenBody }>('/tokens', async (request, reply) => {
  const input = {
    ...request.body,
    creator: publicKey(request.body.creator),
    collectionMint: publicKey(request.body.collectionMint),
  }

  if (trees.length === 0)
    throw { statusCode: 404, message: 'merkle tree not found' }
  const merkleTree = trees[trees.length - 1]

  const token = await mintCNftToCollection(umi, merkleTree, input)
  return { token }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
