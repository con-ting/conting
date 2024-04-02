import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {F_SIZE_B_BUTTON, F_SIZE_TITLE} from '../../../config/Font';
import {Calendar, Ticket2} from 'iconsax-react-native';
import {heightPercent, widthPercent} from '../../../config/Dimensions';
import {
  BUTTONSELECT,
  MAINBLACK,
  MAINWHITE,
  MAINYELLOW,
} from '../../../config/Color'; // MAINYELLOW 추가
import CalendarSelect from '../../../components/calendar/CalendarSelect';
import TimeInput from '../../../components/input/TimeInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {YellowButton} from '../../../components/button/Button';
import {useNavigation} from '@react-navigation/native';

export default function ConcertRegistScreen() {
  const [reservationType, setReservationType] = useState('');
  const [schedule, setSchedule] = useState([]);
  const navigation = useNavigation();

  // 예매 방식 선택
  const handlePress = type => {
    setReservationType(type);
  };

  // 날짜와 시간 선택
  const handleSchedule = dates => {
    setSchedule(dates);
  };

  // 다음 페이지로 이동하며 데이터를 전달
  const handleNext = () => {
    const registrationData = {
      reservationType: reservationType,
      schedule: schedule,
    };
    console.log('registration1 :', registrationData);
    navigation.navigate('ConcertRegistInfo', {registrationData});
  };

  return (
    <KeyboardAwareScrollView
      style={styles.view}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.context}>
          <View style={styles.title}>
            <Ticket2 style={styles.icon} />
            <Text style={F_SIZE_TITLE}>예매 방식</Text>
          </View>
          <View style={styles.infos}>
            <TouchableOpacity
              onPress={() => handlePress('F')}
              style={[
                styles.button,
                reservationType === 'F' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  reservationType === 'F' && styles.selectedText,
                ]}>
                선착순
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('R')}
              style={[
                styles.button,
                reservationType === 'R' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  reservationType === 'R' && styles.selectedText,
                ]}>
                추첨
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.title}>
            <Calendar style={styles.icon} />
            <Text style={F_SIZE_TITLE}>공연 일정</Text>
          </View>
          <View style={styles.calendarContainer}>
            {/* 공연 일정을 선택하는 컴포넌트 */}
            <CalendarSelect onDateSelected={setSchedule} />
            <TimeInput dates={schedule} onTimeSelected={handleSchedule} />
          </View>
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={handleNext}
            width={'30%'}
            btnText="다음"
            textSize={20}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  contentContainer: {
    flexGrow: 1, // 스크롤 뷰의 컨텐츠가 충분한 공간을 차지하도록 설정
    justifyContent: 'space-between', // 컨텐츠와 하단 버튼 사이에 공간을 만듦
  },

  container: {
    flex: 1,
    // backgroundColor: 'white',
    margin: 20,
  },
  context: {
    flex: 1,
  },
  title: {
    gap: 16,
    flexDirection: 'row',
    marginTop: 20,
  },

  infos: {
    height: heightPercent(50),
    marginLeft: 10,
    marginTop: 14,
    flexDirection: 'row',
  },
  calendarContainer: {
    marginLeft: 10,
    marginTop: 14,
  },

  icon: {
    width: widthPercent(32),
    height: heightPercent(32),
    color: MAINWHITE,
  },
  button: {
    width: widthPercent(150),
    paddingVertical: 10,
    marginLeft: 10, // 버튼 사이의 간격
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: MAINWHITE,
  },

  selectedButton: {
    // width: 160,
    borderWidth: 2,
    borderColor: MAINYELLOW,
    backgroundColor: BUTTONSELECT,
  },
  selectedText: {
    color: MAINWHITE,
  },
  space: {
    marginTop: 40,
  },
  nextButton: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
