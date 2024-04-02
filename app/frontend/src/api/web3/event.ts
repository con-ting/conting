import {PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {IDL} from '../../config/web3Types/did.ts';
import {Event} from '../../config/web3Types/event.ts';

/**
 * eventFindBySingerAddress
 * @param singerAddress
 * @param connection
 * @param anchorWallet
 */
export async function eventFindBySingerAddress(
  singerAddress: PublicKey,
  connection: any,
  anchorWallet: any,
) {
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  let EVENT_PROGRAM_ID;
  const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider);
  const events = await program.account.event.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: singerAddress.toBase58(),
      },
    },
  ]);
  return events;
}
