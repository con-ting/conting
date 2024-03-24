import React, {useEffect, useState} from 'react';
import {
  DimensionValue,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import * as ICON from 'iconsax-react-native';

type InputProps = {
  placeholder: string;
  width?: DimensionValue;
  value: string; // 입력한 값
  onFocusCallback?: () => void;
  onChangeText: (value: any) => void; // 입력한 값으로 state 변경
  isForNewEnter?: boolean; // 회원가입 스크린에서 사용되는 비밀번호 입력창일 경우 사용
  realPassword?: string; // 사용자가 입력한 비밀번호
  isForReEnter?: boolean; // 비밀번호 재입력창일 경우
  isStart?: boolean; // 인증 번호 입력 제한 시간 카운트 시작 여부
  realCertNumber?: string;
  isSameCertNumber?: boolean; // 인증번호 같은지
  backGroundColor?: string;
  textColor?: string;
  editable?: boolean;
  height?: number;
  padding?: DimensionValue;
  onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  refInput?: React.LegacyRef<TextInput>;
  onBlur?: () => void;
};

/**
 * - 간단한 입력을 받을때 사용하는 컴포넌트 입니다.
 * @param props
 * - placeholder : 입력 필드에 표시될 텍스트입니다.
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - value: string; 현재 입력 필드에 입력된 값입니다. 이 값은 상태 관리를 통해 업데이트됩니다
 * - onFocusCallback?: () => void;  입력 필드에 포커스가 맞춰질 때 호출될 콜백 함수입니다. 특정 동작을 실행할 수 있습니다.
 * - onChangeText: (value: any) => void; 사용자가 입력 필드에 텍스트를 입력할 때마다 호출되는 함수입니다. 이 함수를 통해 입력된 값을 상태로 관리할 수 있습니다.
 * - isStart?: boolean; 인증 번호 입력 제한 시간 카운트 시작 여부
 * - isSameCertNumber?: boolean; 인증이 되었는지
 * - editable?: boolean; 입력 필드가 수정 가능한지 여부를 나타냅니다. 이 속성을 false로 설정하면 사용자는 입력 필드를 편집할 수 없습니다
 * - height?: number; 입력 필드의 높이와 패딩을 정의합니다. 사용자 인터페이스의 일관성을 유지하기 위해 필요에 따라 조정할 수 있습니다.
 * - onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void; 입력 필드에서 특정 키 이벤트가 발생했을 때 호출될 콜백 함수입니다. 예를 들어, 입력을 완료하고 다음 필드로 넘어가는 동작을 구현할 수 있습니다.
 * - onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
 * - backGroundColor?: 백그라운드 색상 지정 (기본 블랙)
 * - textColor? : 텍스트 색상 지정 (기본 화이트)
 * - refInput?: React.LegacyRef<TextInput>;입력 필드에 대한 참조를 저장합니다. 이를 통해 컴포넌트 외부에서 입력 필드를 직접 조작할 수 있습니다.
 * - onBlur?: () => void;  입력 필드에서 포커스가 벗어났을 때 호출될 콜백 함수입니다. 필요한 정리 작업을 수행할 수 있습니다.
 * @returns
 * @author 김형민
 */
export const SimpleInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: widthPercent(8),
        borderWidth: widthPercent(2),
        paddingHorizontal: widthPercent(4),
        borderColor: borderColor,
        backgroundColor: props.backGroundColor
          ? props.backGroundColor
          : Color.MAINBLACK,
        width: props.width || '100%',
      }}>
      <TextInput
        ref={props.refInput}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor={borderColor}
        onPressOut={props.onPressOut}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          if (props.onBlur != undefined) props.onBlur();
        }}
        style={{
          fontSize: fontPercent(12),
          color: props.textColor ? props.textColor : Color.MAINWHITE,
          fontFamily: Font.MAINFONT,
          height: props.height ? heightPercent(props.height) : undefined,
          width: '100%',
        }}
        editable={props.editable}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.onSubmitEditing ? 'done' : 'next'}
      />
    </View>
  );
};

/**
 * - 긴글을 입력받을 때 사용하는 컴포넌트 입니다.
 * @param props
 * - placeholder : 입력 필드에 표시될 텍스트입니다.
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - value: string; 현재 입력 필드에 입력된 값입니다. 이 값은 상태 관리를 통해 업데이트됩니다
 * - onFocusCallback?: () => void;  입력 필드에 포커스가 맞춰질 때 호출될 콜백 함수입니다. 특정 동작을 실행할 수 있습니다.
 * - onChangeText: (value: any) => void; 사용자가 입력 필드에 텍스트를 입력할 때마다 호출되는 함수입니다. 이 함수를 통해 입력된 값을 상태로 관리할 수 있습니다.
 * - editable?: boolean; 입력 필드가 수정 가능한지 여부를 나타냅니다. 이 속성을 false로 설정하면 사용자는 입력 필드를 편집할 수 없습니다
 * - height?: number; 입력 필드의 높이와 패딩을 정의합니다. 사용자 인터페이스의 일관성을 유지하기 위해 필요에 따라 조정할 수 있습니다.
 * - onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void; 입력 필드에서 특정 키 이벤트가 발생했을 때 호출될 콜백 함수입니다. 예를 들어, 입력을 완료하고 다음 필드로 넘어가는 동작을 구현할 수 있습니다.
 * - onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
 * - refInput?: React.LegacyRef<TextInput>;입력 필드에 대한 참조를 저장합니다. 이를 통해 컴포넌트 외부에서 입력 필드를 직접 조작할 수 있습니다.
 * - onBlur?: () => void;  입력 필드에서 포커스가 벗어났을 때 호출될 콜백 함수입니다. 필요한 정리 작업을 수행할 수 있습니다.
 * @returns
 * @author 김형민
 */
export const MultiLineInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: props.backGroundColor
          ? props.backGroundColor
          : Color.MAINBLACK,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: widthPercent(8),
        borderWidth: widthPercent(2),
        paddingHorizontal: widthPercent(4),
        borderColor: borderColor,
        width: props.width || '100%',
      }}>
      <TextInput
        multiline
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={borderColor}
        style={{
          fontSize: fontPercent(12),
          color: props.textColor ? props.textColor : Color.MAINWHITE,
          fontFamily: Font.MAINFONT,
          width: '100%',
          height: heightPercent(props.height),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={props.editable}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.onSubmitEditing ? 'done' : 'next'}
      />
    </View>
  );
};

/**
 * - 간단한 입력을 받을때 사용하는 컴포넌트 입니다.
 * @param props
 * - placeholder : 입력 필드에 표시될 텍스트입니다.
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - value: string; 현재 입력 필드에 입력된 값입니다. 이 값은 상태 관리를 통해 업데이트됩니다
 * - onFocusCallback?: () => void;  입력 필드에 포커스가 맞춰질 때 호출될 콜백 함수입니다. 특정 동작을 실행할 수 있습니다.
 * - onChangeText: (value: any) => void; 사용자가 입력 필드에 텍스트를 입력할 때마다 호출되는 함수입니다. 이 함수를 통해 입력된 값을 상태로 관리할 수 있습니다.
 * - isForNewEnter?: boolean; 회원가입 스크린에서 사용되는 비밀번호 입력창일 경우 사용
 * - realPassword?: string; 사용자가 입력한 비밀번호
 * - isForReEnter?: boolean; 비밀번호 재입력창일 경우
 * - isStart?: boolean; 인증 번호 입력 제한 시간 카운트 시작 여부
 * - isSameCertNumber?: boolean; 인증이 되었는지
 * - editable?: boolean; 입력 필드가 수정 가능한지 여부를 나타냅니다. 이 속성을 false로 설정하면 사용자는 입력 필드를 편집할 수 없습니다
 * - height?: number; 입력 필드의 높이와 패딩을 정의합니다. 사용자 인터페이스의 일관성을 유지하기 위해 필요에 따라 조정할 수 있습니다.
 * - onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void; 입력 필드에서 특정 키 이벤트가 발생했을 때 호출될 콜백 함수입니다. 예를 들어, 입력을 완료하고 다음 필드로 넘어가는 동작을 구현할 수 있습니다.
 * - onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
 * - refInput?: React.LegacyRef<TextInput>;입력 필드에 대한 참조를 저장합니다. 이를 통해 컴포넌트 외부에서 입력 필드를 직접 조작할 수 있습니다.
 * - onBlur?: () => void;  입력 필드에서 포커스가 벗어났을 때 호출될 콜백 함수입니다. 필요한 정리 작업을 수행할 수 있습니다.
 * @returns
 * @author 김형민
 */
export const PasswordInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

  // 비밀번호 유효성 검사 start
  const checkPassword = (password: string) => {
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /\d/.test(password);
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 20;

    return {
      containsLetter,
      containsNumber,
      containsSpecialChar,
      isValidLength,
    };
  };

  const getCheckColor = (strengthType: boolean) => {
    return strengthType ? Color.MAINYELLOW : Color.MAINGRAY;
  };

  const handleFocus = () => {
    setFocused(true);
    if (props.onFocusCallback) {
      props.onFocusCallback(); // Trigger the onFocus callback if provided
    }
  };

  const passwordStrength = checkPassword(props.value);
  // 비밀번호 유효성 검사 end

  // 재입력 비밀번호 일치 검사 start
  const [isRePasswordMatch, setIsRePasswordMatch] = useState(false);

  useEffect(() => {
    // 입력한 값이 서버에서 받은 인증번호와 일치하는지 확인
    setIsRePasswordMatch((props.value && props.value) === props.realPassword);
  }, [props.value, props.realPassword]);
  // 재입력 비밀번호 일치 검사 end

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: props.backGroundColor
            ? props.backGroundColor
            : Color.MAINBLACK,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderRadius: widthPercent(8),
          borderWidth: widthPercent(2),
          paddingHorizontal: widthPercent(4),
          borderColor: borderColor,
          width: props.width || '100%',
        }}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          autoCorrect={false}
          placeholder={props.placeholder}
          placeholderTextColor={borderColor}
          onFocus={handleFocus}
          onBlur={() => {
            setFocused(false);
          }}
          style={{
            fontSize: fontPercent(12),
            color: props.textColor ? props.textColor : Color.MAINWHITE,
            fontFamily: Font.MAINFONT,
            height: props.height ? heightPercent(props.height) : undefined,
            width: '90%',
          }}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          onPress={() => {
            setIsSecure(!isSecure);
          }}>
          {isSecure ? (
            <ICON.Eye size={25} color={borderColor}></ICON.Eye>
          ) : (
            <ICON.EyeSlash size={25} color={borderColor}></ICON.EyeSlash>
          )}
        </TouchableOpacity>
      </View>
      {props.isForNewEnter && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: heightPercent(4),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ICON.SecuritySafe
              size={widthPercent(14)}
              color={getCheckColor(passwordStrength.containsLetter)}
              variant={'Bold'}
            />
            <Text
              style={{
                paddingLeft: widthPercent(2),
                paddingRight: widthPercent(5),
                color: getCheckColor(passwordStrength.containsLetter),
                fontFamily: Font.MAINFONT,
              }}>
              영문
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ICON.SecuritySafe
              size={widthPercent(14)}
              color={getCheckColor(passwordStrength.containsNumber)}
              variant={'Bold'}
            />
            <Text
              style={{
                paddingLeft: widthPercent(2),
                paddingRight: widthPercent(5),
                color: getCheckColor(passwordStrength.containsNumber),
                fontFamily: Font.MAINFONT,
              }}>
              숫자
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ICON.SecuritySafe
              size={widthPercent(16)}
              color={getCheckColor(passwordStrength.containsSpecialChar)}
              variant={'Bold'}
            />
            <Text
              style={{
                paddingLeft: widthPercent(2),
                paddingRight: widthPercent(5),
                color: getCheckColor(passwordStrength.containsSpecialChar),
                fontFamily: Font.MAINFONT,
              }}>
              특수문자
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ICON.SecuritySafe
              size={widthPercent(14)}
              color={getCheckColor(passwordStrength.isValidLength)}
              variant={'Bold'}
            />
            <Text
              style={{
                paddingLeft: widthPercent(2),
                paddingRight: widthPercent(5),
                color: getCheckColor(passwordStrength.isValidLength),
                fontFamily: Font.MAINFONT,
              }}>
              8~20자
            </Text>
          </View>
        </View>
      )}
      {props.isForReEnter && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: heightPercent(4),
          }}>
          <ICON.SecuritySafe
            size={widthPercent(14)}
            color={
              isRePasswordMatch && props.value != ''
                ? Color.MAINYELLOW
                : Color.MAINGRAY
            }
            variant={'Bold'}
          />
          <Text
            style={{
              paddingLeft: widthPercent(2),
              paddingRight: widthPercent(5),
              color:
                isRePasswordMatch && props.value != ''
                  ? Color.MAINYELLOW
                  : Color.MAINGRAY,
              fontFamily: Font.MAINFONT,
            }}>
            비밀번호가 같아요
          </Text>
        </View>
      )}
    </View>
  );
};
/**
 * - CertNumberInput
 * - 인증번호 입력시 사용되는 입력창입니다.
 * @param props
 * @returns
 * @author 김형민
 */
export const CertNumberInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

  // 인증번호 입력 제한 시간을 구현 부분 start
  const [timer, setTimer] = useState(180); // 초 단위로 3분을 나타냄

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (props.isStart && timer > 0) {
      // 타이머 시작 및 타이머가 0보다 큰 동안 실행
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval
    };
  }, [props.isStart, timer]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };
  // 인증번호 입력 제한 시간을 구현 부분 end

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: props.backGroundColor
            ? props.backGroundColor
            : Color.MAINBLACK,
          borderRadius: widthPercent(8),
          borderWidth: widthPercent(2),
          padding: widthPercent(12),
          borderColor: borderColor,
          width: props.width || '100%',
        }}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          autoCorrect={false}
          placeholder={props.placeholder}
          placeholderTextColor={borderColor}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          style={{
            fontSize: fontPercent(12),
            color: props.textColor ? props.textColor : Color.MAINWHITE,
            fontFamily: Font.MAINFONT,
            width: '85%',
          }}
        />
        <Text
          style={{
            fontSize: fontPercent(12),
            fontFamily: Font.MAINFONT,
            color: Color.REDBASE,
          }}>
          {formatTime(timer)}
        </Text>
      </View>
      <View style={{marginTop: heightPercent(4), marginLeft: widthPercent(4)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ICON.SecuritySafe
            size={widthPercent(14)}
            color={
              props.isSameCertNumber && props.value != ''
                ? Color.MAINYELLOW
                : Color.MAINGRAY
            }
            variant={'Bold'}
          />
          <Text
            style={{
              fontFamily: Font.MAINFONT,
              paddingLeft: widthPercent(2),
              paddingRight: widthPercent(5),
              color: props.isSameCertNumber ? Color.MAINYELLOW : Color.MAINGRAY,
            }}>
            인증번호가 같아요
          </Text>
        </View>
      </View>
    </View>
  );
};

/**
 * - 핸드폰 번호를 입력받을때 사용하는 컴포넌트
 * @param props
 * - placeholder : 입력 필드에 표시될 텍스트입니다.
 * - width: default = '100%' 원하는 크기대로 삽입 가능
 * - value: string; 현재 입력 필드에 입력된 값입니다. 이 값은 상태 관리를 통해 업데이트됩니다
 * - onFocusCallback?: () => void;  입력 필드에 포커스가 맞춰질 때 호출될 콜백 함수입니다. 특정 동작을 실행할 수 있습니다.
 * - onChangeText: (value: any) => void; 사용자가 입력 필드에 텍스트를 입력할 때마다 호출되는 함수입니다. 이 함수를 통해 입력된 값을 상태로 관리할 수 있습니다.
 * - isStart?: boolean; 인증 번호 입력 제한 시간 카운트 시작 여부
 * - isSameCertNumber?: boolean; 인증이 되었는지
 * - editable?: boolean; 입력 필드가 수정 가능한지 여부를 나타냅니다. 이 속성을 false로 설정하면 사용자는 입력 필드를 편집할 수 없습니다
 * - height?: number; 입력 필드의 높이와 패딩을 정의합니다. 사용자 인터페이스의 일관성을 유지하기 위해 필요에 따라 조정할 수 있습니다.
 * - onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void; 입력 필드에서 특정 키 이벤트가 발생했을 때 호출될 콜백 함수입니다. 예를 들어, 입력을 완료하고 다음 필드로 넘어가는 동작을 구현할 수 있습니다.
 * - onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
 * - backGroundColor?: 백그라운드 색상 지정 (기본 블랙)
 * - textColor? : 텍스트 색상 지정 (기본 화이트)
 * - refInput?: React.LegacyRef<TextInput>;입력 필드에 대한 참조를 저장합니다. 이를 통해 컴포넌트 외부에서 입력 필드를 직접 조작할 수 있습니다.
 * - onBlur?: () => void;  입력 필드에서 포커스가 벗어났을 때 호출될 콜백 함수입니다. 필요한 정리 작업을 수행할 수 있습니다.
 * @returns
 * @author 김형민
 */
export const PhoneNumberInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

  // 하이픈 자동 추가 로직을 포함한 핸드폰 번호 입력 핸들러
  const handlePhoneNumberChange = (text: string) => {
    // 숫자, 백스페이스, 하이픈만 허용하는 정규식
    const regex = /^[0-9\b-]+$/;

    // 숫자만 추출 (하이픈 제거)
    const digits = text.replace(/-/g, '');

    if (regex.test(text)) {
      // 자동 하이픈 추가 로직
      let formattedPhoneNumber = digits;
      if (digits.length > 3 && digits.length <= 7) {
        formattedPhoneNumber = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else if (digits.length > 7) {
        formattedPhoneNumber = `${digits.slice(0, 3)}-${digits.slice(
          3,
          7,
        )}-${digits.slice(7, 11)}`;
      }
      props.onChangeText(formattedPhoneNumber);
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: widthPercent(8),
        borderWidth: widthPercent(2),
        paddingHorizontal: widthPercent(4),
        borderColor: borderColor,
        backgroundColor: props.backGroundColor
          ? props.backGroundColor
          : Color.MAINBLACK,
        width: props.width || '100%',
      }}>
      <TextInput
        ref={props.refInput}
        value={props.value}
        onChangeText={handlePhoneNumberChange} // 함수 연결 변경
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor={borderColor}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          if (props.onBlur != undefined) props.onBlur();
        }}
        style={{
          fontSize: fontPercent(12),
          color: props.textColor ? props.textColor : Color.MAINWHITE,
          fontFamily: Font.MAINFONT,
          height: props.height ? heightPercent(props.height) : undefined,
          width: '100%',
        }}
        editable={props.editable}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.onSubmitEditing ? 'done' : 'next'}
      />
    </View>
  );
};
