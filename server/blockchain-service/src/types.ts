import { type PublicKey } from '@metaplex-foundation/umi'

export interface CollectionInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: PublicKey
}

export interface AssetInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: PublicKey
  collectionMint: PublicKey
}

export interface CollectionBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: string
}

export interface AssetBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: string
  collectionMint: string
}
