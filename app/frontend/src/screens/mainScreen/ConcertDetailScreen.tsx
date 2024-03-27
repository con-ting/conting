import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRecoilValue} from 'recoil';
import {posterColor} from '../../utils/recoil/Atoms';
import {ArrowLeft, Back} from 'iconsax-react-native';
import {F_SIZE_HEADER} from '../../config/Font';
import {useNavigation} from '@react-navigation/native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import SummaryCard from '../../components/concertDetail/SummaryCard';
import ConcertHallCard from '../../components/card/ConcertHallCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import {useState} from 'react';

export default function ConcertDetailScreen({route}) {
  // 배경색을 recoil에서 받아오기
  const [isRender, setIsRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const backgroundColor = useRecoilValue(posterColor);
  const navigation = useNavigation();
  const concertInfo =
    'https://ticketimage.interpark.com/Play/image/etc/24/24002190-04.jpg';
  const info = route.params.item;
  return (
    <ImageBackground
      blurRadius={2}
      resizeMode="stretch"
      style={{flex: 1, justifyContent: 'space-between'}}
      source={{uri: info.poster}}>
      <ArrowLeft onPress={() => navigation.goBack()} color="white" size={48} />
      <Text style={F_SIZE_HEADER}>{info.title}</Text>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={{
          flex: 1,
          marginTop: 50,
        }}
        colors={backgroundColor}>
        <ScrollView
          style={{
            padding: widthPercent(15),
          }}>
          <SummaryCard info={info} />
          <Outline content="내용" />
          <Price />
          <ConcertHallCard
            onPress={() => {setIsRender(true); setIsVisible(!isVisible)}}
            onBtnPress={() => console.log('공연장 시야 보기로 이동')}
            title="KSPO DOME"
            seat={14730}
            address="서울특별시 송파구 올림픽로 424"
          />
          {isRender ? (
            <MapView
              style={isVisible ? {width: 400, height: 400} : false}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.520555375455,
                longitude: 127.11505129348,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: 37.520555375455,
                  longitude: 127.11505129348,
                }}
                title="공연장"
                description="this is a marker example"
              />
            </MapView>
          ) : (
            false
          )}

          <Text>출연</Text>
          <Text>취소 수수료</Text>
          <View
            style={{
              width: 400,
              height: 5000,
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.stretch}
              style={{width: 400, height: '100%'}}
              source={{uri: concertInfo}}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}
const Outline = ({content}: {content: string}) => {
  return (
    <View>
      <Text>개요</Text>
      <Text>{content}</Text>
    </View>
  );
};

const Price = () => {
  return (
    <View>
      <Text>가격</Text>
      <View>
        <Text>R석</Text>
        <Text>165.000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPercent(380),
    height: heightPercent(350),
  },
});
