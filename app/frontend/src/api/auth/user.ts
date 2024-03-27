import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios
import tokenInstance from '../../utils/axios/axiosTokenInstance'; // token 필요한 axios

const authUrl: string = 'auth';

export const userJoin = async (params: {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  birthday: string;
  fcm: string;
  wallet: string;
}) => {
  console.log('[userJoinAPI request] = ', params);
  const res = await instance.post(`${authUrl}/join`, params);
  console.log('[userJoinApi Response] = ', res.data);
  return res.data;
};

export const updateUserFcmAndWallet = async (params: {
  fcm?: string;
  wallet?: string;
}) => {
  console.log('[updateUserFcmAndWalletAPI request] = ', params);
  const res = await tokenInstance.put(`/users`, params);
  console.log('[updateUserFcmAndWalletAPI Response] = ', res.data);
  return res.data;
};
