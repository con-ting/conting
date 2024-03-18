import React, { useState, useEffect } from 'react';
import { View, DimensionValue, TextStyle } from 'react-native';
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import { fontPercent } from '../../config/Dimensions';
import * as ICON from 'iconsax-react-native';



type dropdownProps = {
  width?: DimensionValue | '90%';
  zIndex?: number;
  zIndexInverse: number;
  data: Array<{ label: string; value: string }>;
  open: boolean;
  setOpen: Function;
  placeholder?: string;
  onSelectValue: Function;
  textSize: number;
};

/**
 * Dropdown
 * Dropdown 컴포넌트입니다.
 * - width : 너비 사이즈는 width로 조절합니다. 지정하지 않았을 경우 widthPercent(300)로 임의 지정됩니다.
 * - textSize : px 사이즈 입력
 * - placeholder : placeholder 설정
 * - data: dropDownConatiner에 들어갈 데이터 배열 (ex. [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Pear1', value: 'pear1' },
  ];)
 * @param props
 * @return
 * @author 김형민
 */
export const Dropdown = (props: dropdownProps) => {
  const { open, setOpen } = props;
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.data);

  useEffect(() => {
    setItems(props.data);
  }, [props.data]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSelectValue = (selectedValue) => {
    props.onSelectValue(selectedValue);
  };

  const selectedStyle: DropDownPickerProps<any>['style'] = {
    width: props.width,
    borderColor: open ? Color.MAINYELLOW : Color.MAINGRAY,
    backgroundColor: Color.MAINBLACK,
    
    shadowColor: '#FEC84B',
    shadowOffset: { width: 0, height: open ? 10 : 0 },
    shadowOpacity: open ? 0.5 : 0,
    shadowRadius: open ? 5 : 0,
    elevation: open ? 12 : 0,
    zIndex: open ? 12 : 0,
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={handleOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        handleSelectValue(value);
      }}
      placeholder={props.placeholder ? props.placeholder : '선택'}
      listMode='SCROLLVIEW'
      autoScroll={true}
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      ArrowUpIconComponent={({style}) => <ICON.ArrowUp2 color={Color.MAINWHITE} />}
      ArrowDownIconComponent={({style}) => <ICON.ArrowDown2 color={Color.MAINWHITE} />}
      dropDownDirection='BOTTOM'
      zIndex={props.zIndex ? props.zIndex : 300}
      zIndexInverse={props.zIndexInverse}
      closeOnBackPressed={true}
      style={selectedStyle}
      dropDownContainerStyle={{
        width: props.width || '90%',
        backgroundColor: Color.MAINBLACK,
        borderColor: Color.MAINYELLOW,
      }}
      selectedItemContainerStyle={{
        backgroundColor: Color.MAINYELLOW,
        marginHorizontal: 5,
        borderRadius: 5,
      }}
      selectedItemLabelStyle={{
        color: Color.TEXTGRAY,
      }}
      listItemLabelStyle={{
        color: Color.TEXTGRAY,
      }}
      textStyle={{
        fontFamily: Font.MAINFONT,
        fontSize: fontPercent(props.textSize),
      }}
      labelStyle={{
        color: Color.TEXTGRAY,
      }}
      placeholderStyle={{
        color: Color.TEXTGRAY,
      }}
      // 검색
      searchable={true}
      translation={{
        SEARCH_PLACEHOLDER: '검색',
      }}
      searchTextInputStyle={{
        color: Color.TEXTGRAY,
        borderColor: Color.MAINGRAY,
      }}
      searchContainerStyle={{
        backgroundColor: Color.MAINBLACK,
      }}
    />
  );
};
