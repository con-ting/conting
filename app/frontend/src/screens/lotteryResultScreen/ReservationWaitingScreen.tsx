import React from 'react';
import {View, StyleSheet} from 'react-native';

import {MAINBLACK} from '../../config/Color.ts';

import {BasicConcertCardWide} from '../../components/card/ConcertCardWide.tsx';
import {korDateFormatString} from '../../utils/common/TimeFormat.ts';
import formatSido from '../../utils/common/SidoFormat.ts';
import {assert} from 'realm/dist/assert';

export default function ReservationWaitingScreen({concerts}) {
  console.log(concerts);
  return (
    <View style={styles.container}>
      {concerts.map(
        props =>
          props && (
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
          ),
      )}
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
