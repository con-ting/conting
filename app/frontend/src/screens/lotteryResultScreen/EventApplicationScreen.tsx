import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';
import Video from 'react-native-video';

export default function EventApplicationScreen({concerts}) {
  const [paused, setPaused] = useState(false); // 비디오 재생 상태를 제어하는 state
  const videoRef = useRef(null);

  const videoUrl =
    'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/5/8cb6a38a801b05612706a4a8bae68ea05ed6ad4c6938bf9e2987daaf72a20997.webm';

  // 비디오를 터치했을 때 호출될 함수
  const handlePressVideo = () => {
    setPaused(!paused); // paused 상태를 토글
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePressVideo}>
        <View style={styles.videoContainer}>
          <Video
            source={{uri: videoUrl}}
            ref={videoRef}
            style={styles.backgroundVideo}
            paused={paused}
            resizeMode="contain"
            onError={e => console.log(e)} // 에러 핸들링
            onEnd={() => {
              setPaused(true);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoContainer: {
    height: 300, // 적절한 높이 설정
    width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
