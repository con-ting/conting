import { mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction, findLeafAssetIdPda, getAssetWithProof, transfer, updateMetadata, UpdateArgs, burn } from '@metaplex-foundation/mpl-bubblegum'
import { PublicKey, Umi, generateSigner, percentAmount, some } from '@metaplex-foundation/umi'
import { CollectionInput, TokenInput } from './types.js'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'

export const mintCollection = async (
  umi: Umi,
  input: CollectionInput,
) => {
  const { name, uri, sellerFeeBasisPoints, creator } = input
  const collectionMint = generateSigner(umi)
  await createNft(umi, {
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints / 100, 2),
    mint: collectionMint,
    creators: [
      { address: creator, verified: false, share: 100 }
    ],
    isCollection: true,
  }).sendAndConfirm(umi)
  return collectionMint.publicKey
}

export const mintCNftToCollection = async (
  umi: Umi,
  merkleTree: PublicKey,
  input: TokenInput,
) => {
  const leafOwner = umi.identity.publicKey
  const { name, uri, sellerFeeBasisPoints, creator, collectionMint } = input

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner,
    merkleTree,
    collectionMint,
    metadata: {
      name,
      uri,
      sellerFeeBasisPoints,
      collection: { key: collectionMint, verified: true },
      creators: [
        { address: creator, verified: false, share: 100 },
      ],
    },
  }).sendAndConfirm(umi)
  const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature)
  const [assetId, bump] = findLeafAssetIdPda(umi, { merkleTree, leafIndex: leaf.nonce })
  return assetId
}

export const transferCNft = async (
  umi: Umi,
  token: PublicKey,
  newLeafOwner: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, token)
  await transfer(umi, {
    ...assetWithProof,
    newLeafOwner,
  }).sendAndConfirm(umi)
}

export const updateCNft = async (
  umi: Umi,
  token: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, token)
  const currentMetadata = assetWithProof.metadata
  const updateArgs = {
    name: some(currentMetadata.name.replace(' (응모권)', '')),
  }
  await updateMetadata(umi, {
    ...assetWithProof,
    currentMetadata,
    updateArgs,
  }).sendAndConfirm(umi)
}

export const burnCNft = async (
  umi: Umi,
  token: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, token)
  await burn(umi, {
    ...assetWithProof,
  }).sendAndConfirm(umi)
}
