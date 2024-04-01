import { AnchorProvider, Wallet } from '@coral-xyz/anchor'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { Connection, Keypair } from '@solana/web3.js'
import * as dotenv from 'dotenv'

dotenv.config()

export const getPort = () => parseInt(process.env.SERVER_PORT || '3000')

export const getSecret = () => {
  return Uint8Array.from(JSON.parse(process.env.WALLET_SECRET!))
}

export const initConnection = () => {
  return new Connection(
    process.env.RPC_ENDPOINT || 'https://api.devnet.solana.com',
    'confirmed',
  )
}

export const initUmi = (connection: Connection, secret: Uint8Array) => {
  const umi = createUmi(connection)
  const keypair = umi.eddsa.createKeypairFromSecretKey(secret)
  return umi.use(keypairIdentity(keypair)).use(mplTokenMetadata())
}

export const initAnchorProvider = (
  connection: Connection,
  secret: Uint8Array,
) => {
  return new AnchorProvider(
    connection,
    new Wallet(Keypair.fromSecretKey(secret)),
    {
      preflightCommitment: 'confirmed',
      commitment: 'processed',
    },
  )
}
