import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, TextInput, Text, TextInputSubmitEditingEventData, NativeSyntheticEvent, DimensionValue, NativeTouchEvent } from 'react-native';
import { fontPercent, heightPercent, widthPercent } from '../../config/Dimensions';
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
  isSameCertNumber?: boolean; // 인증번호 같은지
  editable?: boolean;
  height?: number;
  padding?: DimensionValue;
  onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
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
 * - refInput?: React.LegacyRef<TextInput>;입력 필드에 대한 참조를 저장합니다. 이를 통해 컴포넌트 외부에서 입력 필드를 직접 조작할 수 있습니다.
 * - onBlur?: () => void;  입력 필드에서 포커스가 벗어났을 때 호출될 콜백 함수입니다. 필요한 정리 작업을 수행할 수 있습니다.
 * @returns
 * @author 김형민
 */
export const SimpleInput = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOR : Color.MAINGRAY;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: widthPercent(8),
        borderWidth: widthPercent(2),
        paddingHorizontal: widthPercent(4),
        borderColor: borderColor,
        width: props.width || '100%',
      }}
    >
      <TextInput
        ref={props.refInput}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor={Color.MAINGRAY}
        onPressOut={props.onPressOut}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          if (props.onBlur != undefined) props.onBlur();
        }}
        style={{ fontSize: fontPercent(12), color: Color.MAINWHITE, fontFamily: Font.MAINFONT, height: props.height ? heightPercent(props.height) : undefined, width: '100%' }}
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
  const borderColor = focused ? Color.MAINYELLOR : Color.MAINGRAY;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: widthPercent(8),
        borderWidth: widthPercent(2),
        paddingHorizontal: widthPercent(4),
        borderColor: borderColor,
        width: props.width || '100%',
      }}
    >
      <TextInput
        multiline
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={Color.TEXTGRAY}
        style={{ fontSize: fontPercent(12), color: Color.MAINWHITE, fontFamily: Font.MAINFONT, width: '100%', height: heightPercent(props.height) }}
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
// export const PasswordInput = (props: InputProps) => {
//   const [focused, setFocused] = useState(false);
//   const [isSecure, setIsSecure] = useState(true);
//   const borderColor = focused ? Color.MAINYELLOR : Color.MAINGRAY;

//   // 비밀번호 유효성 검사 start
//   const checkPassword = (password) => {
//     const containsLetter = /[a-zA-Z]/.test(password);
//     const containsNumber = /\d/.test(password);
//     const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const isValidLength = password.length >= 8 && password.length <= 20;

//     return {
//       containsLetter,
//       containsNumber,
//       containsSpecialChar,
//       isValidLength,
//     };
//   };

//   const getCheckColor = (strengthType) => {
//     return strengthType ? Color.MAINYELLOR : Color.MAINGRAY;
//   };

//   const handleFocus = () => {
//     setFocused(true);
//     if (props.onFocusCallback) {
//       props.onFocusCallback(); // Trigger the onFocus callback if provided
//     }
//   };

//   const passwordStrength = checkPassword(props.value);
//   // 비밀번호 유효성 검사 end

//   // 재입력 비밀번호 일치 검사 start
//   const [isRePasswordMatch, setIsRePasswordMatch] = useState(false);

//   useEffect(() => {
//     // 입력한 값이 서버에서 받은 인증번호와 일치하는지 확인
//     setIsRePasswordMatch(props.value && props.value === props.realPassword);
//   }, [props.value, props.realPassword]);
//   // 재입력 비밀번호 일치 검사 end

//   return (
//     <View>
//       <View
//         style={{
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           borderRadius: widthPercent(8),
//           borderWidth: widthPercent(2),
//           padding: widthPercent(12),
//           borderColor: borderColor,
//           width: props.width === 'small' ? widthPercent(240) : undefined,
//         }}
//       >
//         <TextInput
//           value={props.value}
//           onChangeText={props.onChangeText}
//           autoCorrect={false}
//           placeholder={props.placeholder}
//           placeholderTextColor={Color.TEXTGRAY}
//           onFocus={handleFocus}
//           onBlur={() => {
//             setFocused(false);
//           }}
//           style={{ fontSize: fontPercent(12), fontFamily: Font.MAINFONT, width: '94%' }}
//           secureTextEntry={isSecure}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             setIsSecure(!isSecure);
//           }}
//         >
//           {isSecure ? <ICON.Eye size={25}></ICON.Eye> : <ICON.EyeSlash size={25}></ICON.EyeSlash>}
//         </TouchableOpacity>
//       </View>
//       {props.isForNewEnter && (
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightPercent(4) }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name='check' size={widthPercent(14)} iconColor={getCheckColor(passwordStrength.containsLetter)} />
//             <Text style={{ paddingLeft: widthPercent(2), paddingRight: widthPercent(5), color: getCheckColor(passwordStrength.containsLetter) }}>영문</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name='check' size={widthPercent(14)} iconColor={getCheckColor(passwordStrength.containsNumber)} />
//             <Text style={{ paddingLeft: widthPercent(2), paddingRight: widthPercent(5), color: getCheckColor(passwordStrength.containsNumber) }}>숫자</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name='check' size={widthPercent(14)} iconColor={getCheckColor(passwordStrength.containsSpecialChar)} />
//             <Text style={{ paddingLeft: widthPercent(2), paddingRight: widthPercent(5), color: getCheckColor(passwordStrength.containsSpecialChar) }}>특수문자</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name='check' size={widthPercent(14)} iconColor={getCheckColor(passwordStrength.isValidLength)} />
//             <Text style={{ paddingLeft: widthPercent(2), paddingRight: widthPercent(5), color: getCheckColor(passwordStrength.isValidLength) }}>8~20자</Text>
//           </View>
//         </View>
//       )}
//       {props.isForReEnter && (
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightPercent(4) }}>
//           <Icon name='check' size={widthPercent(14)} iconColor={isRePasswordMatch ? Color.MAINYELLOR : Color.MAINGRAY} />
//           <Text style={{ paddingLeft: widthPercent(2), paddingRight: widthPercent(5), color: isRePasswordMatch ? Color.MAINYELLOR : Color.MAINGRAY }}>비밀번호가 같아요</Text>
//         </View>
//       )}
//     </View>
//   );
// };

