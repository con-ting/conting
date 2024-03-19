import { type Umi, type PublicKey, generateSigner, percentAmount } from '@metaplex-foundation/umi'
import { TokenStandard, UseMethod, burnV1, createNft, findMetadataPda, transferV1, updateV1, usesToggle, verifyCollectionV1 } from '@metaplex-foundation/mpl-token-metadata'
import { type AssetInput, type CollectionInput } from './types.js'

export const mintCollection = async (
  umi: Umi,
  input: CollectionInput
) => {
  const { name, uri, sellerFeeBasisPoints, creator } = input
  const mint = generateSigner(umi)
  await createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints / 100),
    creators: [
      { address: creator, verified: false, share: 100 }
    ],
    isCollection: true
  }).sendAndConfirm(umi)
  return mint.publicKey
}

export const mintNftToCollection = async (
  umi: Umi,
  input: AssetInput
) => {
  const { name, uri, sellerFeeBasisPoints, creator, collectionMint } = input
  const mint = generateSigner(umi)
  await createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(sellerFeeBasisPoints / 100),
    collection: { key: collectionMint, verified: false },
    creators: [
      { address: creator, verified: false, share: 90 },
      { address: umi.identity.publicKey, verified: true, share: 10 }
    ],
    isMutable: true,
    uses: {
      useMethod: UseMethod.Single,
      remaining: 1n,
      total: 1n
    }
  }).sendAndConfirm(umi)
  return mint.publicKey
}

export const verifyCollectionNft = async (
  umi: Umi,
  assetMint: PublicKey,
  collectionMint: PublicKey
) => {
  const metadata = findMetadataPda(umi, { mint: assetMint })
  await verifyCollectionV1(umi, {
    metadata,
    collectionMint
  }).sendAndConfirm(umi)
}

export const transferNft = async (
  umi: Umi,
  mint: PublicKey,
  newOwner: PublicKey
) => {
  const currentOwner = umi.identity
  await transferV1(umi, {
    mint,
    authority: currentOwner,
    tokenOwner: currentOwner.publicKey,
    destinationOwner: newOwner,
    tokenStandard: TokenStandard.NonFungible
  }).sendAndConfirm(umi)
}

export const useNft = async (
  umi: Umi,
  mint: PublicKey
) => {
  await updateV1(umi, {
    mint,
    uses: usesToggle('Set', [{
      useMethod: UseMethod.Single,
      remaining: 0n,
      total: 1n
    }])
  }).sendAndConfirm(umi)
}

export const burnNft = async (
  umi: Umi,
  mint: PublicKey
) => {
  await burnV1(umi, {
    mint,
    tokenStandard: TokenStandard.NonFungible
  }).sendAndConfirm(umi)
}
