import { Keypair, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

export interface EventInput {
  secret: Keypair
  agency: PublicKey
  singer: PublicKey
  collectionMint: PublicKey
  startTimestamp: BN
  endTimestamp: BN
  winnersTotal: number
  singerName: string
  name: string
  description: string
  goods: string
  uri: string
}

export interface EventBody {
  secret: string
  agency: string
  singer: string
  collectionMint: string
  startTimestamp: number
  endTimestamp: number
  winnersTotal: number
  singerName: string
  name: string
  description: string
  goods: string
  uri: string
}
