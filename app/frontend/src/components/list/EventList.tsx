import {StyleSheet, Text, View, Image, ColorValue} from 'react-native';
import {BlueButton} from '../button/Button';
import {fontPercent, heightPercent} from '../../config/Dimensions';
import {widthPercent} from './../../config/Dimensions';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_TEXT,
  F_SIZE_TITLE,
  F_SIZE_Y_BIGTEXT,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {Spacer} from '../../utils/common/Spacer';
import {MAINBLACK} from '../../config/Color';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function EventList() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlueButton
          onPress={() => true}
          width={100}
          textSize={fontPercent(14)}
          btnText="응모 이벤트"
          borderWidth={3}
          disabled={true}
        />
        <Text style={{...F_SIZE_BIGTEXT, flex: 1}}>
          나의 <Text style={F_SIZE_Y_BIGTEXT}>NFT 티켓</Text> 으로 응모하면 득템
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={{...F_SIZE_TITLE, color: MAINBLACK}}>
          4일 14: 15:40 남음
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View
          style={{
            flex: 3,
            borderRadius: widthPercent(10),
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: widthPercent(10),
              resizeMode: 'stretch',
            }}
            source={{
              uri: 'https://shopping-phinf.pstatic.net/main_4628559/46285599759.20240309134952.jpg?type=f640',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: widthPercent(20),
          }}>
          <Text style={F_SIZE_Y_TITLE}>[BTS] 아미 피크닉 굿즈 세트</Text>
          <Spacer space={10} />
          <View>
            <Text style={F_SIZE_BIGTEXT}>14435개 응모권 접수 중</Text>
            <Text style={F_SIZE_BIGTEXT}>상품 개수 : 50개</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Text style={F_SIZE_Y_TITLE}>응모하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPercent(10),
    height: heightPercent(500),
    marginBottom: heightPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: widthPercent(10),
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercent(10),
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: widthPercent(10),
    backgroundColor: 'rgba(242,242,242,0.8)',
  },
  cardContainer: {
    marginTop: 10,
    flex: 10,
    borderRadius: widthPercent(10),
    width: '100%',
    backgroundColor: '#1C1C1C',
  },
});
