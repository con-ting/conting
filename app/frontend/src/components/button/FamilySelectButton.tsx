import * as React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function FamilySelectButton() {
  const [isFamily, setIsFamily] = useState([]);

  const switchColor = (id: any) => {
    if (isFamily.includes(id)) {
      // 이미 선택된 경우, 제거
      setIsFamily(isFamily.filter(item => item !== id));
    } else {
      // 선택되지 않은 경우, 추가
      setIsFamily([...isFamily, id]);
    }
  };
  // 버튼에 들어갈 데이터
  const buttons = [
    {
      id: 'mom',
      title: '엄마',
      subtitle: '(김엄마)',
      img: require('../../assets/images/iuprofile.png'),
    },
    {
      id: 'dad',
      title: '아빠',
      subtitle: '(김아빠)',
      img: require('../../assets/images/jangkiha.png'),
    },
    {
      id: 'sister',
      title: '자매',
      subtitle: '(김누나)',
      img: require('../../assets/images/sister.png'),
    },
    {
      id: 'brother',
      title: '형제',
      subtitle: '(김형제)',
      img: require('../../assets/images/bro.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {buttons.map(button => (
        <TouchableOpacity
          key={button.id}
          style={[
            styles.button,
            {
              backgroundColor: isFamily.includes(button.id)
                ? '#FCC434'
                : '#1C1C1C',
            },
            {borderColor: isFamily.includes(button.id) ? '#FCC434' : '#000000'},
          ]}
          onPress={() => switchColor(button.id)}>
          <Image source={button.img} style={styles.image} />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.title,
                {color: isFamily.includes(button.id) ? '#000000' : '#FFFFFF'},
              ]}>
              {button.title}
            </Text>
            <Text
              style={[
                styles.title,
                {color: isFamily.includes(button.id) ? '#000000' : '#FFFFFF'},
              ]}>
              {button.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.buttonAsk,
          {backgroundColor: '#000000'},
          {borderColor: '#FCC434'},
        ]}
        onPress={() => {
          //   switchColor('ask');
        }}>
        <Text style={[styles.title, {color: '#FCC434'}]}>예매 부탁하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 55,
    borderRadius: 10,
    margin: 5,
    borderWidth: 2,
  },
  buttonAsk: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
});
