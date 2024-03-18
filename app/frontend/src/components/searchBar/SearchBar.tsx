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

export const SearchBar = (props: searchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? Color.MAINYELLOW : Color.MAINGRAY;

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
        onPress={() => props.onSearch(searchQuery)}
        style={{marginRight: widthPercent(10), marginLeft: widthPercent(10)}}>
        <ICON.SearchNormal
          color={borderColor}
          size={16}></ICON.SearchNormal>
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
        placeholder={
          props.placeholder ? props.placeholder : '검색'
        }
        placeholderTextColor={borderColor}
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={() => props.onSearch(searchQuery)}
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
