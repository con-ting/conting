import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';

export default function ConcertRegistInfoScreen({route}) {
  const [image, setImage] = useState(null); // 이미지 등록
  const [fileName, setFileName] = useState('');

  const [selected, setSelected] = useState(''); // 선택된 버튼을 추적하기 위한 상태]
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionImage, setDescriptionImage] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [genre, setGenre] = useState('');
  const navigation = useNavigation();

  // 버튼을 누를 때 호출되는 함수
  const handlePress = type => {
    setGenre(type);
  };

  async function uploadImageToCloudinary(uri) {
    let formData = new FormData();
    formData.append('file', {uri, type: 'image/jpeg', name: 'upload.jpg'});
    formData.append('upload_preset', 'kgo5vfww'); // Cloudinary에서 설정한 Unsigned Upload preset

    try {
      let response = await fetch(
        'https://api.cloudinary.com/v1_1/dyd7qk3q7/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      let responseJson = await response.json();

      console.log(responseJson);
      return responseJson.secure_url; // 업로드된 이미지의 URL
    } catch (error) {
      console.error(error);
    }
  }

  const selectPosterImage = () => {
    const options = {
      mediaType: 'photo', // 'photo', 'video', 또는 'mixed' 중 선택
      maxWidth: 2000, // 선택된 이미지의 최대 너비
      maxHeight: 2000, // 선택된 이미지의 최대 높이
      quality: 1, // 0과 1 사이의 값으로, 선택된 이미지의 품질을 지정 (0이 가장 낮은 품질, 1이 가장 높은 품질)
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const sourceUri = response.assets[0].uri; // 선택된 이미지의 URI
        const uploadedImageUrl = await uploadImageToCloudinary(sourceUri); // Cloudinary로 업로드
        if (uploadedImageUrl) {
          setImage({uri: uploadedImageUrl}); // 업로드된 이미지 URL로 상태 업데이트
        }
      }
    });
  };

  const selectDescriptionImage = () => {
    const options = {
      mediaType: 'photo', // 'photo', 'video', 또는 'mixed' 중 선택
      maxWidth: 2000, // 선택된 이미지의 최대 너비
      maxHeight: 2000, // 선택된 이미지의 최대 높이
      quality: 1, // 0과 1 사이의 값으로, 선택된 이미지의 품질을 지정 (0이 가장 낮은 품질, 1이 가장 높은 품질)
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const sourceUri = response.assets[0].uri; // 선택된 이미지의 URI
        const uploadedImageUrl = await uploadImageToCloudinary(sourceUri); // Cloudinary로 업로드
        if (uploadedImageUrl) {
          setDescriptionImage({uri: uploadedImageUrl});
          setFileName(descriptionImage.uri); // 업로드된 이미지 URL로 상태 업데이트
        }
      }
    });
  };
  const handleNext = () => {
    // 모든 필수 입력값이 있는지 확인
    if (!title) {
      Alert.alert('알림', '공연 제목을 입력해주세요.');
      return;
    }
    if (!description) {
      Alert.alert('알림', '소개 내용을 입력해주세요.');
      return;
    }
    if (!genre) {
      Alert.alert('알림', '장르를 선택해주세요.');
      return;
    }

    // 이전 페이지에서 받은 데이터
    const {reservationType, schedule} = route.params.registrationData;

    console.log('스케쥴아이디', schedule);
    console.log('예매방식', reservationType);

    const registrationData = {
      reservationType,
      schedule,
      show: {
        title,
        description,
        poster_image: image ? image.uri : '',
        description_image: descriptionImage ? descriptionImage.uri : '',
        genre: genre,
        video_title: videoTitle,
        video_url: videoUrl,
        // 추가적으로 필요한 show 관련 정보
      },
    };
    console.log(registrationData);
    navigation.navigate('ConcertRegistHall', {registrationData});
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
                <GrayButton
                  onPress={selectPosterImage}
                  width={'100%'}
                  btnText="파일찾기"
                  textSize={16}
                />
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
              onChangeText={setTitle}
              height={heightPercent(40)}
            />
          </View>
          <View style={styles.title}>
            <ClipboardText style={styles.icon} />
            <Text style={F_SIZE_TITLE}>소개 내용 / 소개용 이미지</Text>
          </View>
          <View style={styles.infos}>
            <MultiLineInput
              backGroundColor={MAINWHITE}
              textColor={MAINBLACK}
              placeholder="소개 입력"
              onChangeText={setDescription}
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
              <GrayButton
                onPress={selectDescriptionImage}
                width={'30%'}
                btnText="파일찾기"
                textSize={16}
              />
            </View>
          </View>
          <View style={styles.title}>
            <VideoPlay style={styles.icon} />
            <Text style={F_SIZE_TITLE}>홍보 영상 제목 / URL</Text>
          </View>
          <View style={styles.infos}>
            <SimpleInput
              textColor={MAINBLACK}
              placeholder="제목 입력"
              onChangeText={setVideoTitle}
              backGroundColor={MAINWHITE}
              height={heightPercent(40)}
            />
          </View>
          <View style={styles.infos}>
            <SimpleInput
              textColor={MAINBLACK}
              placeholder="URL"
              onChangeText={setVideoUrl}
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
              onPress={() => handlePress('FE')}
              style={[styles.button, genre === 'FE' && styles.selectedButton]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  genre === 'FE' && styles.selectedText,
                ]}>
                페스티벌
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('FA')}
              style={[styles.button, genre === 'FA' && styles.selectedButton]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  genre === 'FA' && styles.selectedText,
                ]}>
                팬클럽
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('MU')}
              style={[styles.button, genre === 'MU' && styles.selectedButton]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  genre === 'MU' && styles.selectedText,
                ]}>
                뮤지컬
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('DR')}
              style={[styles.button, genre === 'DR' && styles.selectedButton]}>
              <Text
                style={[
                  F_SIZE_B_BUTTON,
                  genre === 'DR' && styles.selectedText,
                ]}>
                연극
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={handleNext}
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
    marginTop: 20,
    // marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
