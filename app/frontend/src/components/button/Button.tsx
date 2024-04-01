import React, {useCallback, useState} from 'react';
import {
  ColorValue,
  DimensionValue,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import {useAuthorization} from '../mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {alertAndLog} from '../../utils/common/alertAndLog.ts';

type BasicButtonProps = {
  onPress?: () => void;
  width?: DimensionValue;
  paddingVertical?: number;
  disabled?: boolean;
  backgroundColor: ColorValue;
  borderColor: string;
  borderRadius?: number;
  borderWidth?: number;
  children: React.ReactNode;
};
/**
 * BasicButton입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - paddingVertical : 상하 패딩 (기본값 12)
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
    <View
      style={{
        width: props.width || '100%',
        paddingHorizontal: widthPercent(4),
      }}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View
          style={{
            backgroundColor: props.backgroundColor,
            borderRadius: widthPercent(props.borderRadius),
            borderWidth: props.borderWidth || 0,
            borderColor: props.borderColor,
            paddingVertical: props.paddingVertical
              ? heightPercent(props.paddingVertical)
              : heightPercent(12),
            alignItems: 'center',
          }}>
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
  borderWidth?: number;
  btnText: string;
  textSize?: number;
  paddingVertical?: number;
};

/**
 * YelloButton 입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - width?: default = '100%' 원하는 크기대로 삽입 가능
 * - paddingVertical? : 상하 패딩 (기본값 12)
 * - disabled?: default = false, 버튼 클릭을 막고자 할 때 사용
 * - btnText: 버튼 내용
 * - textSize: 글자 크기
 * - isRadius?: 곡선 T, 사각 F
 * @returns
 * @author 김형민
 */
export const YellowButton = (props: ButtonProps) => {
  return (
    <BasicButton
      width={props.width}
      onPress={props.onPress}
      backgroundColor={Color.MAINYELLOW}
      borderColor={Color.MAINYELLOW}
      disabled={props.disabled}
      borderRadius={props.isRadius ? 64 : 8}
      paddingVertical={props.paddingVertical}>
      <Text
        style={{
          color: Color.MAINBLACK,
          fontSize: fontPercent(props.textSize ? props.textSize : 12),
          fontFamily: Font.MAINFONT,
        }}>
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
    <BasicButton
      width={props.width}
      onPress={props.onPress}
      backgroundColor={Color.MAINWHITE}
      borderColor={Color.MAINWHITE}
      borderRadius={props.isRadius ? 64 : 8}>
      <Text
        style={{
          color: Color.MAINBLACK,
          fontSize: fontPercent(props.textSize ? props.textSize : 12),
          fontFamily: Font.MAINFONT,
        }}>
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
    <BasicButton
      width={props.width}
      onPress={props.onPress}
      backgroundColor={Color.BTNGRAY}
      borderColor={Color.BTNGRAY}
      borderRadius={props.isRadius ? 64 : 8}>
      <Text
        style={{
          color: Color.MAINWHITE,
          fontSize: fontPercent(props.textSize ? props.textSize : 12),
          fontFamily: Font.MAINFONT,
        }}>
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
    <BasicButton
      width={props.width}
      onPress={props.onPress}
      backgroundColor={Color.MAINBLACK}
      borderColor={Color.MAINYELLOW}
      borderRadius={props.isRadius ? 64 : 8}>
      <Text
        style={{
          color: Color.MAINYELLOW,
          fontSize: fontPercent(props.textSize ? props.textSize : 12),
          fontFamily: Font.MAINFONT,
        }}>
        {props.btnText}
      </Text>
    </BasicButton>
  );
};

export const BlueButton = (props: ButtonProps) => {
  return (
    <BasicButton
      width={props.width}
      paddingVertical={5}
      disabled={props.disabled}
      backgroundColor="#F2F2F2"
      borderColor="#234A96"
      borderRadius={props.isRadius ? 64 : 8}
      borderWidth={props.borderWidth}>
      <Text
        style={{
          color: '#234A96',
          fontSize: props.textSize,
          fontFamily: Font.MAINFONT,
        }}>
        {props.btnText}
      </Text>
    </BasicButton>
  );
};

export function ConnectButton(props: ButtonProps) {
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } catch (err: any) {
      alertAndLog(
        '연결 중 에러 발생',
        err instanceof Error ? err.message : err,
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);
  return (
    <BasicButton
      width={props.width}
      backgroundColor={Color.MAINYELLOW}
      borderColor={Color.MAINYELLOW}
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
      borderRadius={props.isRadius ? 64 : 8}
      paddingVertical={props.paddingVertical}>
      <Text
        style={{
          color: Color.MAINBLACK,
          fontSize: fontPercent(props.textSize ? props.textSize : 12),
          fontFamily: Font.MAINFONT,
        }}>
        {props.btnText}
      </Text>
    </BasicButton>
  );
}
