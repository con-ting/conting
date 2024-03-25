import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios
import tokenInstance from '../../utils/axios/axiosTokenInstance'; // token 필요한 axios
const authUrl: string = 'auth';

export const phoneNumberCertMessageSenderApi = async (params: {
  random_number: string;
  fcm: string;
}) => {
  const res = await instance.post(`${authUrl}/message`, params);
  return res.data;
};

export const certCodeConfirmCodeApi = async (params: {
  random_number: string;
  fcm: string;
}) => {
  const res = await instance.get(`${authUrl}/verification?`, params);
  return res.data;
};
