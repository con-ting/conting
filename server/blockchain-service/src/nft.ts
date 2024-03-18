import { mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction, findLeafAssetIdPda, transfer, burn, updateMetadata, getAssetWithProof, type UpdateArgsArgs } from '@metaplex-foundation/mpl-bubblegum'
import { type PublicKey, type Umi, some, unwrapOption, generateSigner, percentAmount } from '@metaplex-foundation/umi'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import { type CollectionInput, type CNftInput } from './types.js'

export const mintCollection = async (
  umi: Umi,
  input: CollectionInput
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
    isCollection: true
  }).sendAndConfirm(umi)
  return collectionMint.publicKey
}

export const mintCNftToCollection = async (
  umi: Umi,
  merkleTree: PublicKey,
  tokeInput: CNftInput
) => {
  const leafOwner = umi.identity.publicKey
  const { name, uri, sellerFeeBasisPoints, creator, collectionMint } = tokeInput
  const { signature } = await mintToCollectionV1(umi, {
    leafOwner,
    merkleTree,
    collectionMint,
    metadata: {
      name: `${name} (응모권 포함)`,
      uri,
      sellerFeeBasisPoints,
      collection: { key: collectionMint, verified: true },
      creators: [
        { address: creator, verified: false, share: 90 },
        { address: leafOwner, verified: true, share: 10 }
      ],
      isMutable: true
    }
  }).sendAndConfirm(umi)
  const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature)
  const [assetId, _] = findLeafAssetIdPda(umi, { merkleTree, leafIndex: leaf.nonce })
  return assetId
}

export const transferCNft = async (
  umi: Umi,
  assetId: PublicKey,
  newLeafOwner: PublicKey
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  await transfer(umi, {
    ...assetWithProof,
    newLeafOwner
  }).sendAndConfirm(umi)
}

export const useCNft = async (
  umi: Umi,
  assetId: PublicKey
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  const currentMetadata = assetWithProof.metadata
  const updateArgs: UpdateArgsArgs = {
    name: some(currentMetadata.name.replace('(응모권 포함)', '').trimEnd())
  }
  console.log(currentMetadata)
  await updateMetadata(umi, {
    ...assetWithProof,
    currentMetadata,
    updateArgs,
    authority: umi.identity,
    collectionMint: unwrapOption(currentMetadata.collection)?.key
  }).sendAndConfirm(umi)
}

export const burnCNft = async (
  umi: Umi,
  assetId: PublicKey
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  await burn(umi, {
    ...assetWithProof
  }).sendAndConfirm(umi)
}
