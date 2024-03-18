import Fastify from 'fastify'
import { publicKey } from '@metaplex-foundation/umi'
import { initForest, initUmi } from './init.js'
import { type CollectionBody, type CollectionInput, type CNftBody, type CNftInput } from './types.js'
import { createMerkleTree } from './tree.js'
import { mintCollection, mintCNftToCollection, transferCNft, useCNft } from './nft.js'

const umi = initUmi()
const trees = initForest()
const fastify = Fastify({ logger: true })

fastify.post<{ Body: { size: number } }>('/merkle-trees', async (request, reply) => {
  const size = request.body.size
  const merkleTree = await createMerkleTree(umi, size)
  trees.push(merkleTree)
  return { merkleTree }
})

fastify.post<{ Body: CollectionBody }>('/collections', async (request, reply) => {
  const input: CollectionInput = {
    ...request.body,
    creator: publicKey(request.body.creator)
  }
  const collection = await mintCollection(umi, input)
  return { collection }
})

fastify.post<{ Body: CNftBody }>('/cnfts', async (request, reply) => {
  const input: CNftInput = {
    ...request.body,
    creator: publicKey(request.body.creator),
    collectionMint: publicKey(request.body.collectionMint)
  }
  if (trees.length === 0) { throw { statusCode: 404, message: 'merkle tree not found' } }
  const merkleTree = trees[trees.length - 1]
  const assetId = await mintCNftToCollection(umi, merkleTree, input)
  return { assetId }
})

fastify.post<{ Params: { assetId: string }, Body: { newLeafOwner: string } }>('/cnfts/:assetId/transfer', async (request, reply) => {
  const assetId = publicKey(request.params.assetId)
  const newLeafOwner = publicKey(request.body.newLeafOwner)
  await transferCNft(umi, assetId, newLeafOwner)
})

fastify.post<{ Params: { assetId: string } }>('/cnfts/:assetId/use', async (request, reply) => {
  const assetId = publicKey(request.params.assetId)
  await useCNft(umi, assetId)
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
