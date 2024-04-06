import {StyleSheet, Text, View} from 'react-native';
import EventCard, {cardProps} from '../../../../components/card/EventCard';
import React from 'react';
import {MAINBLACK} from '../../../../config/Color.ts';

export default function CastEventScreen(props: {events: Array<cardProps>}) {
  return (
    <View style={styles.container}>
      {props.events.map(
        event =>
          event && (
            <View style={styles.card}>
              <EventCard
                onPress={event.onPress}
                name={event.name}
                img_url={event.img_url}
                img_tag_disabled={event.img_tag_disabled}
                img_tag={event.img_tag}
                img_tag_color={event.img_tag_color}
                start_at={event.start_at}
                end_at={event.end_at}
                participants={event.participants}
                winnersTotal={event.winnersTotal}
                swipe_btn_abled={event.swipe_btn_abled}
                swipe_btn_text={event.swipe_btn_text}
                swipe_btn_color={event.swipe_btn_color}
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
