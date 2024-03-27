import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  F_SIZE_BBIGTEXT,
  F_SIZE_BIGTEXT,
  F_SIZE_BTITLE,
  F_SIZE_B_HEADER,
  F_SIZE_SUBTITLE,
  F_SIZE_Y_BTITLE,
} from '../../../../config/Font';
import {MAINBLACK, MAINGRAY, TEXTGRAY} from '../../../../config/Color';
import FastImage from 'react-native-fast-image';
import {heightPercent, widthPercent} from '../../../../config/Dimensions';
import {Clock} from 'iconsax-react-native';
import {useEffect, useState} from 'react';
import {CheckBox} from '../../../../components/checkbox/CheckBox';
import {YellowButton} from '../../../../components/button/Button';
import SuccessModal from '../../../../components/modal/SuccessModal';
import {useNavigation} from '@react-navigation/native';

const eventData = {
  title: 'IU ‘December, 2023’ Official Goods',
  start_at: '2024.04.03',
  end_at: '2024.04.10',
};

// 예제 티켓 데이터
const initialTickets = [
  {
    id: 1,
    userName: '김싸피',
    email: 'ssafy@ssafy.com',
    seatNumber: 'VIP-8',
    selected: false,
    submitted: false,
  },
  {
    id: 2,
    userName: '김싸피',
    email: 'ssafy@ssafy.com',
    seatNumber: 'VIP-9',
    selected: false,
    submitted: false,
  },
];

export default function EventDetailScreen() {
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Tickets 상태가 업데이트 되었습니다:', tickets);
  }, [tickets]); // tickets 상태가 변경될 때마다 로그를 출력합니다.

  // 입장권 선택시 호출할 함수
  const handleSelectTicket = id => {
    setTickets(
      tickets.map(ticket =>
        ticket.id === id ? {...ticket, selected: !ticket.selected} : ticket,
      ),
    );
  };
  // 입장권 선택 후 응모하기 할때 호출할 함수
  const handleSubmit = () => {
    setTickets(
      tickets.map(ticket =>
        ticket.selected
          ? {...ticket, submitted: true, selected: false}
          : ticket,
      ),
    );
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <SuccessModal
        isVisible={isModalVisible}
        setIsVisible={setModalVisible}
        children={
          <View style={styles.modal}>
            <View style={styles.modalAlert}>
              <FastImage
                style={{width: widthPercent(140), height: heightPercent(140)}}
                source={require('../../../../assets/gif/sc.gif')}
              />
              <Text style={F_SIZE_B_HEADER}>성공적으로 응모되었습니다</Text>
            </View>
            <YellowButton
              onPress={() => navigation.navigate('Main')}
              btnText="확인"
              textSize={20}
              width={250}
            />
          </View>
        }
      />
      <View style={styles.context}>
        <View style={styles.imgContainer}>
          <FastImage
            source={require('../../../../assets/images/goods.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.title}>
          <Text style={F_SIZE_BTITLE}>{eventData.title}</Text>
        </View>
        <View style={styles.space} />
        <View>
          <View style={styles.row}>
            <Clock size={16} color={TEXTGRAY} />
            <Text style={F_SIZE_BBIGTEXT}>{eventData.start_at}</Text>
          </View>
          <View style={styles.row}>
            <Clock size={16} color={TEXTGRAY} />
            <Text style={F_SIZE_BBIGTEXT}>{eventData.end_at}</Text>
          </View>
        </View>
        <View style={styles.space} />
        <View>
          <Text style={F_SIZE_SUBTITLE}>
            - WORLD TOUR CONCERT 에서 함께 진행하는 굿즈 아이템 입니다.
          </Text>
          <Text style={F_SIZE_SUBTITLE}>
            - 이벤트에 당첨되어 나만의 응모권에 소중히 간직해보세요!
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={F_SIZE_Y_BTITLE}>응모 가능한 티켓</Text>
        </View>
        <View style={styles.line} />
        <View>
          <View style={styles.subTitle}>
            <Text style={F_SIZE_SUBTITLE}>입장 권한</Text>
            <Text style={F_SIZE_SUBTITLE}>좌석 번호</Text>
            <Text style={F_SIZE_SUBTITLE}>선택</Text>
          </View>
          {tickets.map((ticket, index) => (
            <View key={ticket.id} style={styles.ticketRow}>
              <View style={styles.name}>
                <Text style={F_SIZE_BIGTEXT}>{ticket.userName}</Text>
                <Text style={F_SIZE_BIGTEXT}>({ticket.email})</Text>
              </View>
              <View style={styles.number}>
                <Text style={F_SIZE_BBIGTEXT}>{ticket.seatNumber}</Text>
              </View>
              <CheckBox
                isChecked={ticket.selected}
                setIsChecked={() => handleSelectTicket(ticket.id)}
              />
            </View>
          ))}
          <View style={styles.space} />
          <YellowButton
            onPress={handleSubmit}
            btnText="응모하기"
            textSize={20}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  context: {
    margin: 20,
  },
  imgContainer: {
    alignItems: 'center',
  },

  img: {
    width: widthPercent(272),
    height: heightPercent(289),
    borderRadius: 12,
  },
  title: {
    marginTop: 20,
  },
  subTitle: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    gap: widthPercent(6),
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  number: {
    // alignItems: 'center',
    // backgroundColor: 'white',
    width: widthPercent(105),
  },
  check: {},
  line: {
    marginTop: 10,
    borderColor: MAINGRAY,
    borderWidth: 1,
  },
  modal: {
    height: heightPercent(303),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalAlert: {
    alignItems: 'center',
    gap: 20,
  },
});
