import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import * as dotenv from 'dotenv'

dotenv.config()

export const initUmi = () => {
  const umi = createUmi(process.env.RPC_ENDPOINT || 'https://api.devnet.solana.com')
  const secret = JSON.parse(process.env.WALLET_SECRET!)
  const keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(secret))
  return umi
    .use(keypairIdentity(keypair))
    .use(mplTokenMetadata())
}

export const initForest = () => {
  return [
    publicKey(process.env.MERKLE_TREE!)
  ]
}

export const getPort = () => parseInt(process.env.SERVER_PORT || '3000')
