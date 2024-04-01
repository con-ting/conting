import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';

const orderUrl: string = 'order';

interface Seat {
  seat_id: number;
}

interface Ticket {
  ticket_id: string;
  seat_id: string;
  schedule_id: string;
  owner_id: string;
  finger_print: string;
  nft_url: string;
  row: string;
  col: string;
}

// 결제 시 사전 검증하는 API
export const orderBeforeApi = async (params: {
  seat_list: number[];
  merchant_uid: string;
  amount: number;
  buyer_id: string;
}) => {
  console.log('[orderBeforeApi Request] = ', params);
  const res = await tokenInstance.post(`${orderUrl}`, params);
  console.log('[tokenInstance Response] = ', res.data);
  return res.data;
};

// 결제 성공 시 사후 검증하는 API
export const orderAfterApi = async (params: {
  amount: number;
  buyer_id: string;
  imp_uid: string;
  merchant_uid: string;
  seat_ids: number[];
  ticket_list: Ticket[];
}) => {
  console.log('[orderAfterApi Request] = ', params);
  const res = await tokenInstance.post(`${orderUrl}/success`, params);
  console.log('[orderAfterApi Response] = ', res.data);
  return res.data;
};

// 결제 실패 시 사용하는 API
export const orderFailApi = async (params: {ticket_list: Ticket[]}) => {
  console.log('[orderFailApi Request] = ', params);
  const res = await tokenInstance.post(`${orderUrl}/fail`, params);
  console.log('[orderFailApi Response] = ', res.data);
  return res.data;
};
