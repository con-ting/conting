import Fastify from 'fastify'
import { publicKey } from '@metaplex-foundation/umi'
import { initForest, initUmi } from './init.js'
import { type CollectionBody, type CollectionInput, type AssetBody, type AssetInput } from './types.js'
import { createMerkleTree } from './tree.js'
import { mintCollection, mintNftToCollection, transferNft, useNft, verifyCollectionNft } from './nft.js'
import { mintCNftToCollection, transferCNft, useCNft } from './cnft.js'

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

fastify.post<{ Body: AssetBody }>('/nfts', async (request, reply) => {
  const input: AssetInput = {
    ...request.body,
    creator: publicKey(request.body.creator),
    collectionMint: publicKey(request.body.collectionMint)
  }
  const assetId = await mintNftToCollection(umi, input)
  return { assetId }
})

fastify.post<{ Params: { mint: string, newOwner: string } }>('/nfts/:mint/transfer/:newOwner', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  const newOwner = publicKey(request.params.newOwner)
  await transferNft(umi, mint, newOwner)
})

fastify.post<{ Params: { mint: string } }>('/nfts/:mint/use', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  await useNft(umi, mint)
})

fastify.post<{ Params: { mint: string, collectionMint: string } }>('/nfts/:mint/verify/:collectionMint', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  const collectionMint = publicKey(request.params.collectionMint)
  await verifyCollectionNft(umi, mint, collectionMint)
})

fastify.post<{ Body: AssetBody }>('/cnfts', async (request, reply) => {
  const input: AssetInput = {
    ...request.body,
    creator: publicKey(request.body.creator),
    collectionMint: publicKey(request.body.collectionMint)
  }
  if (trees.length === 0) {
    throw { statusCode: 404, message: 'merkle tree not found' }
  }
  const merkleTree = trees[trees.length - 1]
  const assetId = await mintCNftToCollection(umi, merkleTree, input)
  return { assetId }
})

fastify.post<{ Params: { assetId: string, newOwner: string } }>('/cnfts/:assetId/transfer/:newOwner', async (request, reply) => {
  const assetId = publicKey(request.params.assetId)
  const newOwner = publicKey(request.params.newOwner)
  await transferCNft(umi, assetId, newOwner)
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
