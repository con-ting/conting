import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

export interface DidInput {
  lower: PublicKey
  upper: PublicKey
  lowerId: BN
  upperId: BN
}

export interface DidBody {
  lower: string
  upper: string
  lowerId: number
  upperId: number
}
