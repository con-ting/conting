import axios, { AxiosError } from 'axios';
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from '../../config/AxiosConfig.ts';

/**
 * 인증을 미 요구할때 사용되는 API INSTANCE 입니다.
 * @author 김형민
 */

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = CONTENT_TYPE;
  return config;
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const { status } = error.response;
  console.log('status :', status);

  switch (status) {
    case 400:
      if (error.response.data['data_header']) alert(error.response.data['data_header'].result_message);
      // else alert('잘못된 정보를 입력하셨습니다.\n다시 확인해주세요');
      break;
    case 401:
    // TODO
    // 로그아웃 로직타기
    case 500:
      alert('시스템 에러, 관리자에게 문의 바랍니다.');
      break;
    default:
      console.error(error);
      return Promise.reject(error);
  }
};

const handleResponseSuccess = (response) => {
  console.log('Success response: ' + response.config.url);
  return response;
};

const handleRequestError = (error: AxiosError) => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

instance.interceptors.request.use(setCommonHeaders, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default instance;
