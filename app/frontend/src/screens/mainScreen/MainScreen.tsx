import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EventCard from '../../components/card/EventCard';
import SingerProfile from '../../components/card/SingerProfile';
import ConcertHallCard from '../../components/card/ConcertHallCard';
import ConcertCard from '../../components/card/ConcertCard';
import FisrtComeList from '../../components/list/FirstComeList';
import {ScrollView} from 'react-native';
import PopularConcertList from './../../components/list/PopularConcertList';

export class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <PopularConcertList />
          {/* <Text style={styles.text}>메인 페이지</Text> */}
          <FisrtComeList />
          {/* <ConcertCard
            poster="https://ticketimage.interpark.com/Play/image/large/22/22008289_p.gif"
            title="임영웅 콘서트 IM HERO TOUR 2023"
            address="서울•킨텍스 1전시장"
            date="2024.04.22(월) 13:00"
          /> */}

          <ConcertHallCard
            title="KSPO DOME"
            seat={14730}
            address="서울특별시 송파구 올림픽로 424"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
