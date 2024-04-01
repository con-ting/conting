import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const concertUrl: string = 'catalog';

// 메인 페이지에서 처음 들어갈 시 사용하는 API
export const MainApi = async () => {
  const res = await tokenInstance.get(`${concertUrl}/main`);
  return res.data;
};

// 공연 상세 조회 시 사용하는 API
export const ConcertDetailApi = async (show_id: string) => {
  const res = await tokenInstance.get(`${concertUrl}/show/${show_id}`);
  // console.log('[ConcertDetailApi Response] =', res.data);
  return res.data;
};

// 공연 검색 시 사용하는 API
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

// 출연진 상세 조회 시 사용하는 API
export const CastDetailSearchApi = async (singer_id: number) => {
  console.log('[CastDetailSearchApi Request] = ', singer_id);
  const res = await tokenInstance.get(`${concertUrl}/singer/${singer_id}`);
  console.log('[CastSearchApi Response] = ', res.data);
  return res.data;
};

// 공연장 조회 시 사용하는 API
export const HallSearchApi = async (params: {
  keyword: string;
  region: string;
}) => {
  console.log('[HallSearchApi Request] = ', params);
  const res = await tokenInstance.get(
    `${concertUrl}/hall?keyword=${params.keyword}&region=${params.region}`,
  );
  console.log('[HallSearch Response] = ', res.data);
  return res.data;
};

// 출연진 조회 시 사용하는 API
export const CastSearchApi = async () => {
  const res = await tokenInstance.get(`${concertUrl}/singer/list`);
  console.log('[CastSearch Response] = ', res.data);
  return res.data;
};
