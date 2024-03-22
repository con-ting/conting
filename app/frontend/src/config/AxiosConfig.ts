import { Platform } from 'react-native';

export const BASE_URL: string = 'https://egg-log.org/v1';
// export const BASE_URL: string = Platform.OS === 'ios' ? 'http://localhost:8080/v1' : 'http://10.0.2.2:8080/v1';
export const TIMEOUT: number = 5000;
export const CONTENT_TYPE: string = 'application/json; charset=utf-8';
