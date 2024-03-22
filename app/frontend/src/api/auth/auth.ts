import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios
import tokenInstance from '../../utils/axios/axiosTokenInstance'; // token 필요한 axios

const userUrl: string = 'user';
const emailUrl: string = 'email';

export const userJoin = async (params: { email: string; password: string; name: string; phone_number: string; birth_date: string; fcm: string, wallet: string }) => {
  const res = await instance.post(`${userUrl}/auth/join`, params);
  return res.data;
};

export const getJoinCode = async (params: { email: string }) => {
  const res = await instance.post(`${emailUrl}/join-code`, params);
  return res.data;
};

export const confirmCode = async (params: { randomNumber: string, fcm: string}) => {
  const res = await instance.get(`${emailUrl}/auth/verification`,);
  return res.data;
};
