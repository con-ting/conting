import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const concertUrl: string = 'catalog';

export const ConcertDetailApi = async (show_id: string) => {
  const res = await tokenInstance.get(`${concertUrl}/show/${show_id}`);
  // console.log('[ConcertDetailApi Response] =', res.data);
  return res.data;
};
