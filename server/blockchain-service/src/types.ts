import { type PublicKey } from '@metaplex-foundation/umi'

export interface CollectionInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  agency: PublicKey
  singer: PublicKey
}

export interface AssetInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  agency: PublicKey
  singer: PublicKey
  collectionMint: PublicKey
}

export interface CollectionBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  agency: string
  singer: string
}

export interface AssetBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  agency: string
  singer: string
  collectionMint: string
}
