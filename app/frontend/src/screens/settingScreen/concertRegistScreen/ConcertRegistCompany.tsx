import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  F_SIZE_B_HEADER,
  F_SIZE_B_TITLE,
  F_SIZE_TITLE,
} from '../../../config/Font';
import {MAINBLACK, MAINWHITE} from '../../../config/Color';
import {heightPercent, widthPercent} from '../../../config/Dimensions';
import {Buildings, CallCalling} from 'iconsax-react-native';
import {SimpleInput} from '../../../components/input/input';
import {YellowButton} from '../../../components/button/Button';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {PopUpModal} from '../../../components/modal/Modal';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import SuccessModal from '../../../components/modal/SuccessModal';

export default function ConcertRegistCompany() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <SuccessModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        children={
          <View style={styles.modal}>
            <View style={styles.modalAlert}>
              <FastImage
                style={{width: widthPercent(140), height: heightPercent(140)}}
                source={require('../../../assets/gif/sc.gif')}
              />
              <Text style={F_SIZE_B_HEADER}>공연이 등록되었습니다!</Text>
            </View>
            <YellowButton btnText="확인" textSize={20} width={250} />
          </View>
        }
        // backGroundColor="white"
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Buildings style={styles.icon} />
            <Text style={F_SIZE_TITLE}>주최자 / 기획사</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput backGroundColor={MAINWHITE} textColor={MAINBLACK} />
          </View>
          <View style={styles.title}>
            <CallCalling style={styles.icon} />
            <Text style={F_SIZE_TITLE}>연락처</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput backGroundColor={MAINWHITE} textColor={MAINBLACK} />
          </View>
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            btnText="등록하기"
            textSize={20}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  content: {
    flex: 1,
  },
  infos: {
    marginLeft: 10,
    marginTop: 14,
  },
  icon: {
    width: widthPercent(32),
    height: heightPercent(32),
    color: MAINWHITE,
  },
  nextButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    gap: 16,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  modal: {
    height: heightPercent(303),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalAlert: {
    alignItems: 'center',
    gap: 20,
  },
});
