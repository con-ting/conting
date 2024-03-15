import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ArrowRight2} from 'iconsax-react-native';

//onpress로 이벤트 발생 시 검색 페이지로 이동 구현 예정
export default function SeeAllButton() {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>See all</Text>
        <ArrowRight2 size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
});
