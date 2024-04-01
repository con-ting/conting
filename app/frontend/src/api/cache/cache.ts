import instance from '../../utils/axios/axiosInstance'; // token 필요없는 axios

export const splashCacheSave = async () => {
  console.log('[splashCacheSaveApi request] = 요청데이터 없음');
  const res = await instance.get(`/cache`);
  // console.log('[splashCacheSaveApi Response] = ', res.data);
  return res.data;
};
