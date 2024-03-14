import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Dimensions} from 'react-native';

export const widthPercent = (width?: number): number => {
  const windowWidth = Dimensions.get('screen').width;
  let percent;
  if (width === undefined) {
    percent = 100;
  } else {
    percent = (width / windowWidth) * 100;
  }
  return responsiveScreenWidth(percent);
};

export const heightPercent = (height?: number): number => {
  const windowHeight = Dimensions.get('screen').height;
  let percent;
  if (height === undefined) {
    percent = 100;
  } else {
    percent = (height / windowHeight) * 100;
  }
  return responsiveScreenHeight(percent);
};

// 기기 높이 기준으로 폰트 사이즈 반응형으로
export const fontPercent = (fontsize: number): number => {
  const windowHeight = Dimensions.get('screen').height;
  const percent = (fontsize / windowHeight) * 100;
  return responsiveScreenFontSize(percent);
};
