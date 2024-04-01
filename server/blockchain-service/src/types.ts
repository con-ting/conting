import { type PublicKey } from '@metaplex-foundation/umi'

export interface CollectionInput {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
  agency: PublicKey
  singer: PublicKey
}

export interface AssetInput {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
  agency: PublicKey
  singer: PublicKey
  collectionMint: PublicKey
}

export interface CollectionBody {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
  agency: string
  singer: string
}

export interface AssetBody {
  name: string
  symbol: string
  uri: string
  sellerFeeBasisPoints: number
  agency: string
  singer: string
  collectionMint: string
}
