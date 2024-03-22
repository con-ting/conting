import {
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

export default function ConcertDetailScreen({route}) {
  // 배경색을 recoil에서 받아오기
  const backgroundColor = useRecoilValue(posterColor);
  const navigation = useNavigation();
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
          padding:widthPercent(15)
        }}
        >
          <SummaryCard info={info} />
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPercent(380),
    height: heightPercent(350),
  },
});
