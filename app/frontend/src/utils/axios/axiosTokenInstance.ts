import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {BASE_URL, CONTENT_TYPE, TIMEOUT} from '../../config/AxiosConfig.ts';
import {getAsync, setAsync} from '../async/asyncUtil';
import {Alert} from 'react-native';
import instance from './axiosInstance';
import {alertAndLog} from '../common/alertAndLog.ts';
import {logout} from '../../api/auth/auth.ts';

/**
 * 인증을 요구할때 사용되는 토큰 인스턴스입니다.
 * @author 김형민
 */

const tokenInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

export const getValueFor = async (key: string) => {
  return await getAsync(key);
};

const getAuthorizationHeader = async (tokenKey: string) => {
  return `Bearer ${await getValueFor(tokenKey)}`;
};

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = CONTENT_TYPE;
  config.headers['Authorization'] = await getAuthorizationHeader('accessToken');
  config.headers['User-Agent'] = await getValueFor('userId');
  return config;
};

const refreshAccessTokenAndRetry = async (config: AxiosRequestConfig) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          'Content-Type': CONTENT_TYPE,
          Authorization: await getAuthorizationHeader('refreshToken'),
        },
      },
    );
    if (response.status === 201) {
      const newAccessToken = response.data.data.accessToken;
      await setAsync('accessToken', newAccessToken);
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(config);
    }
    console.error('refreshAccessTokenAndRetry error :', response);
    return Promise.reject(response);
  } catch (error: any) {
    console.error(error.response.status);
    if (error.response.status === 401) {
      // TODO
      await logout();
      Alert.alert('토큰 갱신에 실패했습니다. 다시 로그인 해주세요.');
      return Promise.reject(error);
    }
  }
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const {status, config} = error.response;
  console.error('error.response :', error.response.data);
  switch (status) {
    case 400:
      if (error.response.data.detail) {
        console.error(error.response.data.detail);
      }
      Alert.alert('잘못된 정보를 입력하셨습니다.\n다시 확인해주세요');
      break;
    case 401:
      return await refreshAccessTokenAndRetry(config);
    case 403:
      throw error.response.data.detail;
    case 404:
      console.error('', error.response.data.detail);
      throw error.response.data;
    case 500:
      Alert.alert('시스템 에러, 관리자에게 문의 바랍니다.');
      throw error.response.data;
    default:
      console.error(error);
      return Promise.reject(error);
  }
};

const handleResponseSuccess = response => {
  console.log('Success response');
  return response;
};

const handleRequestError = (error: AxiosError) => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

tokenInstance.interceptors.request.use(setCommonHeaders, handleRequestError);
tokenInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);

export default tokenInstance;
