import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {MAINYELLOW, TEXTGRAY} from '../../config/Color';
import {ClipboardTick, Clock, Like} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import * as Color from '../../config/Color.ts';
import * as Font from '../../config/Font.ts';
import Swipeout from 'react-native-swipeout';
export type cardProps = {
  onPress?: () => void;
  disabled?: boolean;
  name: string;
  img_url: string;
  img_tag_disabled?: boolean;
  img_tag?: string;
  img_tag_color?: string;
  start_at: string;
  end_at: string;
  participants: number;
  winnersTotal: number;
  swipe_btn_abled?: boolean;
  swipe_btn_text?: string;
  swipe_btn_color?: string;
  swipe_btn_onPress?: () => void;
};

/**
 * Event 카드입니다.
 * @param props
 * - onPress?: 이벤트 카드를 누르면 실행할 함수
 * - disabled?: 클릭 이벤트 사용 여부
 * - name: 이벤트의 제목입니다.
 * - img_url: 이벤트의 이미지 주소입니다.
 * - img_tag_disabled?: 이미지 태그 사용 여부
 * - img_tag?: 이미지 태그 내용
 * - img_tag_color?: 이미지 태그 색상
 * - start_at: 이벤트의 시작 날짜입니다.
 * - end_at: 이벤트의 종료 날짜입니다.
 * - participants: 이벤트 응모 지원자 현황
 * - winnersTotal: 당첨 개수
 * - swipe_btn_abled?: 스위프트 버튼 사용 여부
 * - swipe_btn_text?: 스위프트 버튼 텍스트
 * - swipe_btn_color?: 스위프트 버튼 색상
 * - swipe_btn_onPress?: 스위프트 버튼 클릭 이벤트 함수
 * @returns
 * @author 강성권, 김형민
 */

export default function EventCard(props: cardProps) {
  const navigation = useNavigation();
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const start = moment(props.start_at);
      const end = moment(props.end_at);

      if (now.isBefore(start)) {
        const duration = moment.duration(start.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTimer(`시작까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      } else if (now.isAfter(end)) {
        setTimer('마감됨');
      } else {
        const duration = moment.duration(end.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTimer(`마감까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.start_at, props.end_at]);
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
              color: Color.MAINBLACK,
              fontSize: fontPercent(14),
              fontFamily: Font.MAINFONT,
            }}>
            {props.swipe_btn_text}
          </Text>
        </TouchableOpacity>
      ),
    },
  ];
  return (
    <Swipeout
      autoClose={true}
      disabled={!props.swipe_btn_abled}
      right={swipeoutBtns}
      style={{
        width: '100%',
        backgroundColor: Color.CARDBASE,
        borderRadius: 16,
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            source={{
              uri: props.img_url,
            }}>
            {!props.img_tag_disabled && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: 'rgba(0 , 0 , 0 , 0.7)',
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            )}
          </ImageBackground>
          {!props.img_tag_disabled && (
            <Text
              style={{
                position: 'absolute',
                zIndex: 10,
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
            {props.name}
          </Text>
          <View>
            <View style={styles.row}>
              <ClipboardTick size={16} color={TEXTGRAY} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                응모현황 🔥 : {props.participants} 명
              </Text>
            </View>
            <View style={styles.row}>
              <Like size={16} color={TEXTGRAY} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                상품 개수 : {props.winnersTotal} 개
              </Text>
            </View>
            <View style={styles.row}>
              <Clock size={16} color={TEXTGRAY} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.time}>
                {timer}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.CARDBASE,
    borderRadius: 16,
    width: '100%',
    height: heightPercent(160),
  },
  box: {
    position: 'absolute',
  },
  title: {
    color: MAINYELLOW,
    fontSize: fontPercent(20),
    fontFamily: 'Jalnan2TTF',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(14),
    fontFamily: 'Jalnan2TTF',
  },
  time: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(14),
    fontFamily: 'Jalnan2TTF',
  },
  row: {
    flexDirection: 'row',
    marginTop: heightPercent(4),
    gap: widthPercent(6),
  },
});
