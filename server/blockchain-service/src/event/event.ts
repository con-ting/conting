import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { Keypair, PublicKey } from '@solana/web3.js'

import { Event, IDL } from '../../types/event.js'
import { getMetadataAddress } from '../common.js'
import { EventInput } from './types.js'

const EVENT_PROGRAM_ID = new PublicKey(
  'Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn',
)

/**
 * 테스트 목적으로 생성한 함수입니다.
 */
export const createEvent = async (
  provider: AnchorProvider,
  input: EventInput,
) => {
  const {
    secret,
    agency,
    singer,
    collectionMint,
    startTimestamp,
    endTimestamp,
    winnersTotal,
    singerName,
    name,
    description,
    goods,
    uri,
  } = input
  const event = Keypair.generate()
  const collectionToken = getAssociatedTokenAddressSync(
    collectionMint,
    provider.publicKey,
  )
  const collectionMetadataPda = getMetadataAddress(collectionMint)

  const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider)
  const tx = await program.methods
    .createEvent(
      startTimestamp,
      endTimestamp,
      winnersTotal,
      singerName,
      name,
      description,
      goods,
      uri,
    )
    .accounts({
      agency,
      singer,
      event: event.publicKey,
      collectionToken,
      collectionMetadataPda,
    })
    .signers([secret, event])
    .rpc()
  return tx
}
