import * as tokenMeta from '@metaplex-foundation/mpl-token-metadata'
import {
  type PublicKey,
  type Signer,
  type Umi,
  generateSigner,
  percentAmount,
} from '@metaplex-foundation/umi'

import { type AssetInput, type CollectionInput } from './types.js'

export const mintCollection = async (umi: Umi, input: CollectionInput) => {
  const { name, symbol, uri, sellerFeeBasisPoints, agency, singer } = input
  const server = umi.identity.publicKey
  let mint: Signer
  do {
    mint = generateSigner(umi)
  } while (!mint.publicKey.startsWith('C'))

  await tokenMeta
    .createNft(umi, {
      mint,
      name,
      symbol,
      uri,
      sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints / 100),
      creators: [
        { address: server, verified: true, share: 10 },
        { address: agency, verified: false, share: 90 },
        { address: singer, verified: false, share: 0 },
      ],
      isMutable: true,
      isCollection: true,
    })
    .sendAndConfirm(umi)
  return mint.publicKey
}

export const mintNftToCollection = async (umi: Umi, input: AssetInput) => {
  const {
    name,
    symbol,
    uri,
    sellerFeeBasisPoints,
    agency,
    singer,
    collectionMint,
  } = input
  const server = umi.identity.publicKey
  let mint: Signer
  do {
    mint = generateSigner(umi)
  } while (!mint.publicKey.toString().startsWith('A'))

  await tokenMeta
    .createNft(umi, {
      mint,
      name,
      symbol,
      uri,
      sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints / 100),
      collection: { key: collectionMint, verified: false },
      creators: [
        { address: server, verified: true, share: 10 },
        { address: agency, verified: false, share: 90 },
        { address: singer, verified: false, share: 0 },
      ],
      isMutable: true,
      uses: {
        useMethod: tokenMeta.UseMethod.Single,
        remaining: 1n,
        total: 1n,
      },
    })
    .sendAndConfirm(umi)
  return mint.publicKey
}

export const updateNft = async (
  umi: Umi,
  mint: PublicKey,
  input: AssetInput,
) => {
  const { name, symbol, uri, sellerFeeBasisPoints, agency, singer } = input
  await tokenMeta
    .updateV1(umi, {
      mint,
      data: {
        name,
        symbol,
        uri,
        sellerFeeBasisPoints,
        creators: [
          {
            address: umi.identity.publicKey,
            verified: true,
            share: 10,
          },
          { address: agency, verified: false, share: 90 },
          { address: singer, verified: false, share: 0 },
        ],
      },
    })
    .sendAndConfirm(umi)
}

export const verifyCollectionNft = async (
  umi: Umi,
  assetMint: PublicKey,
  collectionMint: PublicKey,
) => {
  const metadata = tokenMeta.findMetadataPda(umi, { mint: assetMint })
  await tokenMeta
    .verifyCollectionV1(umi, {
      metadata,
      collectionMint,
    })
    .sendAndConfirm(umi)
}

export const transferNft = async (
  umi: Umi,
  mint: PublicKey,
  newOwner: PublicKey,
) => {
  const currentOwner = umi.identity
  await tokenMeta
    .transferV1(umi, {
      mint,
      authority: currentOwner,
      tokenOwner: currentOwner.publicKey,
      destinationOwner: newOwner,
      tokenStandard: tokenMeta.TokenStandard.NonFungible,
    })
    .sendAndConfirm(umi)
}

export const useNft = async (umi: Umi, mint: PublicKey) => {
  await tokenMeta
    .updateV1(umi, {
      mint,
      uses: tokenMeta.usesToggle('Clear'),
    })
    .sendAndConfirm(umi)
}

export const burnNft = async (umi: Umi, mint: PublicKey) => {
  await tokenMeta
    .burnV1(umi, {
      mint,
      tokenStandard: tokenMeta.TokenStandard.NonFungible,
    })
    .sendAndConfirm(umi)
}
