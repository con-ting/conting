import { type Umi, type PublicKey, some, unwrapOption } from '@metaplex-foundation/umi'
import * as bubblegum from '@metaplex-foundation/mpl-bubblegum'
import { type AssetInput } from './types.js'

export const mintCNftToCollection = async (
  umi: Umi,
  merkleTree: PublicKey,
  assetInput: AssetInput
) => {
  const leafOwner = umi.identity.publicKey
  const { name, uri, sellerFeeBasisPoints, agency, singer, collectionMint } = assetInput
  const { signature } = await bubblegum.mintToCollectionV1(umi, {
    leafOwner,
    merkleTree,
    collectionMint,
    metadata: {
      name: `${name} (응모권 포함)`,
      uri,
      sellerFeeBasisPoints,
      collection: { key: collectionMint, verified: true },
      creators: [
        { address: leafOwner, verified: true, share: 10 },
        { address: agency, verified: false, share: 90 },
        { address: singer, verified: false, share: 0 }
      ],
      isMutable: true
    }
  }).sendAndConfirm(umi)
  const leaf = await bubblegum.parseLeafFromMintToCollectionV1Transaction(umi, signature)
  const [assetId, _] = bubblegum.findLeafAssetIdPda(umi, { merkleTree, leafIndex: leaf.nonce })
  return assetId
}

export const transferCNft = async (
  umi: Umi,
  assetId: PublicKey,
  newLeafOwner: PublicKey
) => {
  const assetWithProof = await bubblegum.getAssetWithProof(umi, assetId)
  await bubblegum.transfer(umi, {
    ...assetWithProof,
    newLeafOwner
  }).sendAndConfirm(umi)
}

export const useCNft = async (
  umi: Umi,
  assetId: PublicKey
) => {
  const assetWithProof = await bubblegum.getAssetWithProof(umi, assetId)
  const currentMetadata = assetWithProof.metadata
  const updateArgs: bubblegum.UpdateArgsArgs = {
    name: some(currentMetadata.name.replace('(응모권 포함)', '').trimEnd())
  }
  console.log(currentMetadata)
  await bubblegum.updateMetadata(umi, {
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
  const assetWithProof = await bubblegum.getAssetWithProof(umi, assetId)
  await bubblegum.burn(umi, {
    ...assetWithProof
  }).sendAndConfirm(umi)
}
