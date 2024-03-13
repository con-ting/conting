import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import * as dotenv from 'dotenv'

dotenv.config()

export const initUmi = () => {
  const umi = createUmi(process.env.ENDPOINT!)
  const secret = JSON.parse(process.env.WALLET_SECRET!)
  const keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(secret))

  umi
    .use(keypairIdentity(keypair))
    .use(mplTokenMetadata())
    .use(mplBubblegum())

  return umi
}

export const initForest = () => {
  return [
    publicKey(process.env.MERKLE_TREE!)
  ]
}
