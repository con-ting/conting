import * as borsh from '@coral-xyz/borsh'
import * as web3 from '@solana/web3.js'
import * as dotenv from 'dotenv'

dotenv.config()

export const agency = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.AGENCY_SECRET!)))
export const singer = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SINGER_SECRET!)))
export const seller = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SELLER_SECRET!)))
export const buyer = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.BUYER_SECRET!)))
export const participant1 = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PARTICIPANT_1_SECRET!)))
export const participant2 = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PARTICIPANT_2_SECRET!)))
export const participant3 = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PARTICIPANT_3_SECRET!)))
export const collectionMint = new web3.PublicKey(process.env.COLLECTION_MINT!)
export const sellersMint = new web3.PublicKey(process.env.SELLERS_MINT!)
export const par1sMint = new web3.PublicKey(process.env.PARTICIPANT_1_MINT!)
export const par2sMint = new web3.PublicKey(process.env.PARTICIPANT_2_MINT!)
export const par3sMint = new web3.PublicKey(process.env.PARTICIPANT_3_MINT!)

export const MPL_TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
export const getMetadataPDA = (mint: web3.PublicKey): web3.PublicKey =>
  web3.PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  )[0]

export const borshMetadataLayout = borsh.struct([
  borsh.u8('key'),
  borsh.publicKey('updateAuthority'),
  borsh.publicKey('mint'),
  borsh.struct(
    [
      borsh.str('name'),
      borsh.str('symbol'),
      borsh.str('uri'),
      borsh.u16('sellerFeeBasisPoints'),
      borsh.option(
        borsh.vec(borsh.struct([borsh.publicKey('address'), borsh.bool('verified'), borsh.u8('share')])),
        'creators',
      ),
    ],
    'data',
  ),
  borsh.bool('primarySaleHappened'),
  borsh.bool('isMutable'),
  borsh.option(borsh.u8(), 'editionNonce'),
  borsh.option(
    borsh.rustEnum([
      borsh.u8('NonFungible'),
      borsh.u8('FungibleAsset'),
      borsh.u8('Fungible'),
      borsh.u8('NonFungibleEdition'),
      borsh.u8('ProgrammableNonFungible'),
      borsh.u8('ProgrammableNonFungibleEdition'),
    ]),
    'tokenStandard',
  ),
  borsh.option(borsh.struct([borsh.publicKey('key'), borsh.bool('verified')]), 'collection'),
  borsh.struct([borsh.u8('useMethod'), borsh.u64('remaining'), borsh.u64('total')], 'uses'),
  borsh.option(borsh.u64(), 'collectionDetails'),
  borsh.option(borsh.option(borsh.publicKey()), 'programmableConfig'),
])
