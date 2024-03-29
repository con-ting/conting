import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {MAINBLACK, MINTBASE} from '../../config/Color.ts';
import {consertCardData} from "./ResultMainScreen.tsx";



export default function ReservationWaitingScreen({props: Array<consertCardData>}) {
  return (
    <View style={styles.container}>
      {concerts.map(concert => (
        <View style={styles.card}>
          <BasicConcertCardWide
            onPress={() => console.log('히히')}
            disabled={concert.status !== 'on_sale'}
            title={concert.title}
            img_url={concert.poster}
            img_tag={
              concert.reservation_type === 'F' ? '선착순 예매중' : '추첨 예매중'
            }
            img_tag_disabled={false}
            img_tag_color={concert.status === 'on_sale' ? MINTBASE : ''}
            sido={formatSido(concert.hall_address)}
            concert_hall={concert.hall_name}
            date_tag={'예매일'}
            date={korDateFormat(concert.reservation_start_date_time)}
            swipe_btn_disabled={concert.status !== 'on_sale'}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
});
