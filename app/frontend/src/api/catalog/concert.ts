import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const concertUrl: string = 'catalog';

export const ConcertDetailApi = async (show_id: string) => {
  const res = await tokenInstance.get(`${concertUrl}/show/${show_id}`);
  // console.log('[ConcertDetailApi Response] =', res.data);
  return res.data;
};

export const ConcertSearchApi = async (params: {
  status: string;
  region: string;
  sort: string;
  keyword: string;
  searchType: string;
  reservation_type: string;
}) => {
  console.log('[ConcertSearchApi Request] = ', params);
  const res = await tokenInstance.get(
    `${concertUrl}/show?status=${params.status}&region=${params.region}&sort=${params.sort}&keyword=${params.keyword}&searchType=${params.searchType}&reservation_type=${params.reservation_type}`,
  );
  console.log('[ConcertSearchApi Response] = ', res.data);
  return res.data;
};
