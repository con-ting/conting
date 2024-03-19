import React, {useState} from 'react';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {DimensionValue, TextInput, TouchableOpacity, View} from 'react-native';
import * as ICON from 'iconsax-react-native';

type searchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  width?: DimensionValue;
  backGroundColor?: string;
  textColor?: string;
  textSize?: number;
  value?: string; // 입력한 값
  onFocusCallback?: () => void;
  onChangeText: (value: any) => void; // 입력한 값으로 state 변경
  onBlur?: () => void;
};

/**
 * BasicButton입니다.
 * @param props
 * - [필수]
 * - onSearch: 엔터, 검색아이콘 터치 이후 실행할 함수
 * - [선택]
 * - placeholder?: placeholedr
 * - width?: default = '100%' 원하는 크기대로 삽입 가능
 * - backgroundColor?: 뒷배경 색깔
 * - textColor: 글씨 색상
 * - textSize: 글씨 크기
 * - value: 현재 입력값
 * @returns
 * @author 김형민
 */
export const SearchBar = (props: searchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;
  // 검색을 실행하고 검색어를 초기화하는 함수
  const handleSearch = () => {
    props.onSearch(searchQuery); // 사용자가 제공한 onSearch 함수 호출
    setSearchQuery(''); // 검색어 상태를 빈 문자열로 초기화
  };
  return (
    <View
      style={{
        flexDirection: 'row', // 요소들을 나란히 배열
        alignItems: 'center', // 세로 방향으로 가운데 정렬
        width: props.width || '100%',
        paddingHorizontal: widthPercent(4),
        paddingVertical: heightPercent(4),
        borderWidth: widthPercent(1),
        borderRadius: widthPercent(8),
        borderColor: borderColor,
        backgroundColor: props.backGroundColor
          ? props.backGroundColor
          : Color.MAINBLACK,
      }}>
      <TouchableOpacity
        onPress={handleSearch}
        style={{marginRight: widthPercent(10), marginLeft: widthPercent(10)}}>
        <ICON.SearchNormal color={borderColor} size={16}></ICON.SearchNormal>
      </TouchableOpacity>
      <TextInput
        style={{
          flex: 1, // 나머지 공간을 모두 차지하도록 설정
          color: props.textColor ? props.textColor : Color.MAINWHITE,
          fontSize: props.textSize
            ? fontPercent(props.textSize)
            : fontPercent(14),
          fontFamily: Font.MAINFONT,
        }}
        onChangeText={setSearchQuery}
        value={searchQuery} // 입력 필드의 값을 searchQuery 상태로 설정
        placeholder={props.placeholder ? props.placeholder : '검색'}
        placeholderTextColor={borderColor}
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          if (props.onBlur != undefined) props.onBlur();
        }}
      />
    </View>
  );
};
