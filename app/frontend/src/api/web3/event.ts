import {PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {Event, IDL} from '../../config/web3Types/event.ts';
import {EVENT_PROGRAM_ID} from '../../config/web3Config.tsx';

/**
 * eventFindBySingerAddress
 * 해당 가수들의 이벤트 목록을 출력한다.
 * @param singerAddress
 * @param connection
 * @param anchorWallet
 */
export async function eventFindBySingerAddress(props: {
  singerAddress: PublicKey;
  connection: any;
  anchorWallet: any;
}) {
  const provider = new AnchorProvider(props.connection, props.anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  console.log(
    'eventFindBySingerAddress API request = ',
    String(props.singerAddress),
  );
  const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider);
  const events = await program.account.event.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: props.singerAddress.toBase58(),
      },
    },
  ]);
  console.log('eventFindBySingerAddress API response = ', events);
  return events;
}

/**
 * eventListFindAll
 * 모든 이벤트 목록을 조회한다.
 * @param connection
 * @param anchorWallet
 */
export async function eventListFindAll(props: {
  connection: any;
  anchorWallet: any;
}) {
  // const connection = new Connection(clusterApiUrl(RPC_ENDPOINT), 'confirmed');
  console.log('eventListFindAll API request = 요청 파라미터 없음');
  const provider = new AnchorProvider(props.connection, props.anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider);
  const events = await program.account.event.all();
  console.log('eventListFindAll API response = ', events);
  return events;
}

/**
 * eventListFindByWallet
 * 내 지갑 주소로 내가 참여하고 있는 이벤트 목록을 찾는다.
 * @param props
 */
export async function eventListFindByWallet(props: {
  connection: any;
  anchorWallet: any;
  myWalletAddress: PublicKey;
}) {
  const provider = new AnchorProvider(props.connection, props.anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider);
  const entries = await program.account.entry.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: props.myWalletAddress.toBase58(),
      },
    },
  ]);
  const eventAccounts = await program.account.event.fetchMultiple(
    entries.map(entry => entry.account.event),
  );
  return eventAccounts;
}

/**
 * doEvent
 * 이벤트 응모하기 함수
 * @param props
 */
// export async function doEvent(props: {
//   connection: any;
//   anchorWallet: any;
//   myWalletAddress: PublicKey;
//   eventAddress: PublicKey;
//   nftAddress: PublicKey;
// }) {
//   const provider = new AnchorProvider(props.connection, props.anchorWallet, {
//     preflightCommitment: 'confirmed',
//     commitment: 'processed',
//   });
//   const program = new Program<Event>(IDL, EVENT_PROGRAM_ID, provider);
//
//   const entry = Keypair.generate();
//   const token = getAssociatedTokenAddressSync(
//     props.nftAddress,
//     props.myWalletAddress,
//   );
//
//   const metadataPda = PublicKey.findProgramAddressSync(
//     [
//       Buffer.from('metadata'),
//       MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//       props.nftAddress.toBuffer(),
//     ],
//     MPL_TOKEN_METADATA_PROGRAM_ID,
//   )[0];
//
//   const tx = await program.methods
//     .entryEvent()
//     .accounts({
//       participant: props.myWalletAddress,
//       event: props.eventAddress,
//       entry: entry.publicKey,
//       mint: props.nftAddress,
//       token,
//       metadataPda,
//       sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
//     })
//     .signers([entry])
//     .rpc();
// }
