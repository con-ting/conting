import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import ConcertHallCard from '../../../components/card/ConcertHallCard';
import {useNavigation} from '@react-navigation/native';

export default function ConcertHallScreen({halls}: any) {
  const navigation = useNavigation();

  // FlatList의 renderItem 함수
  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <ConcertHallCard
        onPress={() => console.log('공연홀보기로 이동')}
        title={item.name}
        seat={item.total_seat_count}
        address={item.address}
      />
    </View>
  );

  return (
    <FlatList
      data={halls}
      renderItem={renderItem}
      keyExtractor={item => item.id} // 각 항목의 고유 key를 지정
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAINBLACK,
  },
  cards: {
    marginTop: 16,
  },
});
