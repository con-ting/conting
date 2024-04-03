import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useEffect, useState} from 'react';

export default function ConcertHallList({halls, onHallSelect}) {
  const [dropDownTestOpen, setDropDownTestOpen] = useState(false);
  const [selectedDropDownTest, setSelectedDropDownTest] = useState(null);
  // 선택된 공연장 상태 관리
  const [selectedConcertHall, setSelectedConcertHall] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const filteredHalls = halls.filter(hall =>
    hall.address.startsWith(selectedRegion),
  );

  const handleSidoItemSelect = selectedValue => {
    setSelectedDropDownTest(selectedValue); // 선택된 드롭다운 항목 상태 업데이트
    setSelectedRegion(selectedValue); // 필터링할 지역 상태 업데이트
  };

  useEffect(() => {
    const uniqueRegions = Array.from(
      new Set(halls.map(hall => hall.address.split(' ')[0])),
    );
    const regionData = uniqueRegions.map(region => ({
      label: region,
      value: region,
    }));
    setRegions(regionData);
  }, [halls]);

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
            data={regions}
          />
        </View>
      </View>

      <FlatList
        style={{margin: 10}}
        data={filteredHalls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.listItem,
              selectedConcertHall === item.name ? styles.selectedItem : null,
            ]}
            onPress={() => {
              setSelectedConcertHall(item.name); // 공연장 이름으로 선택된 상태 업데이트
              onHallSelect(item); // 상위 컴포넌트로 선택된 공연장 정보 전달
            }}>
            <Text
              style={[
                F_SIZE_B_TITLE,
                selectedConcertHall === item.name ? styles.selectedText : null,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
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
