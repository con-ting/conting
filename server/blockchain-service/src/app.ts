import Fastify from 'fastify'
import { publicKey } from '@metaplex-foundation/umi'
import { getPort, initUmi } from './init.js'
import { type CollectionBody, type CollectionInput, type AssetBody, type AssetInput } from './types.js'
import { burnNft, mintCollection, mintNftToCollection, transferNft, updateNft, useNft, verifyCollectionNft } from './nft.js'

const umi = initUmi()
const fastify = Fastify({ logger: true })
const port = getPort()

fastify.post<{ Body: CollectionBody }>('/collections', async (request, reply) => {
  const input: CollectionInput = {
    ...request.body,
    agency: publicKey(request.body.agency),
    singer: publicKey(request.body.singer)
  }
  const collectionMint = await mintCollection(umi, input)
  return { collectionMint }
})

fastify.post<{ Params: { mint: string, collectionMint: string } }>('/collections/:collectionMint/verify/:mint', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  const collectionMint = publicKey(request.params.collectionMint)
  await verifyCollectionNft(umi, mint, collectionMint)
})

fastify.post<{ Body: AssetBody }>('/nfts', async (request, reply) => {
  const input: AssetInput = {
    ...request.body,
    agency: publicKey(request.body.agency),
    singer: publicKey(request.body.singer),
    collectionMint: publicKey(request.body.collectionMint)
  }
  const mint = await mintNftToCollection(umi, input)
  return { mint }
})

fastify.put<{ Params: { mint: string }, Body: AssetBody }>('/nfts/:mint', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  const input: AssetInput = {
    ...request.body,
    agency: publicKey(request.body.agency),
    singer: publicKey(request.body.singer),
    collectionMint: publicKey(request.body.collectionMint)
  }
  await updateNft(umi, mint, input)
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

fastify.delete<{ Params: { mint: string } }>('/nfts/:mint', async (request, reply) => {
  const mint = publicKey(request.params.mint)
  await burnNft(umi, mint)
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
