import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ConcertChoiceButton({schedule}) {
  const [selectedDateId, setSelectedDateId] = useState(null);

  const navigation = useNavigation();

  const switchColor = id => {
    console.log('Selected button ID:', id); // 클릭된 버튼의 ID 출력
    if (selectedDateId === id) {
      // 이미 선택된 경우, 선택 해제
      setSelectedDateId(null);
    } else {
      // 선택되지 않은 경우, 선택
      setSelectedDateId(id);
    }
  };

  const [dates, setDates] = useState([]); // 상태로 날짜 목록 저장

  // 컴포넌트가 마운트 되었을 때, 날짜 데이터를 받아와야 함
  useEffect(() => {
    // 주어진 schedule 데이터가 배열 안에 배열 형태로 들어있는 것을 확인하고 바깥쪽 배열을 제거합니다.
    const scheduleData = schedule[0]; // schedule 데이터 수정
    const processedDates = scheduleData.map(date => {
      const startDate = new Date(date.start_datetime);
      const month = startDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
      const day = startDate.getDate().toString().padStart(2, '0'); // 일 정보를 2자리 문자열로 변환
      return {
        id: date.id,
        month: month.toString(), // 월 정보를 문자열로 저장
        day: day.toString(), // 일 정보를 문자열로 저장
      };
    });
    setDates(processedDates);
  }, [schedule]);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
        <Text style={styles.title}>공연 일정 선택</Text>
        <View style={styles.list}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {dates.map(date => (
              <TouchableOpacity
                key={date.id}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selectedDateId === date.id ? '#FCC434' : '#1C1C1C',
                  },
                  {
                    borderColor:
                      selectedDateId === date.id ? '#FCC434' : '#000000',
                  },
                ]}
                onPress={() => switchColor(date.id)}>
                <Text
                  style={[
                    styles.title,
                    {color: selectedDateId === date.id ? '#000000' : '#FFFFFF'},
                  ]}>
                  {date.month}월
                </Text>
                <View
                  style={[
                    styles.day,
                    {
                      backgroundColor:
                        selectedDateId === date.id ? '#1C1C1C' : '#3B3B3B',
                    },
                  ]}>
                  <Text style={styles.title}>{date.day}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.buttonTicketing]}
          onPress={() => {
            if (selectedDateId !== null) {
              // 여기서는 단순화를 위해 첫 번째 선택된 날짜의 ID만을 사용합니다.
              // 실제 사용 사례에 따라 이 로직을 조정할 수 있습니다.
              navigation.navigate('Waiting', {selectedDateId: selectedDateId});
            } else {
              alert('날짜를 선택해주세요.');
            }
            // navigation.navigate('Waiting', {rank: 0});
          }}>
          <Text style={styles.textTicketing}>직접 예매하기</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    marginTop: 10,
    height: 120,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 100,
    borderRadius: 25,
    margin: 5,
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonTicketing: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#FCC434',
    marginBottom: 10,
  },
  textTicketing: {
    fontSize: 18,
    fontFamily: 'Jalnan2TTF',
    color: '#000000',
  },
  background: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
  },
});
