import axios from 'axios';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const ticketUrl: string = 'ticket';

export const orderResult = async () => {
  console.log('[orderResultApi Request]');
  const res = await tokenInstance.get(`${ticketUrl}/payments`);
  console.log('[orderResultApi Response] =', res.data);
  return res.data;
};

// 티켓 환불시 사용하는 API (서버 호출용)
export const refundApi = async (ticket_id: string) => {
  console.log('[refundApi Request] = ', ticket_id);
  const res = await tokenInstance.put(`${ticketUrl}/${ticket_id}/refund`);
  console.log('[resultApi Response] = ', res.data);
  return res.data;
};

// 액세스 토큰을 발급받기 위한 함수
export const fetchAccessToken = async (params: {
  imp_key: string;
  imp_secret: string;
}) => {
  try {
    const response = await axios.post(
      'https://api.import.kr/users/getToken',
      params,
    );
    const {accessToken} = response.data;
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

// 티켓 환불시 사용하는 API (아임포트 환불 처리용)
export const refundImApi = async (imp_uid: string, accessToken: string) => {
  console.log('[refundImApi Request] = ', imp_uid);
  const res = await axios.post(
    'https://api.import.kr/payments/cancel',
    {
      imp_uid: imp_uid,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  console.log('[refundImApi Response] = ', res.data);
  return res.data;
};
