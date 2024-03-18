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

export default function ConcertChoiceButton() {
  const [isDate, setIsDate] = useState([]);
  const navigation = useNavigation();

  const switchColor = (id: any) => {
    if (isDate.includes(id)) {
      // 이미 선택된 경우, 제거
      setIsDate(isDate.filter(item => item !== id));
    } else {
      // 선택되지 않은 경우, 추가
      setIsDate([...isDate, id]);
    }
  };
  // 서버에서 받아온 데이터를 가정 나중에 screen에서 props로 받아올 예정임 (3월 1일부터 7일까지)
  const [dates, setDates] = useState([]); // 상태로 날짜 목록 저장

  // 컴포넌트가 마운트 되었을 때, 날짜 데이터를 받아와야 함
  // 여기서 API 호출을 사용
  useEffect(() => {
    const serverDates = [
      {id: '1', title: '3월', subtitle: '01'},
      {id: '2', title: '3월', subtitle: '02'},
      {id: '3', title: '3월', subtitle: '03'},
      {id: '4', title: '3월', subtitle: '04'},
      {id: '5', title: '3월', subtitle: '05'},
      {id: '6', title: '3월', subtitle: '06'},
      {id: '7', title: '3월', subtitle: '07'},
    ];
    setDates(serverDates);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>공연 일정 선택</Text>
      <View style={styles.list}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dates.map(date => (
            <TouchableOpacity
              key={date.id}
              style={[
                styles.button,
                {
                  backgroundColor: isDate.includes(date.id)
                    ? '#FCC434'
                    : '#1C1C1C',
                },
                {borderColor: isDate.includes(date.id) ? '#FCC434' : '#000000'},
              ]}
              onPress={() => switchColor(date.id)}>
              <Text
                style={[
                  styles.title,
                  {color: isDate.includes(date.id) ? '#000000' : '#FFFFFF'},
                ]}>
                {date.title}
              </Text>
              <View
                style={[
                  styles.day,
                  {
                    backgroundColor: isDate.includes(date.id)
                      ? '#1C1C1C'
                      : '#3B3B3B',
                  },
                ]}>
                <Text style={styles.title}>{date.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.buttonTicketing]}
        onPress={() => navigation.navigate('Waiting', {rank: 0})}>
        <Text style={styles.textTicketing}>직접 예매하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  textTicketing: {
    fontSize: 18,
    fontFamily: 'Jalnan2TTF',
    color: '#000000',
  },
});
