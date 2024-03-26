import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BUTTONSELECT,
  MAINBLACK,
  MAINWHITE,
  MAINYELLOW,
} from '../../../config/Color';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_B_BUTTON,
  F_SIZE_TITLE,
} from '../../../config/Font';
import {
  ClipboardText,
  Edit,
  Gallery,
  VideoHorizontal,
  VideoPlay,
} from 'iconsax-react-native';
import {heightPercent, widthPercent} from '../../../config/Dimensions';
import {GrayButton, YellowButton} from '../../../components/button/Button';
import {MultiLineInput, SimpleInput} from '../../../components/input/input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ConcertRegistInfoScreen() {
  const [image, setImage] = useState(null); // 이미지 등록
  const [fileName, setFileName] = useState('');

  const [selected, setSelected] = useState(''); // 선택된 버튼을 추적하기 위한 상태]
  const navigation = useNavigation();

  // 버튼을 누를 때 호출되는 함수
  const handlePress = type => {
    setSelected(type);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('image picker 사용 취소');
      } else if (response.error) {
        console.log('ImagePicker 에러: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        const fileName = response.assets[0].fileName; // 파일 이름 추출
        setImage(source);
        setFileName(fileName); // 파일 이름 상태 업데이트
      }
    });
  };


  return (
    <KeyboardAwareScrollView
      style={styles.view}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.context}>
          <View style={styles.posterContainer}>
            <View>
              <View style={styles.title}>
                <Gallery style={styles.icon} />
                <Text style={F_SIZE_TITLE}>포스터 등록</Text>
              </View>
              <View style={styles.findFileContainer}>
                <GrayButton onPress={selectImage} width={'100%'} btnText="파일찾기" textSize={16} />
              </View>
            </View>
            <View>
              <Image
                source={image || require('../../../assets/images/bro.png')}
                style={styles.img}
              />
            </View>
          </View>
          <View style={styles.title}>
            <Edit style={styles.icon} />
            <Text style={F_SIZE_TITLE}>공연 제목</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput
              textColor={MAINBLACK}
              placeholder="제목 입력"
              backGroundColor={MAINWHITE}
              height={heightPercent(40)}
            />
          </View>
          <View style={styles.title}>
            <ClipboardText style={styles.icon} />
            <Text style={F_SIZE_TITLE}>소개 내용 / 소개용 이미지</Text>
          </View>
          <View style={styles.infos}>
            <MultiLineInput
              textColor={MAINBLACK}
              placeholder="소개 입력"
              width={widthPercent(355)}
              height={heightPercent(72)}
            />
            <View style={styles.space} />
            <View style={styles.row}>
              <SimpleInput
                textColor={MAINBLACK}
                placeholder="파일 첨부"
                backGroundColor={MAINWHITE}
                width={widthPercent(250)}
                height={heightPercent(40)}
                value={fileName} //fileName 상태 적용
                editable={false}
              />
              <GrayButton onPress={selectImage} width={'30%'} btnText="파일찾기" textSize={16} />
            </View>
          </View>
          <View style={styles.title}>
            <VideoPlay style={styles.icon} />
            <Text style={F_SIZE_TITLE}>홍보 영상 제목 / URL</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput
              textColor={MAINBLACK}
              placeholder="URL"
              backGroundColor={MAINWHITE}
              height={heightPercent(40)}
            />
          </View>
          <View style={styles.title}>
            <VideoHorizontal style={styles.icon} />
            <Text style={F_SIZE_TITLE}>장르</Text>
          </View>
          <View style={styles.genre}>
            <TouchableOpacity
              onPress={() => handlePress('발라드')}
              style={[
                styles.button,
                selected === '발라드' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  selected === '발라드' && styles.selectedText,
                ]}>
                발라드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('랩/힙합')}
              style={[
                styles.button,
                selected === '랩/힙합' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  selected === '랩/힙합' && styles.selectedText,
                ]}>
                랩/힙합
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('락/메탈')}
              style={[
                styles.button,
                selected === '락/메탈' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  selected === '락/메탈' && styles.selectedText,
                ]}>
                락/메탈
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('재즈')}
              style={[
                styles.button,
                selected === '재즈' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  selected === '재즈' && styles.selectedText,
                ]}>
                재즈
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={() => navigation.navigate('ConcertRegistHall')}
            width={'30%'}
            btnText="다음"
            textSize={20}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  contentContainer: {
    flexGrow: 1, // 스크롤 뷰의 컨텐츠가 충분한 공간을 차지하도록 설정
    justifyContent: 'space-between', // 컨텐츠와 하단 버튼 사이에 공간을 만듦
  },

  container: {
    flex: 1,
    margin: 20,
  },
  context: {
    flex: 1,
  },

  findFileContainer: {
    marginLeft: 10,
    marginTop: 14,
  },

  posterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },

  img: {
    width: widthPercent(195),
    height: heightPercent(162),
    borderRadius: 16,
  },

  title: {
    gap: 16,
    flexDirection: 'row',
    marginTop: 20,
  },
  infos: {
    marginLeft: 10,
    marginTop: 14,
    // flexDirection: 'row',
  },
  genre: {
    marginLeft: 10,
    marginTop: 14,
    flexDirection: 'row',
  },

  icon: {
    width: widthPercent(32),
    height: heightPercent(32),
    color: MAINWHITE,
  },
  space: {
    marginTop: 20,
  },
  button: {
    width: widthPercent(80),
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: MAINWHITE,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: MAINYELLOW,
    backgroundColor: BUTTONSELECT,
  },
  selectedText: {
    color: MAINWHITE,
  },
  nextButton: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
