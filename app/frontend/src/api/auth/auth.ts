import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios
import tokenInstance from '../../utils/axios/axiosTokenInstance'; // token 필요한 axios
const authUrl: string = 'auth';

export const phoneNumberCertMessageSenderApi = async (params: {
  phone_number: string;
  fcm: string;
}) => {
  const res = await instance.post(`${authUrl}/message`, params);
  console.log('[phoneNumberCertMessageSenderApi Response] =', res.data);
  return res.data;
};

export const certCodeConfirmCodeApi = async (params: {
  random_number: string;
  fcm: string;
}) => {
  const res = await instance.get(
    `${authUrl}/verification?randomNumber=${params.random_number}&fcm=${params.fcm}`,
  );
  console.log('[certCodeConfirmCodeApi Response] = ', res.data);
  return res.data;
};

export const login = async (params: {email: string; password: string}) => {
  const res = await instance.post(`${authUrl}/login`, params);
  console.log('[login Response] = ', res.data);
  return res.data;
};
