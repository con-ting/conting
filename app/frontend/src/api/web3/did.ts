const didUrl: string = 'did';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
import {PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {DID_PROGRAM_ID} from '../../config/web3Config.tsx';
import {Did, IDL} from '../../config/web3Types/did.ts';

/**
 * transferReservationRights
 * 선택된 가족에게 해당 콘서트의 구매 권한을 양도한다.
 * @param params
 */
export const transferReservationRights = async (params: {
  performance_id: number; // 공연 id
  owner_fingerprint_key: string; // 지문 인증 공개키
  owner_id: number; // 내 user_id
  owner_wallet: string; // 내 지갑 주소
  families: Array<familyType>;
}) => {
  console.log('[findFamilyInfo request] = ', params);
  const res = await tokenInstance.post(`${didUrl}/transfer/v2`, params);
  console.log('[findFamilyInfo response] = ', res.data);
  return res.data;
};
/**
 * findFamilyInfo
 * 조회할 유저의 지갑주소를 넣으면 해당 유저의 정보가 조회된다.
 * @param wallet 조회할 유저의 지갑 주소
 */
export const userInfoByWallet = async (wallet: string) => {
  console.log('[userInfoByWallet request] = ', wallet);
  const res = await tokenInstance.get(`users/byWallet?wallet=${wallet}`);
  console.log('[userInfoByWallet response] = ', res.data);
  return res.data;
};

/**
 * findReservationRightsByShowId
 * 해당 공연에 대해 내가 buyerId한테 이미 양도했는지
 * @param buyerId 구매자 id
 * @param performanceId  콘서트 id
 */
export const findReservationRightsByShowId = async (params: {
  buyerId: string;
  performanceId: string;
}) => {
  console.log('[findReservationRightsByShowId request] = ', params);
  const res = await tokenInstance.get(
    `${didUrl}/transfer/${params.buyerId}/${params.performanceId}`,
  );
  console.log('[findReservationRightsByShowId response] = ', res.data);
  return res.data;
};

export type familyType = {
  id: number;
  email: string;
  name: string;
  wallet: string;
};

/**
 * getFamilies
 * 나와 연결된 가족들을 조회하는 API 입니다.
 * @param myAddress 내 지갑 주소
 * @param connection 커넥션
 * @param anchorWallet anchorWallet
 */
export async function getFamilies(
  myAddress: PublicKey,
  showId?: string,
  connection: any,
  anchorWallet: any,
) {
  const families = [];
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'confirmed',
    commitment: 'processed',
  });
  const program = new Program<Did>(IDL, DID_PROGRAM_ID, provider);

  const familiesLowerIsMe = await program.account.family.all([
    {
      memcmp: {
        offset: 8,
        bytes: myAddress.toBase58(),
      },
    },
  ]);
  for (const familiesLowerIsMeElement of familiesLowerIsMe) {
    const data = await userInfoByWallet(
      String(familiesLowerIsMeElement.account.upper),
    );
    families.push({
      id: familiesLowerIsMeElement.account.upperId.toNumber(),
      email: data.email,
      name: data.name,
      wallet: String(familiesLowerIsMeElement.account.upper),
    });
  }

  const familiesUpperIsMe = await program.account.family.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: myAddress.toBase58(),
      },
    },
  ]);

  for (const familiesUpperIsMeElement of familiesUpperIsMe) {
    const data = await userInfoByWallet(
      String(familiesUpperIsMeElement.account.lower),
    );
    try {
      await findReservationRightsByShowId({
        buyerId: String(familiesUpperIsMeElement.account.lowerId.toNumber()),
        performanceId: String(showId),
      });
    } catch (error) {
      if (error.detail == '해당하는 예매 양도 정보를 찾을 수 없습니다') {
        families.push({
          id: familiesUpperIsMeElement.account.lowerId.toNumber(),
          email: data.email,
          name: data.name,
          wallet: String(familiesUpperIsMeElement.account.lower),
        });
      }
    }
  }
  console.log('[getFamiliesApi response] = ', families);
  return families;
}
