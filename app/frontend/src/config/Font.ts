/*
 * 사용되는 폰트 설정공간
 * 피그마 컬러팔레트 프레임 명
 */

import { MAINYELLOW } from './Color';
import {fontPercent} from './Dimensions';
export const MAINFONT: string = 'Jalnan2TTF';

export const F_SIZE_HEADER: object = {
  color: 'white',
  fontSize: fontPercent(28),
  fontFamily: MAINFONT,
};
export const F_SIZE_TITLE: object = {
  color: 'white',
  fontFamily: MAINFONT,
  fontSize: fontPercent(20),
};
export const F_SIZE_BUTTON: object = {
  color: 'white',
  fontFamily: MAINFONT,
  fontSize: fontPercent(18),
};
export const F_SIZE_BIGTEXT: object = {
  color: 'white',
  fontFamily: MAINFONT,
  fontSize: fontPercent(14),
};
export const F_SIZE_TEXT: object = {
  color: 'white',
  fontFamily: MAINFONT,
  fontSize: fontPercent(12),
};
export const F_SIZE_SMALLTEXT: object = {
  color: 'white',
  fontFamily: MAINFONT,
  fontSize: fontPercent(10),
};


export const F_SIZE_Y_HEADER: object = {
  color: MAINYELLOW,
  fontSize: fontPercent(28),
  fontFamily: MAINFONT,
};
export const F_SIZE_Y_TITLE: object = {
  color: MAINYELLOW,
  fontFamily: MAINFONT,
  fontSize: fontPercent(20),
};
export const F_SIZE_Y_BUTTON: object = {
  color: MAINYELLOW,
  fontFamily: MAINFONT,
  fontSize: fontPercent(18),
};
export const F_SIZE_Y_BIGTEXT: object = {
  color: MAINYELLOW,
  fontFamily: MAINFONT,
  fontSize: fontPercent(14),
};
export const F_SIZE_Y_TEXT: object = {
  color: MAINYELLOW,
  fontFamily: MAINFONT,
  fontSize: fontPercent(12),
  textAlign: 'center'
};
export const F_SIZE_Y_SMALLTEXT: object = {
  color: MAINYELLOW,
  fontFamily: MAINFONT,
  fontSize: fontPercent(10),
};