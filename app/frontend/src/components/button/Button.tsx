import React from 'react';
import { ColorValue, DimensionValue, TouchableOpacity, View, Text } from 'react-native';
import { fontPercent, heightPercent, widthPercent } from '../../config/Dimensions';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';

type BasicButtonProps = {
  onPress: () => void;
  width?: DimensionValue;
  disabled?: boolean;
  backgroundColor: ColorValue;
  borderColor: string;
  borderRadius: number;
  children: React.ReactNode;
};
/**
 * BasicButton입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - disabled: default = false, 버튼 클릭을 막고자 할 때 사용
 * - backgroundColor: 뒷배경 색깔
 * - borderColor: 보더 색깔
 * - borderRadius: Radius 정도
 * - children: 안에 적을 글씨 혹은 아이콘 정도 담으면 됨
 * @returns
 * @author 김형민
 */
export const BasicButton = (props: BasicButtonProps) => {
  return (
    <View style={{ width: props.width || '100%', paddingHorizontal: 4 }}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View
          style={{
            backgroundColor: props.backgroundColor,
            borderRadius: widthPercent(props.borderRadius),
            borderWidth: widthPercent(0.8),
            borderColor: props.borderColor,
            paddingVertical: heightPercent(12),
            alignItems: 'center',
          }}
        >
            {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
};



type ButtonProps = {
  onPress: () => void;
  width?: DimensionValue;
  disabled?: boolean;
  isRadius?: boolean;
  btnText: string;
  textSize?: number;
};

/**
 * YelloButton 입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - disabled: default = false, 버튼 클릭을 막고자 할 때 사용
 * - btnText: 버튼 내용
 * - textSize: 글자 크기
 * - isRadius: 곡선 T, 사각 F
 * @returns
 * @author 김형민
 */
export const YelloButton = (props: ButtonProps) => {
  return (
    <BasicButton width={props.width} onPress={props.onPress} backgroundColor={Color.MAINYELLOR} borderColor={Color.MAINYELLOR} borderRadius={props.isRadius?64:8} >
        <Text style={{color: Color.MAINBLACK, fontSize: fontPercent(props.textSize?props.textSize:12), fontFamily: Font.MAINFONT}}>
            {props.btnText}
        </Text>
    </BasicButton>
  );
};


/**
 * WhiteButton 입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - disabled: default = false, 버튼 클릭을 막고자 할 때 사용
 * - btnText: 버튼 내용
 * - textSize: 글자 크기
 * - isRadius: 곡선 T, 사각 F
 * @returns
 * @author 김형민
 */
export const WhiteButton = (props: ButtonProps) => {
    return (
      <BasicButton width={props.width} onPress={props.onPress} backgroundColor={Color.MAINWHITE} borderColor={Color.MAINWHITE} borderRadius={props.isRadius?64:8}>
          <Text style={{color: Color.MAINBLACK, fontSize: fontPercent(props.textSize?props.textSize:12), fontFamily: Font.MAINFONT}}>
              {props.btnText}
          </Text>
      </BasicButton>
    );
};


/**
 * WhiteButton 입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - disabled: default = false, 버튼 클릭을 막고자 할 때 사용
 * - btnText: 버튼 내용
 * - textSize: 글자 크기
 * - isRadius: 곡선 T, 사각 F
 * @returns
 * @author 김형민
 */
export const GrayButton = (props: ButtonProps) => {
    return (
      <BasicButton width={props.width} onPress={props.onPress} backgroundColor={Color.BTNGRAY} borderColor={Color.BTNGRAY} borderRadius={props.isRadius?64:8}>
          <Text style={{color: Color.MAINWHITE, fontSize: fontPercent(props.textSize?props.textSize:12), fontFamily: Font.MAINFONT}}>
              {props.btnText}
          </Text>
      </BasicButton>
    );
};


/**
 * BlackButton 입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - disabled: default = false, 버튼 클릭을 막고자 할 때 사용
 * - btnText: 버튼 내용
 * - textSize: 글자 크기
 * - isRadius: 곡선 T, 사각 F
 * @returns
 * @author 김형민
 */
export const BlackButton = (props: ButtonProps) => {
    return (
      <BasicButton width={props.width} onPress={props.onPress} backgroundColor={Color.MAINBLACK} borderColor={Color.MAINYELLOR} borderRadius={props.isRadius?64:8}>
          <Text style={{color: Color.MAINYELLOR, fontSize: fontPercent(props.textSize?props.textSize:12), fontFamily: Font.MAINFONT}}>
              {props.btnText}
          </Text>
      </BasicButton>
    );
};
