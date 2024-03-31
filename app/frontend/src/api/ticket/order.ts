import tokenInstance from '../../utils/axios/axiosTokenInstance';
const ticketUrl: string = 'ticket';

export const orderResult = async () => {
  console.log('[orderResultApi Request]');
  const res = await tokenInstance.get(`${ticketUrl}/payments`);
  console.log('[orderResultApi Response] =', res.data);
  return res.data;
};
