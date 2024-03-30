import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {MAINBLACK, MINTBASE} from '../../config/Color.ts';
import {consertCardData} from './ResultMainScreen.tsx';
import {BasicConcertCardWide} from '../../components/card/ConcertCardWide.tsx';
import {
  korDateFormat,
  korDateFormatString,
} from '../../utils/common/TimeFormat.ts';
import formatSido from '../../utils/common/SidoFormat.ts';

export type consertCardData = {
  ticket_id: number;
  order_id: number;
  schedule_id: string;
  performance_id: number; //local DB
  img: string; //local DB
  title: string; // local DB
  hall_location: string; //local DB
  hall_name: string; //local DB
  time: string;
  running_time: string;
  img_tag_type: string; // '예매완료, 환불대기, 결제대기, 기한경과', 예매 실패
  img_tag_color: string;
  date_tag: string;
  date_tag_color: string;
  swipe_btn_disabled?: boolean;
  btn_onPress?: () => void;
  swipe_btn_onPress?: () => void;
  swipe_btn_text?: string; // 스와이프 버튼에 들어갈 텍스트
  swipe_btn_color?: string; //스와이프 버튼의 백그라운드 색상
};
export default function ReservationWaitingScreen({concerts}) {
  return (
    <View style={styles.container}>
      {concerts.map(props => (
        <View style={styles.card}>
          <BasicConcertCardWide
            onPress={props.btn_onPress}
            title={props.title}
            img_url={props.img}
            img_tag={props.img_tag_type}
            img_tag_disabled={false}
            img_tag_color={props.img_tag_color}
            sido={formatSido(props.hall_location)}
            concert_hall={props.hall_name}
            date_tag={props.date_tag}
            date={korDateFormatString(props.time)}
            swipe_btn_disabled={props.swipe_btn_disabled}
            swipe_btn_text={props.swipe_btn_text}
            swipe_btn_color={props.swipe_btn_color}
            swipe_btn_onPress={props.swipe_btn_onPress}
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
