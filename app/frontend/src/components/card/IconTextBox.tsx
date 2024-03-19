import React from 'react';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {DimensionValue, Text, View} from 'react-native';

type iconTextBoxProps = {
  width?: DimensionValue;
  textColor?: string;
  textSize?: number;
  text: string; // text 내용
  paddingHorizontal?: number;
  paddingVertical?: number;
  iconTag: React.ReactNode;
};

/**
 * IconTextBox 입니다.
 * 아이콘과 text를 같이 사용하는 컴포넌트입니다. 아이콘은 좌측에 존재합니다.
 * @param props
 * - [필수]
 * - iconTag : 태그 사이에 사용할 아이콘 컴포넌트를 넣어주세요
 * - text : 들어갈 text
 * - [선택]
 * - width?: default = '100%' 원하는 크기대로 삽입 가능
 * - textColor?: 글씨 색상 (기본값 TEXTGRAY)
 * - textSize?: 글씨 크기 (기본값 14)
 * - paddingHorizontal?: 좌우 패딩 (기본값 4)
 * - paddingVertical?: 상하 패딩 (기본값 4)
 * @returns
 * @author 김형민
 */
export const IconTextBox = (props: iconTextBoxProps) => {
  return (
    <View
      style={{
        flexDirection: 'row', // 요소들을 나란히 배열
        alignItems: 'center', // 세로 방향으로 가운데 정렬
        width: props.width || '100%',
        paddingHorizontal: props.paddingHorizontal
          ? widthPercent(props.paddingHorizontal)
          : widthPercent(2),
        paddingVertical: props.paddingVertical
          ? heightPercent(props.paddingVertical)
          : heightPercent(2),
      }}>
      {props.iconTag}
      <Text
        numberOfLines={1} ellipsizeMode="tail"
        style={{
          flex: 1, // 나머지 공간을 모두 차지하도록 설정
          color: props.textColor ? props.textColor : Color.TEXTGRAY,
          fontSize: props.textSize
            ? fontPercent(props.textSize)
            : fontPercent(14),
          fontFamily: Font.MAINFONT,
        }}>
        {props.text}
      </Text>
    </View>
  );
};
