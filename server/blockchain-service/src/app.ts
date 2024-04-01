import { publicKey } from '@metaplex-foundation/umi'
import * as web3 from '@solana/web3.js'
import { BN } from 'bn.js'
import Fastify from 'fastify'

import { issueFamily } from './did/did.js'
import { DidBody, DidInput } from './did/types.js'
import {
  getPort,
  getSecret,
  initAnchorProvider,
  initConnection,
  initUmi,
} from './init.js'
import {
  burnNft,
  mintCollection,
  mintNftToCollection,
  transferNft,
  updateNft,
  useNft,
  verifyCollectionNft,
} from './nft/nft.js'
import {
  type AssetBody,
  type AssetInput,
  type CollectionBody,
  type CollectionInput,
} from './nft/types.js'

const connection = initConnection()
const secret = getSecret()
const umi = initUmi(connection, secret)
const provider = initAnchorProvider(connection, secret)
const fastify = Fastify({ logger: true })
const port = getPort()

fastify.post<{ Body: CollectionBody }>(
  '/collections',
  async (request, reply) => {
    const input: CollectionInput = {
      ...request.body,
      agency: publicKey(request.body.agency),
      singer: publicKey(request.body.singer),
    }
    const collectionMint = await mintCollection(umi, input)
    return { collectionMint }
  },
)

fastify.post<{ Params: { mint: string; collectionMint: string } }>(
  '/collections/:collectionMint/verify/:mint',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    const collectionMint = publicKey(request.params.collectionMint)
    await verifyCollectionNft(umi, mint, collectionMint)
  },
)

fastify.post<{ Body: AssetBody }>('/nfts', async (request, reply) => {
  const input: AssetInput = {
    ...request.body,
    agency: publicKey(request.body.agency),
    singer: publicKey(request.body.singer),
    collectionMint: publicKey(request.body.collectionMint),
  }
  const mint = await mintNftToCollection(umi, input)
  return { mint }
})

fastify.put<{ Params: { mint: string }; Body: AssetBody }>(
  '/nfts/:mint',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    const input: AssetInput = {
      ...request.body,
      agency: publicKey(request.body.agency),
      singer: publicKey(request.body.singer),
      collectionMint: publicKey(request.body.collectionMint),
    }
    await updateNft(umi, mint, input)
  },
)

fastify.post<{ Params: { mint: string; newOwner: string } }>(
  '/nfts/:mint/transfer/:newOwner',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    const newOwner = publicKey(request.params.newOwner)
    await transferNft(umi, mint, newOwner)
  },
)

fastify.post<{ Params: { mint: string } }>(
  '/nfts/:mint/use',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    await useNft(umi, mint)
  },
)

fastify.delete<{ Params: { mint: string } }>(
  '/nfts/:mint',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    await burnNft(umi, mint)
  },
)

fastify.post<{ Body: DidBody }>('/dids', async (request, reply) => {
  const input: DidInput = {
    lower: new web3.PublicKey(request.body.lower),
    upper: new web3.PublicKey(request.body.upper),
    lowerId: new BN(request.body.lowerId),
    upperId: new BN(request.body.upperId),
  }
  const tx = await issueFamily(provider, input)
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
