import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SimpleInput, MultiLineInput } from '../../components/input/input';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { widthPercent } from '../../config/Dimensions';
import { CheckBox } from '../../components/checkbox/CheckBox';

const ReservationWaitingScreen = () => {
    const [empId, setEmpId] = useState('');

    const [dropDownTestOpen, setDropDownTestOpen] = useState(false);
    
    const [selectedDropDownTest, setSelectedDropDownTest] = useState(null);
    const handleSidoItemSelect = (selectedValue) => {
      setSelectedDropDownTest(selectedValue);
    };
    const [checkBoxTest, setCheckBoxTest] = useState(false);
    const hospitalData = [
      { label: '테스트1', value: '테스트벨류' },
      { label: '테스트2', value: '테스트벨류2' },
      { label: '테스트3', value: '테스트벨류3' },
      { label: '테스트4', value: '테스트벨류4' },
      { label: 'test', value: 'test' },
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.text}>환불대기중 페이지</Text>
        <Text style={styles.text}>메인 페이지</Text>
        <SimpleInput placeholder='하기싫어' value={empId} onChangeText={setEmpId} width='30%' />
        <MultiLineInput placeholder='하기싫어' value={empId} onChangeText={setEmpId} width='70%' height={100} />
        
        <Dropdown data={hospitalData} width={widthPercent(165)} placeholder='드롭다운 테스트' zIndexInverse={10} open={dropDownTestOpen} setOpen={setDropDownTestOpen} onSelectValue={handleSidoItemSelect} textSize={12} />
        
        <CheckBox text='체크박스 테스트' isChecked={checkBoxTest} setIsChecked={() => setCheckBoxTest(!checkBoxTest)} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
export default ReservationWaitingScreen;