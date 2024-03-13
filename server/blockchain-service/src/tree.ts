import { createTree } from '@metaplex-foundation/mpl-bubblegum'
import { Umi, generateSigner } from '@metaplex-foundation/umi'

const calculateMaxDepth = (size: number) => {
  let maxDepth = 0
  while (size > 2 ** maxDepth) {
    maxDepth++
  }
  return maxDepth
}

export const createMerkleTree = async (umi: Umi, size: number) => {
  const maxDepth = calculateMaxDepth(size)
  const merkleTree = generateSigner(umi)

  const builder = await createTree(umi, {
    merkleTree,
    maxDepth,
    maxBufferSize: 64,
  })
  await builder.sendAndConfirm(umi)
  return merkleTree.publicKey
}
