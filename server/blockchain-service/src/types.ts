import { PublicKey } from "@metaplex-foundation/umi"

export interface CollectionInput {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: PublicKey
}

export interface CNftInput {
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

export interface CNftBody {
  name: string
  uri: string
  sellerFeeBasisPoints: number
  creator: string
  collectionMint: string
}
