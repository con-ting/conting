import { Umi, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { CollectionInput } from "./types.js"
import { createNft } from "@metaplex-foundation/mpl-token-metadata"


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
