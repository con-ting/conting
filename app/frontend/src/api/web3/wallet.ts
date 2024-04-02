import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';

export const findFamilyInfo = async (wallet: string) => {
  console.log('[findFamilyInfo request] = ', wallet);
  const res = await tokenInstance.get(`users/byWallet?wallet=${wallet}`);
  console.log('[findFamilyInfo response] = ', res.data);
  return res.data;
};
