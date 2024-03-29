import instance from '../../utils/axios/axiosInstance';
import tokenInstance from '../../utils/axios/axiosTokenInstance';
const queUrl: string = '/queue';

export const queuePostApi = async (params: {schedule_id: string}) => {
  console.log('[queuePostAPI request] = ', params);
  const res = await tokenInstance.post(`${queUrl}`, params);
  console.log('[queuePostAPI response] = ', res.data);
  return res.data;
};

export const queueGetApi = async (schedule_id: string) => {
  console.log('[queueGetAPI request] = ', schedule_id);
  const res = await tokenInstance.get(`${queUrl}?schedule_id=${schedule_id}`);
  console.log('[queueGetAPI response] = ', res.data);
  return res.data;
};
