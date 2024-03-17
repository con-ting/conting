import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, DimensionValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';
import { fontPercent, widthPercent } from '../../config/Dimensions';

type ModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  height?: DimensionValue;
};

/**
 *
 * @param props
 * @returns
 * @authore 김형민
 */
export const SlideModal = (props: ModalProps) => {
  const [modalHeight, setModalHeight] = useState<DimensionValue>(0);

  const setModalMaxHeight = () => {
    setModalHeight(props.height);
  };

  useEffect(() => {
    if (props.isVisible) {
      setModalMaxHeight();
    }
  }, [props.isVisible]);

  return (
    <Modal animationType='slide' transparent={true} visible={props.isVisible}>
      <TouchableOpacity onPress={() => props.setIsVisible(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: `rgba(128, 128, 128, 0.2)` }} />
      <View style={{ width: '100%', height: modalHeight, backgroundColor: Color.MAINBLACK, position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ marginLeft: '45%', marginVertical: widthPercent(12), width: widthPercent(40), borderBottomWidth: 4, borderRadius: 4, borderColor: Color.MAINBLACK }} />
        {props.children}
      </View>
    </Modal>
  );
};

/**
 *
 * @param props
 * @returns
 * @authore 김형민
 */
export const PopUpModal = (props: ModalProps) => {
  return (
    <Modal animationType='fade' transparent={true} visible={props.isVisible}>
      <>
        <TouchableOpacity
          onPress={() => {
            props.setIsVisible(false);
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: `rgba(128, 128, 128, 0.2)` }}
        >
          <TouchableWithoutFeedback>
            <View style={{ width: '90%', padding: widthPercent(20), backgroundColor: Color.MAINBLACK , borderRadius: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                }}
              />
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </>
    </Modal>
  );
};