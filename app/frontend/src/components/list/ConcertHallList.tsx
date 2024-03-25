import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BUTTONSELECT,
  CARDBASE,
  MAINBLACK,
  MAINWHITE,
  MAINYELLOW,
} from '../../config/Color';
import {F_SIZE_B_TITLE, F_SIZE_TITLE} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {Dropdown} from '../dropdown/Dropdown';
import {useState} from 'react';

export default function ConcertHallList() {
  const [dropDownTestOpen, setDropDownTestOpen] = useState(false);
  const [selectedDropDownTest, setSelectedDropDownTest] = useState(null);
  const [selectedConcertHall, setSelectedConcertHall] = useState(null);

  const handleSidoItemSelect = selectedValue => {
    setSelectedDropDownTest(selectedValue);
  };

  const sidoData = [
    {label: '경기도', value: '경기도'},
    {label: '강원도', value: '강원도'},
    {label: '충청북도', value: '충청북도'},
    {label: '충청남도', value: '충청남도'},
    {label: '전라북도', value: '전라북도'},
    {label: '전라남도', value: '전라남도'},
    {label: '경상북도', value: '경상북도'},
    {label: '경상남도', value: '경상남도'},
  ];
  const concertHallData = {
    경기도: [
      '서울특별시 예술의 전당',
      '인천광역시 부평아트센터',
      '세종 예술의 전당',
      '세종 문화회관 M씨어터',
      'LG 아트센터 서울',
    ],
    강원도: ['공연장4', '공연장5'],
    충청북도: ['공연장6', '공연장7'],
    충청남도: ['공연장8', '공연장9'],
    전라북도: ['공연장10', '공연장11'],
    전라남도: ['공연장12', '공연장13'],
    경상북도: ['공연장14', '공연장15'],
    경상남도: ['공연장16', '공연장17'],
  };

  return (
    <View style={styles.container}>
      <View style={styles.drop}>
        <View>
          <Dropdown
            width={widthPercent(133)}
            textSize={16}
            placeholder="지역선택"
            open={dropDownTestOpen}
            setOpen={setDropDownTestOpen}
            onSelectValue={handleSidoItemSelect}
            data={sidoData}
          />
        </View>
      </View>
      {selectedDropDownTest && (
        <View style={styles.listContainer}>
          {concertHallData[selectedDropDownTest]?.map(
            (hall: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.listItem,
                  selectedConcertHall === hall ? styles.selectedItem : null,
                ]}
                onPress={() => setSelectedConcertHall(hall)}>
                <Text
                  style={[
                    F_SIZE_B_TITLE,
                    selectedConcertHall === hall ? styles.selectedText : null,
                  ]}>
                  {hall}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CARDBASE,
    borderRadius: 12,
    width: widthPercent(345),
    height: heightPercent(400),
  },
  drop: {
    // width: '100%',
    // backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  listContainer: {
    // alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: MAINWHITE,
    borderRadius: 5,
    margin: 10,
  },
  listItem: {
    width: widthPercent(318),
    height: heightPercent(40),
    backgroundColor: MAINWHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  selectedItem: {
    borderColor: MAINYELLOW,
    borderWidth: 2,
    backgroundColor: BUTTONSELECT,
  },
  selectedText: {
    color: MAINWHITE,
  },
});
