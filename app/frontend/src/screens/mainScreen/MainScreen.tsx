import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EventCard from '../../components/SingerDetail/EventCard';
import SingerProfile from '../../components/SingerDetail/SingerProfile';
import AlbumCard from '../../components/SingerDetail/AlbumCard';

export class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>메인 페이지</Text>
        <AlbumCard
          name="The Winning"
          album="https://search.pstatic.net/common?type=f&size=150x150&expire=1&refresh=true&quality=100&direct=true&src=https%3A%2F%2Fmusicmeta-phinf.pstatic.net%2Falbum%2F030%2F796%2F30796788.jpg%3Ftype%3Dr204Fll%26v%3D20240223101020"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
