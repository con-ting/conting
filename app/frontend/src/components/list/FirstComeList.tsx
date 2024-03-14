import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ConcertCard from '../card/ConcertCard';

export default function FisrtComeList() {
  return (
    <View>
      <Text style={styles.title}>선착 예매</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.cards}>
          <ConcertCard
            poster="https://ticketimage.interpark.com/Play/image/large/22/22008289_p.gif"
            title="임영웅 콘서트 IM HERO TOUR 2023"
            address="서울•킨텍스 1전시장"
            date="2024.04.22(월) 13:00"
          />
        </View>
        <View style={styles.cards}>
          <ConcertCard
            poster="https://ticketimage.interpark.com/Play/image/large/22/22008289_p.gif"
            title="임영웅 콘서트 IM HERO TOUR 2023"
            address="서울•킨텍스 1전시장"
            date="2024.04.22(월) 13:00"
          />
        </View>
        <View style={styles.cards}>
          <ConcertCard
            poster="https://ticketimage.interpark.com/Play/image/large/22/22008289_p.gif"
            title="임영웅 콘서트 IM HERO TOUR 2023"
            address="서울•킨텍스 1전시장"
            date="2024.04.22(월) 13:00"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginLeft: 5},
  title: {
    fontSize: 24,
    fontFamily: 'Jalnan2TTF',
    color: '#FFFFFF',
  },
  cards: {
    margin: 5,
  },
});
