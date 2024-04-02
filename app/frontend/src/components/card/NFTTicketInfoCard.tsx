import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {DollarSquare, ClipboardTick} from 'iconsax-react-native';

type NFTTicketCardProps = {
  onPress: () => void;
  poster: string;
  title: string;
  money: string;
  status: boolean;
  showInKRW: boolean;
};

/**
 * NFTTicketCard입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - poster: 해당 굿즈의 이미지 또는 영상
 * - title: 굿즈 이벤트를 진행하는 콘서트 제목
 * - money: 굿즈의 가격
 * - status: 응모권 보유 상태
 * - showInKRW: 원화 표시 여부 상태
 * @returns
 * @author 전상혁
 */
export default function NFTTicketInfoCard(props: NFTTicketCardProps) {
  // 응모권 보유 상태에 따라 표시할 텍스트 결정
  const statusText = props.status ? '응모권 보유' : '응모권 소진';

  // 1 SOL = 100,000원으로 가정
  const convertToKRW = sol => {
    return (parseFloat(sol.replace(/,/g, '')) * 25000).toLocaleString() + '원';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/images/iuconcert.png')}
          style={styles.img}
        />
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.title}
        </Text>
        <View style={styles.statusContainer}>
          <DollarSquare color="#FFFFFF" size={20} />
          {/* sol 또는 원으로 보여줌 */}

          <Text style={styles.money}>
            {props.showInKRW ? convertToKRW(props.money) : `${props.money} sol`}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <ClipboardTick color="#FFFFFF" size={20} />
          {/* 응모권 보유 상태 체크 필수 */}
          <Text
            style={[
              styles.status,
              {color: props.status ? '#0BB7FF' : '#FF0000'},
            ]}>
            {statusText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(170),
    height: heightPercent(350),
    backgroundColor: '#1C1C1C',
    borderRadius: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },

  img: {
    width: widthPercent(170),
    height: heightPercent(240),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  title: {
    fontSize: fontPercent(16),
    margin: 5,
    fontFamily: 'Jalnan2TTF',
    color: '#FFFFFF',
  },
  money: {
    margin: 5,
    fontFamily: 'Jalnan2TTF',
    color: '#FCC434',
  },
  status: {
    margin: 5,
    fontFamily: 'Jalnan2TTF',
  },
});
