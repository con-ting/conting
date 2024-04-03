import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {Market, IDL} from '../../config/web3Types/market.ts';
import {
  MARKET_PROGRAM_ID,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  SERVER_ADDRESS,
} from '../../config/web3Config.tsx';
import {PublicKey} from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';

/**
 * nftListFindByMyWallet
 * 나의 월렛 주소로, 내가 가지고 있는 nft 리스트를 리턴받는다.
 * @param props
 */
export async function nftListFindByMyWallet(props: {
  connection: any;
  myWalletAddress: PublicKey;
}) {
  const ownerMap = new Map<string, string>();
  const tokenAccountsInfo = await props.connection.getTokenAccountsByOwner(
    props.myWalletAddress,
    {
      programId: TOKEN_PROGRAM_ID,
    },
  );
  // console.log('tokenAccounts : ', tokenAccountsInfo);
  const mints = tokenAccountsInfo.value
    .map(x => borshAccountLayout.decode(x.account.data))
    .filter(x => x.amount.toNumber() == 1);
  // console.log('mints : ', mints);

  const metadataPublicKeys = mints.map(x => getMetadataAddress(x.mint));
  mints.map(x => {
    ownerMap.set(x.mint.toBase58(), x.owner.toBase58());
    // console.log('x.mint =', x.mint);
    // console.log('x =', x);
  });
  // console.log('metadataPublicKeys : ', metadataPublicKeys);
  const metadataAccountInfos = await props.connection.getMultipleAccountsInfo(
    metadataPublicKeys,
  );
  // console.log('metadataAccountInfos : ', metadataAccountInfos);
  const metadatas = metadataAccountInfos.map(x =>
    borshMetadataLayout.decode(x.data),
  );
  // console.log('metadatas : ', metadatas);
  const contingMetadatas = metadatas.filter(x =>
    x.updateAuthority.equals(SERVER_ADDRESS),
  );
  // console.log('contingMetadatas : ', contingMetadatas);
  return await Promise.all(
    contingMetadatas.map(async contingMetadata => {
      // console.log('contingMetadata = ', contingMetadata);
      const jsonData = await fetchJsonData(contingMetadata.data.uri);
      // console.log('jsonData = ', jsonData);
      const ownerAddress = ownerMap.get(contingMetadata.mint.toBase58());
      // console.log('contingMetadata.mint = ', contingMetadata.mint);
      // console.log('ownerAddress = ', ownerAddress);
      return {
        poster: jsonData.properties[0].files[2],
        title: jsonData.name,
        date: jsonData.attributes[4].value,
        location: jsonData.attributes[1].value,
        row: jsonData.attributes[7].value,
        no: jsonData.attributes[8].value,
        grade: jsonData.attributes[9].value,
        ticketAddress: contingMetadata.mint,
        webmUrl: jsonData.properties[0].files[0],
        description: jsonData.description,
        ownerAddress: ownerAddress,
        creatorAddressList: contingMetadata.data.creators,
        sellerFeeBasisPoints: contingMetadata.data.sellerFeeBasisPoints,
        primarySaleHappened: contingMetadata.primarySaleHappened,
        accountData: contingMetadata,
        jsonMetaData: jsonData,
      };
    }),
  );
}

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

/**
 * nftInfoListFindByMintList
 * nft 주소 리스트를 넣으면, 해당하는 nft 정보를 담은 배열이 리턴됩니다.
 * @param props
 */
export async function nftInfoListFindByMintList(props: {
  connection: any;
  nftAddressList: Array<PublicKey>;
}) {
  const metadataPublicKeys = props.nftAddressList.map(x =>
    getMetadataAddress(x),
  );
  const metadataAccountInfos = await props.connection.getMultipleAccountsInfo(
    metadataPublicKeys,
  );
  const metadatas = metadataAccountInfos.map(x =>
    borshMetadataLayout.decode(x.data),
  );
  return metadatas;
}

/**
 * sellNFT
 * 나의 nftAddress와 판매가격을 주면 판매등록을 하는 api 입니다.
 * @param props
 */
export async function sellNFT(props: {
  connection: any;
  anchorWallet: any;
  nftAddress: PublicKey;
  price: number;
}) {}

/**
 * buyNFT
 * 나의 nftAddress와 판매가격을 주면 판매등록을 하는 api 입니다.
 * @param props
 * - `MY_WALLET_ADDRESS`: 구매자 지갑 주소
 * - `SELLER_WALLET_ADDRESS`: 판매자 지갑 주소
 * - `NFT_MINT_ADDRESS`: NFT 티켓 주소
 * - `ESCROW_ADDRESS`: `sellTicket`으로 생성된 escrow 주소
 * - `ESCROW_TOKEN_ADDRESS`: `sellTicket`으로 생성된 escrow에 저장된 escrowToken 주소
 */
export async function buyNFT(props: {
  connection: any;
  anchorWallet: any;
  nftAddress: PublicKey;
  price: number;
}) {}

/**
 * cancelNFTSale
 * 판매 취소 API
 * @param props
 * - `MY_WALLET_ADDRESS`: 조회할 사용자 지갑 주소
 * - `NFT_MINT_ADDRESS`: NFT 티켓 주소
 * - `ESCROW_ADDRESS`: `sellTicket`으로 생성된 escrow 주소
 * - `ESCROW_TOKEN_ADDRESS`: `sellTicket`으로 생성된 escrow에 저장된 escrowToken 주소
 */
export async function cancelNFTSale(props: {
  connection: any;
  anchorWallet: any;
  nftAddress: PublicKey;
  price: number;
}) {}

const borshAccountLayout = borsh.struct([
  borsh.publicKey('mint'),
  borsh.publicKey('owner'),
  borsh.u64('amount'),
  borsh.u32('delegateOption'),
  borsh.publicKey('delegate'),
  borsh.u8('state'),
  borsh.u32('isNativeOption'),
  borsh.u64('isNative'),
  borsh.u64('delegatedAmount'),
  borsh.u32('closeAuthorityOption'),
  borsh.publicKey('closeAuthority'),
]);
const borshMetadataLayout = borsh.struct([
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
        borsh.vec(
          borsh.struct([
            borsh.publicKey('address'),
            borsh.bool('verified'),
            borsh.u8('share'),
          ]),
        ),
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
  borsh.option(
    borsh.struct([borsh.publicKey('key'), borsh.bool('verified')]),
    'collection',
  ),
  borsh.struct(
    [borsh.u8('useMethod'), borsh.u64('remaining'), borsh.u64('total')],
    'uses',
  ),
]);

const getMetadataAddress = (mint: PublicKey): PublicKey =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  )[0];

async function fetchJsonData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network 에러');
    }
    const jsonData = await response.json();
    return jsonData; //
  } catch (error) {
    console.error('json 파싱 오류: ', error);
    throw error;
  }
}
