import { publicKey } from '@metaplex-foundation/umi'
import * as web3 from '@solana/web3.js'
import { BN } from 'bn.js'
import Fastify from 'fastify'

import { getFamilyList, issueFamily, revokeFamily } from './did/did.js'
import { DidBody, DidInput } from './did/types.js'
import { createEvent } from './event/event.js'
import { EventBody, EventInput } from './event/types.js'
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
  unverifyCollectionNft,
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

fastify.post<{ Params: { mint: string; collectionMint: string } }>(
  '/collections/:collectionMint/unverify/:mint',
  async (request, reply) => {
    const mint = publicKey(request.params.mint)
    const collectionMint = publicKey(request.params.collectionMint)
    await unverifyCollectionNft(umi, mint, collectionMint)
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

fastify.get('/dids', async (request, reply) => {
  const output = await getFamilyList(provider)
  return output.map((family) => ({
    publicKey: family.publicKey,
    account: {
      lower: family.account.lower,
      upper: family.account.upper,
      lowerId: family.account.lowerId.toNumber(),
      upperId: family.account.upperId.toNumber(),
    },
  }))
})

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

fastify.delete<{
  Params: { family: string; lower: string }
  Body: { secret: string }
}>('/dids/:family', async (request, reply) => {
  const family = new web3.PublicKey(request.params.family)
  const secret = web3.Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(request.body.secret)),
  )
  const tx = await revokeFamily(provider, family, secret)
  return { tx }
})

fastify.post<{ Body: EventBody }>('/events', async (request, reply) => {
  const input: EventInput | { secret: web3.Keypair } = {
    ...request.body,
    secret: web3.Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(request.body.secret)),
    ),
    agency: new web3.PublicKey(request.body.agency),
    singer: new web3.PublicKey(request.body.singer),
    collectionMint: new web3.PublicKey(request.body.collectionMint),
    startTimestamp: new BN(request.body.startTimestamp),
    endTimestamp: new BN(request.body.endTimestamp),
  }
  const tx = await createEvent(provider, input)
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
