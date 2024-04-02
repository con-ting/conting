import tokenInstance from '../../utils/axios/axiosTokenInstance';
import {familyType} from './web3.ts';
const didUrl: string = 'did';
export const findFamilyInfo = async (params: {
  showid: number; // 공연 id
  owner_fingerprint_key: string; // 지문 인증 공개키
  owner_id: number; // 내 user_id
  owner_wallet: string; // 내 지갑 주소
  families: Array<familyType>;
}) => {
  console.log('[findFamilyInfo request] = ', params);
  const res = await tokenInstance.get(`${didUrl}/transfer/v2`, params);
  console.log('[findFamilyInfo response] = ', res.data);
  return res.data;
};
