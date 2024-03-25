import { useState } from "react"
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { F_SIZE_BIGTEXT } from "../../config/Font";
import { MAINBLACK, MAINWHITE, MAINYELLOW } from "../../config/Color";

export default function TimeInput({dates}: any){
    const [times, setTimes] = useState({});

    const handleTimeChange = (date: string, type: string, value: string) => {
        // 숫자만 남기고 모든 비숫자 문자 제거
        const numericValue = value.replace(/[^0-9]/g, '');

        // 숫자를 시간 형식으로 변환 (HH:mm)
        let formattedValue = numericValue;
        if (numericValue.length > 2) {
            formattedValue = numericValue.substring(0, 2) + ':' + numericValue.substring(2, 4);
        }

        // 최대 4자리 숫자까지만 입력 가능하도록 제한 (HH:mm 형식)
        if (numericValue.length <= 4) {
            const newTimes = {...times, [date]: {...times[date], [type]: formattedValue}};
            setTimes(newTimes);
        }
    };

    return(
        <View>
            {Object.keys(dates).map((date) => (
                <View key={date} style={styles.timeInputContainer}>
                    <Text style={F_SIZE_BIGTEXT}>{date}</Text>
                    <TextInput
                        style={styles.timeInput}
                        placeholder="시작 시간"
                        onChangeText={(value) => handleTimeChange(date, 'start', value)}
                        value={times[date]?.start || ''}
                        keyboardType="numeric" // 숫자 키보드 사용
                        maxLength={5} // HH:mm 형식에 맞춰 최대 길이 설정
                    />
                    <TextInput
                        style={styles.timeInput}
                        placeholder="종료 시간"
                        onChangeText={(value) => handleTimeChange(date, 'end', value)}
                        value={times[date]?.end || ''}
                        keyboardType="numeric" // 숫자 키보드 사용
                        maxLength={5} // HH:mm 형식에 맞춰 최대 길이 설정
                    />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    timeInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 8,
    },
    dateText: {
      color: 'white',
    },
    timeInput: {
      marginTop: 10,
      borderWidth: 2,
      borderColor: MAINYELLOW,
      backgroundColor: MAINWHITE,
      color: MAINBLACK,
      width: 100,
      padding: 8,
      borderRadius: 5,
    },
  });