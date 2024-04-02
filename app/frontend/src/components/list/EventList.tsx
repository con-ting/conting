import {StyleSheet, Text, View, Image} from 'react-native';
import {BlueButton} from '../button/Button';
import {fontPercent, heightPercent} from '../../config/Dimensions';
import {widthPercent} from './../../config/Dimensions';
import {BlackButton} from './../button/Button';
import {F_SIZE_TEXT, F_SIZE_Y_BIGTEXT} from '../../config/Font';

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
        <Text>나의 NFT 티켓으로 응모하면 득템</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text>4일 14: 15:40 남음</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.cardContainer}>
          <View
            style={{
              flex: 2,
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
          <View style={{flex: 1}}>
            <Text style={F_SIZE_Y_BIGTEXT}>[BTS] 아미 피크닉 굿즈 세트</Text>
            <Text style={F_SIZE_TEXT}>14435개 응모권 접수 중</Text>
            <Text style={F_SIZE_TEXT}>상품 개수 : 50개</Text>
          </View>
          <BlackButton
            onPress={() => true}
            btnText="응모 하기"
            textSize={fontPercent(16)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: widthPercent(10),
    height: heightPercent(450),
    marginBottom: heightPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    alignItems: 'center',
    borderRadius: widthPercent(10),
    paddingVertical: 10,
    backgroundColor: 'rgba(242,242,242,0.8)',
  },
  cardContainer: {
    margin: widthPercent(20),
    borderRadius: widthPercent(10),
    width: widthPercent(300),
    height: heightPercent(300),
    backgroundColor: '#1C1C1C',
  },
});
