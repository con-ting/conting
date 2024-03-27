import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios
import tokenInstance from '../../utils/axios/axiosTokenInstance'; // token 필요한 axios
const authUrl: string = 'auth';

export const phoneNumberCertMessageSenderApi = async (params: {
  phone_number: string;
  fcm: string;
}) => {
  console.log('[phoneNumberCertMessageSenderApi request] = ', params);
  const res = await instance.post(`${authUrl}/message`, params);
  console.log('[phoneNumberCertMessageSenderApi Response] =', res.data);
  return res.data;
};

export const certCodeConfirmCodeApi = async (params: {
  random_number: string;
  fcm: string;
}) => {
  console.log('[certCodeConfirmCodeApi request] = ', params);
  const res = await instance.get(
    `${authUrl}/verification?randomNumber=${params.random_number}&fcm=${params.fcm}`,
  );
  console.log('[certCodeConfirmCodeApi Response] = ', res.data);
  return res.data;
};

export const login = async (params: {email: string; password: string}) => {
  console.log('[loginAPI request] = ', params);
  const res = await instance.post(`${authUrl}/login`, params);
  console.log('[loginAPI Response] = ', res.data);
  return res.data;
};

export const emailConfirm = async (params: {email: string}) => {
  console.log('[emailConfirmAPI request] = ', params);
  const res = await instance.get(`${authUrl}/check?email=${params.email}`);
  console.log('[emailConfirmAPI response] = ', res.data);
  return res.data;
};
