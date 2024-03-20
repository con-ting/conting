import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_HEADER, F_SIZE_TEXT, F_SIZE_Y_BIGTEXT} from '../../config/Font';
import {useEffect, useState} from 'react';

export default function PopularConcertList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);
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

  const renderItem = ({
    item,
    index,
  }: {
    item: {poster: string};
    index: number;
  }) => {
    return (
      <View
        style={{
          marginVertical: heightPercent(30),
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: widthPercent(16),
            alignItems: 'center',
            overflow: 'hidden',
            width: widthPercent(250),
            height: heightPercent(400),
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={{uri: item.poster}}
          />
        </View>
        <Text style={F_SIZE_Y_BIGTEXT}>선착순 예매</Text>
        <Text style={F_SIZE_HEADER}>콘서트명</Text>
        <Text style={F_SIZE_TEXT}>서울 잠실 실내</Text>
      </View>
    );
  };
  return (
    <Carousel
      data={concertList}
      renderItem={renderItem}
      sliderWidth={Dimensions.get('screen').width}
      sliderHeight={heightPercent(500)}
      itemWidth={widthPercent(250)}
      itemHeight={heightPercent(440)}
      inactiveSlideScale={0.7}
      firstItem={0}
      onSnapToItem={index => setCurrentIndex(index)}
    />
  );
}
