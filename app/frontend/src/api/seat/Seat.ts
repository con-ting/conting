import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const seatUrl: string = 'seat';

// 일정별 좌석 정보 가져오는 API
export const SeatApi = async (params: {
  schedule_id: string;
  sector: string;
}) => {
  console.log('[SeatApi Request] = ', params);
  const res = await tokenInstance.get(
    `${seatUrl}?schedule_id=${params.schedule_id}&sector=${params.sector}`,
  );
  console.log('[SeatApi Response] = 너무 김 응답 온거', );
  return res.data;
};
