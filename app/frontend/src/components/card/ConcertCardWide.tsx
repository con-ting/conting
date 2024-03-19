import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import React from 'react';
import {IconTextBox} from './IconTextBox.tsx';
import * as ICON from 'iconsax-react-native';
import {formatDateWithDay} from '../../config/TimeFormat.ts';

export type basicProps = {
  title: string;
  img_url: string;
  img_tag: string;
  sido: string;
  concert_hall: string;
  date_tag: string;
  date: string;
};

export const BasicConcertCardWide = (props: basicProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          blurRadius={10}
          source={{
            uri: props.img_url,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            color: Color.BLUEBASE,
            fontSize: fontPercent(20),
            fontFamily: Font.MAINFONT,
          }}>
          {props.img_tag}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          padding: widthPercent(20),
          justifyContent: 'space-evenly',
        }}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{props.title}</Text>
        <View style={{marginTop: heightPercent(4)}}>
          <IconTextBox
            iconTag={
              <ICON.Location
                color={Color.TEXTGRAY}
                size={16}
                style={{marginRight: widthPercent(6)}}
              />
            }
            text={props.sido}
          />
          <IconTextBox
            iconTag={
              <ICON.Courthouse
                color={Color.TEXTGRAY}
                size={16}
                style={{marginRight: widthPercent(6)}}
              />
            }
            text={props.concert_hall}
          />
          <IconTextBox
            iconTag={
              <ICON.Calendar
                color={Color.TEXTGRAY}
                size={16}
                style={{marginRight: widthPercent(6)}}
              />
            }
            text={props.date_tag + '•' + formatDateWithDay(props.date)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 16,
    height: heightPercent(160),
  },
  title: {
    color: Color.MAINYELLOW,
    fontSize: fontPercent(20),
    fontFamily: Font.MAINFONT,
  },
});
