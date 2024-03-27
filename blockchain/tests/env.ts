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
