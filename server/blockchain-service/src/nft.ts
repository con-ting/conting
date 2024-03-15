import { mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction, findLeafAssetIdPda, transfer, burn, updateMetadata, getAssetWithProof, UpdateArgsArgs } from '@metaplex-foundation/mpl-bubblegum'
import { PublicKey, Umi, some, unwrapOption } from '@metaplex-foundation/umi'
import { CNftInput } from './types.js'


export const mintCNftToCollection = async (
  umi: Umi,
  merkleTree: PublicKey,
  tokeInput: CNftInput,
) => {
  const leafOwner = umi.identity.publicKey
  const { name, uri, sellerFeeBasisPoints, creator, collectionMint } = tokeInput

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner,
    merkleTree,
    collectionMint,
    metadata: {
      name,
      uri: `${uri}#remaining=1`,
      sellerFeeBasisPoints,
      collection: { key: collectionMint, verified: true },
      creators: [
        { address: creator, verified: false, share: 100 },
      ],
      isMutable: true,
    },
  }).sendAndConfirm(umi)
  const leaf = await parseLeafFromMintToCollectionV1Transaction(umi, signature)
  const [assetId, _] = findLeafAssetIdPda(umi, { merkleTree, leafIndex: leaf.nonce })
  return assetId
}


export const transferCNft = async (
  umi: Umi,
  assetId: PublicKey,
  newLeafOwner: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  await transfer(umi, {
    ...assetWithProof,
    newLeafOwner,
  }).sendAndConfirm(umi)
}


export const updateCNft = async (
  umi: Umi,
  assetId: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  const currentMetadata = assetWithProof.metadata
  const updateArgs: UpdateArgsArgs = {
    uri: some(currentMetadata.uri.replace('#remaining=1', ''))
  }
  console.log(currentMetadata)
  await updateMetadata(umi, {
    ...assetWithProof,
    currentMetadata,
    updateArgs,
    authority: umi.identity,
    collectionMint: unwrapOption(currentMetadata.collection)?.key,
  }).sendAndConfirm(umi)
}


export const burnCNft = async (
  umi: Umi,
  assetId: PublicKey,
) => {
  const assetWithProof = await getAssetWithProof(umi, assetId)
  await burn(umi, {
    ...assetWithProof,
  }).sendAndConfirm(umi)
}
