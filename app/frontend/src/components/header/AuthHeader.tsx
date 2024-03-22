import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions.tsx';
import {MAINFONT} from '../../config/Font.ts';
import {MAINBLACK} from '../../config/Color.ts';

type HeaderProps = {
  text: string;
  fontColor?: string;
  backgroundColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bottomColor?: string;
  borderLevel: number;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

/**
 * Header
 * - 기본 헤더 컴포넌트입니다.
 * - text: 헤더 가운데 표시될 텍스트(타이틀)
 * - fontColor: 헤더 내부 텍스트, 아이콘 색상
 * - backGroundColor: 헤더 배경 색상
 * - leftIcon? : 왼쪽 아이콘 컴포넌트
 * - rightIcon? : 오른쪽 아이콘 컴포넌트
 * - borderLevel: 헤더 아래 테두리(0: 테두리 없음, 1: 1/5 채워짐, 2: 2/5 채워짐, 3: 3/5 채워짐, 4: 4/5 채워짐, 5: 5/5 채워짐)
 * @param props
 * @returns
 * @author 김형민
 */
export const AuthHeader = (props: HeaderProps) => {
  return (
    <View style={{marginBottom: heightPercent(8)}}>
      <View
        style={{
          padding: widthPercent(14),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: props.backgroundColor,
        }}>
        {props.leftIcon ? (
          <TouchableOpacity onPress={props.onLeftPress}>
            {props.leftIcon}
          </TouchableOpacity>
        ) : (
          <View style={{width: widthPercent(22)}} />
        )}
        <Text
          style={{
            fontSize: fontPercent(14),
            fontFamily: MAINFONT,
            color: props.fontColor ? props.fontColor : MAINBLACK,
          }}>
          {props.text}
        </Text>
        {props.rightIcon ? (
          <TouchableOpacity onPress={props.onRightPress}>
            {props.rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={{width: widthPercent(22)}} />
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: '20%',
            borderBottomWidth: props.borderLevel ? 2 : 0,
            borderColor: props.borderLevel >= 1 ? '#667085' : '#D0D5DD',
          }}></View>
        <View
          style={{
            width: '20%',
            borderBottomWidth: props.borderLevel ? 2 : 0,
            borderColor: props.borderLevel >= 2 ? '#667085' : '#D0D5DD',
          }}></View>
        <View
          style={{
            width: '20%',
            borderBottomWidth: props.borderLevel ? 2 : 0,
            borderColor: props.borderLevel >= 3 ? '#667085' : '#D0D5DD',
          }}></View>
        <View
          style={{
            width: '20%',
            borderBottomWidth: props.borderLevel ? 2 : 0,
            borderColor: props.borderLevel >= 4 ? '#667085' : '#D0D5DD',
          }}></View>
        <View
          style={{
            width: '20%',
            borderBottomWidth: props.borderLevel ? 2 : 0,
            borderColor: props.borderLevel === 5 ? '#667085' : '#D0D5DD',
          }}></View>
      </View>
    </View>
  );
};
