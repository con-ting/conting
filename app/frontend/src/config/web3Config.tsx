import {PublicKey, Transaction} from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {useCallback, useMemo, useState} from 'react';
import {
  Account,
  useAuthorization,
} from '../components/mobileWalletAdapter/providers/AuthorizationProvider';
import {
  AuthorizeAPI,
  ReauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';

/**
 * useAnchorWallet
 * 연결된 세션과 선택된 지갑 주소를 넣으면 anchorWallet 리턴
 * @author 김형민
 */
export function useAnchorWallet(
  authorizeSession: (wallet: AuthorizeAPI & ReauthorizeAPI) => Promise<
    Readonly<{
      address: string;
      label?: string | undefined;
      publicKey: PublicKey;
    }>
  >,
  selectedAccount: Account | null,
) {
  return useMemo(() => {
    if (!selectedAccount || !authorizeSession) {
      return null;
    }

    return {
      signTransaction: async (transaction: Transaction) => {
        return transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet);
          const signedTransactions = await wallet.signTransactions({
            transactions: [transaction],
          });
          return signedTransactions[0];
        });
      },
      signAllTransactions: async (transactions: Transaction[]) => {
        return transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet);
          const signedTransactions = await wallet.signTransactions({
            transactions: transactions,
          });
          return signedTransactions;
        });
      },
      get publicKey() {
        return selectedAccount.publicKey;
      },
    } as anchor.Wallet;
  }, [authorizeSession, selectedAccount]);
}

/**
 * RPC_ENDPOINT
 * 블록체인 네트워크
 * @author 김형민
 */
export const RPC_ENDPOINT = 'https://api.devnet.solana.com';

/**
 * DID_PROGRAM_ID
 * 가족 인증 서비스 주소
 * @author 김형민
 */
export const DID_PROGRAM_ID = new PublicKey(
  'DiDiDgTdcYhe7jemETo4u5B6GNtsv1BPDnRHBQJtVoEj',
);

/**
 * DID_PROGRAM_ID
 * NFT 티켓 거래 프로그램 주소
 * @author 김형민
 */
export const EVENT_PROGRAM_ID = new PublicKey(
  'Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn',
);

/**
 * EVENT_PROGRAM_ID
 * 이벤트 블록체인 프로그램 주소
 * @author 김형민
 */
export const EVENT_PROGRAM_ID = new PublicKey(
  'Even2kqboEgiEv8ozq4fMyiDi727VeRbTD7SQogF5vrn',
);

/**
 * MPL_TOKEN_METADATA_PROGRAM_ID
 * 메타데이터 프로그램 주소
 */
export const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);
/**
 * SERVER_ADDRESS
 * conting 서버 지갑 주소
 */
export const SERVER_ADDRESS = new PublicKey(
  'A9ydQTX8gDEaFoA3xEAwDSkfPnoWPAxoM8CJUyhHRsv1',
);

/**
 * MARKET_PROGRAM_ID
 * nft 마켓 주소
 */
export const MARKET_PROGRAM_ID = new PublicKey(
  'MarqygkQw8N9f1byiDrWvtbKs6iDfeWiUmBpovQiJpi',
);
