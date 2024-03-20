import {View, Text, StyleSheet} from 'react-native';
import ConcertHallCard from '../../components/card/ConcertHallCard';
import FisrtComeList from '../../components/list/FirstComeList';
import {ScrollView} from 'react-native';
import PopularConcertList from './../../components/list/PopularConcertList';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';


export default function MainScreen() {
  const [backgroundColors, setBackgroundColors] = useState(['#000000', '#000000', '#000000'])
  const concertList = [
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNzEwMTFfMjY3%2FMDAxNTA3NzIzNjU0MjM1.kTHfzzQ5oZEEl0cUUpEwsklfZq_HhzfOckVtOspfVwEg._0FoK4KQ6_eqwt7vRGVLNcZ90leatv1A_QiPL7mD-Cgg.JPEG.yun1202%2FexternalFile.jpg&type=a340',
    },
    {
      poster:
        'https://search.pstatic.net/sunny/?src=http%3A%2F%2Ffile3.instiz.net%2Fdata%2Ffile3%2F2018%2F09%2F27%2Fb%2Ff%2F0%2Fbf08fa9f2403e7d43aa3863d58ee8b0a.jpg&type=a340',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTEwMjFfMjYx%2FMDAxNTcxNjQzOTQxMzY4.YolACTYNYE8yCQUDEVF9tKd-B1OOI0NPcbNjhtfsLVMg.5VdwQO9LhJPrOx-53s8BfXAdLQBshTgizcNmgDMmcysg.JPEG%2F20191021_164330.jpg&type=a340',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTEwMDNfMjUy%2FMDAxNTcwMTAzODQ4NDk4.TTqxmb1BcDJ_yHnqUb-hK1waq6d4WqHxHK_pEncGXwEg.KFGgOBwX9bs4S5QM_jzd9aV6276LPYlO81SpFpaN6lsg.JPEG%2FD8932865-F929-4F1F-BA37-71DFA3EC5825.jpeg&type=a340',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODExMTlfOTgg%2FMDAxNTQyNjE0ODMwMzY0.yvRdj5mecR1HfyCf-ND24sGy4Nvwoao4BKu9kV97y60g.r2LZzxYHnBWEtgkMGWSNPq8SbM0Cmf8uRviYXpPqCZUg.JPEG.dmsejrl1%2F6.jpg&type=a340',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODExMTlfOTgg%2FMDAxNTQyNjE0ODMwMzY0.yvRdj5mecR1HfyCf-ND24sGy4Nvwoao4BKu9kV97y60g.r2LZzxYHnBWEtgkMGWSNPq8SbM0Cmf8uRviYXpPqCZUg.JPEG.dmsejrl1%2F6.jpg&type=a340',
    },
  ];
  
  const getBackgroundColors = (colors:any) =>{
    setBackgroundColors(colors)
  }
  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <PopularConcertList popularConcert={concertList} getBackgroundColors={getBackgroundColors}/>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
