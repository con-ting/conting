import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {CUTEYELLOW} from '../../config/Color';
import {widthPercent} from '../../config/Dimensions';

export default function SuccessModal({isVisible, setIsVisible, children}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <View style={styles.fullScreen}>
        <BlurView
          style={styles.absolute}
          blurType="light" // 'dark', 'light', 'xlight' 등으로 변경 가능
          blurAmount={10} // 이 값을 조정하여 블러의 강도를 변경
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalView: {
    margin: 20,

    backgroundColor: CUTEYELLOW,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
});
