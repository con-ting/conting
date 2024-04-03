import {Alert, Image, Text, View} from 'react-native';
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
import {ConcertRegistApi} from '../../../api/catalog/concert';

export default function ConcertRegistCompany({route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');

  const handleSubmit = async () => {
    if (!companyName) {
      Alert.alert('알림', '회사명을 입력해주세요.');
      return;
    }

    if (!companyPhone) {
      Alert.alert('알림', ' 연락처를 입력해주세요.');
      return;
    }

    const previousData = route.params.registrationData; // Assuming finalData is passed from the previous screen
    const completeData = {
      ...previousData,
      company: {
        company_name: companyName,
        call: companyPhone,
      },
    };
    try {
      console.log('보낼 데이터', completeData);
      const response = await ConcertRegistApi(completeData);
      if (response.success) {
        setModalVisible(true);
      } else {
        console.error('API call failed', response.error);
      }
    } catch (error) {
      console.error('API call error', error);
    }
  };

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
                source={require('../../../assets/gif/success3.gif')}
              />
              <Text style={F_SIZE_B_HEADER}>공연이 등록되었습니다!</Text>
            </View>
            <YellowButton
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Main');
              }}
              btnText="확인"
              textSize={20}
              width={250}
            />
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
            <SimpleInput
              backGroundColor={MAINWHITE}
              onChangeText={setCompanyName}
              textColor={MAINBLACK}
            />
          </View>
          <View style={styles.title}>
            <CallCalling style={styles.icon} />
            <Text style={F_SIZE_TITLE}>연락처</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput
              backGroundColor={MAINWHITE}
              onChangeText={setCompanyPhone}
              textColor={MAINBLACK}
            />
          </View>
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={handleSubmit}
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
