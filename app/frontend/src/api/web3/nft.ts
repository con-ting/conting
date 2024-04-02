import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';

// 'devnet', 'testnet', 'mainnet-beta' 중 하나를 사용
// const network = 'devnet'; // 예시로 devnet을 사용
// const RPC_ENDPOINT = clusterApiUrl(network);
//
// export async function getNft(nftAddressList: Array<PublicKey>) {
//   const connection = new Connection(RPC_ENDPOINT, 'confirmed');
//   const metaplex = Metaplex.make(connection);
//   const tickets = await metaplex.nfts().findAllByMintList({
//     mints: nftAddressList,
//   });
//   return tickets;
// }
