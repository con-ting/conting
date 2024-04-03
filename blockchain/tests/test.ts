import * as web3 from '@solana/web3.js'

import { borshMetadataLayout, getMetadataAddress } from './common'

;(async () => {
  const connection = new web3.Connection('https://api.devnet.solana.com', 'confirmed')
  const mints = [].map((x) => new web3.PublicKey(x))
  const metadataPublicKeys = mints.map((x) => getMetadataAddress(x))
  const metadataAccountInfos = await connection.getMultipleAccountsInfo(metadataPublicKeys)
  const metadatas = metadataAccountInfos.map((x) => borshMetadataLayout.decode(x.data))
  console.log(metadatas)
})()
