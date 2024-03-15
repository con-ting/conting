import React from 'react';
import { ColorValue, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import { fontPercent, widthPercent } from '../../config/Dimensions';
type checkBoxProps = {
  text: string;
  isChecked: boolean;
  setIsChecked: (value: any) => void;
  fontColor?: ColorValue;
  textSize?: number;
};

/**
 * CheckBox
 * 체크박스 컴포넌트입니다.
 * - text: 체크박스 측면에 표시할 텍스트
 * - textSize : 텍스트 크기
 * - isChecked: 체크 상태 저장
 * - fontColor: 폰트 색상 기본 흰색
 * - setIsChecked: 체크 상태 setter
 * @param props
 * @returns
 * @author 김형민
 */
export const CheckBox = (props: checkBoxProps) => {
  return (
    <View>
      <BouncyCheckbox
        size={widthPercent(20)}
        fillColor={Color.MAINYELLOR}
        text={props.text}
        innerIconStyle={{
          borderRadius: widthPercent(4),
          borderWidth: widthPercent(2),
        }}
        iconStyle={{ borderRadius: widthPercent(4) }}
        textStyle={{
          textDecorationLine: 'none',
          fontFamily: Font.MAINFONT,
          color: props.fontColor ? props.fontColor : Color.MAINWHITE,
          fontSize: props.textSize ? fontPercent(props.textSize) : fontPercent(10),
        }}
        onPress={() => {
          props.setIsChecked(props.isChecked);
        }}
      />
    </View>
  );
};
