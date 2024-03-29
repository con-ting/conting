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
import {formatDateWithDay} from '../../utils/common/TimeFormat.ts';
import Swipeout from 'react-native-swipeout';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';

export type basicProps = {
  onPress?: () => void;
  disabled?: boolean;
  title: string;
  img_url: string;
  img_tag_disabled?: boolean;
  img_tag?: string;
  img_tag_color?: string;
  sido: string;
  concert_hall: string;
  date_tag: string;
  date: string;
  swipe_btn_text?: string;
  swipe_btn_color?: string;
  swipe_btn_disabled?: boolean;
  swipe_btn_onPress?: () => void;
};

/**
 * BasicConcertCardWide
 * BasicConcertCardWide 컴포넌트입니다.
 * - onPress? : 터치 시 실행할 함수
 * - disabled? : 터치 비활성화시 T
 * - title : 콘서트 이름
 * [이미지 관련]
 * - img_url: 이미지 URL
 * - img_tag_disabled?: 이미지 태그 비활성화시 T
 * - img_tag?: 이미지 태그 텍스트 내용 [환불 대기 중, 결제 대기, 결제 기한 만료 등등]
 * - img_tag_color?: 이미지 태그 텍스트 색상
 * [공연 세부 정보]
 * - sido: 공연장 위치
 * - concert_hall: 공연장 이름
 * - date_tag: 예매종료일, 예매시작일, 관람예정일, 결제마감일 중 택 1
 * - date: 날짜 포멧 YYYY.MM.DD
 *  [스와이프 시 버튼 관련]
 * - swipe_btn_disabled?: 비활성화 시 T
 * - swipe_btn_text?: 버튼에 들어갈 텍스트
 * - swipe_btn_color?: 버튼의 백그라운드 색상
 * - swipe_btn_onPress?: 버튼을 눌렀을때 실행될 함수
 * @param props
 * @return
 * @author 김형민
 */
export const BasicConcertCardWide = (props: basicProps) => {
  const swipeoutBtns = [
    {
      component: (
        <TouchableOpacity
          onPress={props.swipe_btn_onPress}
          style={{
            backgroundColor: props.swipe_btn_color,
            height: heightPercent(160),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.MAINYELLOW,
              fontSize: fontPercent(14),
              fontFamily: Font.MAINFONT,
            }}>
            {props.swipe_btn_text}
          </Text>
        </TouchableOpacity>
      ),
    },
  ];

  const imgTagProps = {
    tag: props.img_tag_disabled ? null : (
      <Text
        style={{
          position: 'absolute',
          color: props.img_tag_color,
          fontSize: fontPercent(18),
          fontFamily: Font.MAINFONT,
        }}>
        {props.img_tag}
      </Text>
    ),
  };

  return (
    <Swipeout
      autoClose={true}
      disabled={props.swipe_btn_disabled}
      right={swipeoutBtns}
      style={{
        width: '100%',
        backgroundColor: Color.CARDBASE,
        borderRadius: 16,
      }}>
      <View>
        <TouchableOpacity
          onPress={props.onPress}
          disabled={props.disabled}
          style={styles.container}>
          <View
            style={{
              flex: 1,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              source={{
                uri: props.img_url,
              }}
            />
            {/* {!props.img_tag_disabled && (
              <BlurView
                style={StyleSheet.absoluteFill} // BlurView를 FastImage 커버하도록 함
                blurType="dark" //안드로이드는 light , dark만 제공 ...
                blurAmount={2} // blur 효과 강도 설정
              />
            )} */}
            {props.img_tag && (
              <Text
                style={{
                  position: 'absolute',
                  color: props.img_tag_color,
                  fontSize: fontPercent(18),
                  fontFamily: Font.MAINFONT,
                }}>
                {props.img_tag}
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 2,
              padding: widthPercent(20),
              justifyContent: 'space-evenly',
            }}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {props.title}
            </Text>
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
        </TouchableOpacity>
      </View>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.CARDBASE,
    borderRadius: 16,
    width: '100%',
    height: heightPercent(160),
  },
  title: {
    color: Color.MAINYELLOW,
    fontSize: fontPercent(20),
    fontFamily: Font.MAINFONT,
  },
  box: {
    position: 'absolute',
  },
});
