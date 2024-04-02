import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {Market, IDL} from '../../config/web3Types/market.ts';
import {MARKET_PROGRAM_ID} from '../../config/web3Config.tsx';
import {PublicKey} from '@solana/web3.js';

/**
 * sellingNftListFind
 * 판매중인 NFT 를 조회합니다.
 * @param props
 */
export async function sellingNftListFind(props: {
  connection: any;
  anchorWallet: any;
}) {
  const provider = new AnchorProvider(props.connection, props.anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Market>(IDL, MARKET_PROGRAM_ID, provider);
  const escrows = await program.account.escrow.all();
  return escrows;
}

/**
 * sellingNftListFind
 * 판매중인 NFT 를 조회합니다.
 * @param props
 */
export async function mySellingNftListFindByWallet(props: {
  connection: any;
  anchorWallet: any;
  myWalletAddress: PublicKey;
}) {
  const provider = new AnchorProvider(props.connection, props.anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Market>(IDL, MARKET_PROGRAM_ID, provider);
  const escrows = await program.account.escrow.all([
    {
      memcmp: {
        offset: 8,
        bytes: props.myWalletAddress.toBase58(),
      },
    },
  ]);
  return escrows;
}
