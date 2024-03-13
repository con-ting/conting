import { PublicKey } from "@metaplex-foundation/umi"

export interface CollectionInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: PublicKey
}

export interface TokenInput {
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

export interface TokenBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: string
  collectionMint: string
}

export interface TreeBody {
  size: number
}
