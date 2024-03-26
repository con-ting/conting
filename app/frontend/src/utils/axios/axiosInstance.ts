import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {BASE_URL, CONTENT_TYPE, TIMEOUT} from '../../config/AxiosConfig';
import {Alert} from 'react-native';

/**
 * 인증을 미 요구할 때 사용되는 API INSTANCE입니다.
 * @author 김형민
 */

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// AxiosRequestConfig 타입을 사용하여 config 파라미터 타입 정의
const setCommonHeaders = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  config.headers['Content-Type'] = CONTENT_TYPE;
  return config;
};

// 에러 핸들링 함수에서 AxiosError 타입 사용
const handleResponseError = async (error: AxiosError): Promise<void> => {
  if (!error.response) return Promise.reject(error);
  const {status} = error.response;
  console.error('error.response :', error.response.data);

  switch (status) {
    case 400:
      if (error.response.data.detail) {
        console.error('[ERROR 400]', error.response.data.detail);
      }
      Alert.alert('잘못된 정보를 입력하셨습니다.\n다시 확인해주세요');
      break;
    case 401:
      // TODO: 로그아웃 로직
      break;
    case 409:
      Alert.alert('이미 가입된 회원입니다.');
      break;
    case 500:
      Alert.alert('시스템 에러, 관리자에게 문의 바랍니다.');
      break;
    default:
      console.error(error);
      return Promise.reject(error);
  }
};

// 성공 응답 핸들링 함수에서 반환 타입을 명시적으로 정의
const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  console.log('Success response: ' + response.config.url);
  return response;
};

// 요청 에러 핸들링 함수에서 AxiosError 타입 사용
const handleRequestError = (error: AxiosError): Promise<void> => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

instance.interceptors.request.use(setCommonHeaders, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default instance;
