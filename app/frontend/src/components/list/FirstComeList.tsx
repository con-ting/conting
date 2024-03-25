import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ConcertCard from '../card/ConcertCard';
import SeeAllButton from '../button/SeeAllButton';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {BlueButton} from '../button/Button';

/**
 * 선착 예매 콘서트 조회입니다.
 * @param props
 * - [필수]
 * @returns
 * @author 강성권
 */

interface concertProps {
  poster: string;
  title: string;
  address: string;
  date: string;
}

interface concertListProps {
  concerts: concertProps[];
  way: string;
}

export default function FisrtComeList({concerts, way}: concertListProps) {
  const renderItem = ({item, index}: {item: concertProps; index: number}) => (
    <ConcertCard
      onPress={() => console.log('공연 상세로 이동')}
      poster={item.poster}
      title={item.title}
      address={item.address}
      date={item.date}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlueButton
          onPress={() => true}
          width={100}
          textSize={fontPercent(14)}
          btnText={way}
          disabled={true}
        />
        <SeeAllButton />
      </View>
      <View style={{margin: 10}}>
        <FlatList
          data={concerts}
          decelerationRate="fast"
          horizontal
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: widthPercent(10),
    height: heightPercent(450),
    marginBottom: heightPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleContainer: {
    flexDirection: 'row',
    margin: widthPercent(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Jalnan2TTF',
    color: '#FFFFFF',
    margin: 10,
  },
});
