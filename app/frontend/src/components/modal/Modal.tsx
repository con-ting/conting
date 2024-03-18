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
  backGroundColor?: string;
};

/**
 *
 * @param props
 * isVisible : 이 모달의 useState
 * setIsVisible : 이 모달의 setUseState
 * children : 모달 영역 내 들어갈 내용입니다. <모달> children </모달> 태그안에 사용하시면 됩니다.
 * height? : 슬라이스 모달의 영역 슬라이스를 위해서 사용됩니다. (잡아끌기 등)
 * backGroundColor? : 모달영역의 백그라운드 색상
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
      <View style={{ width: '100%', height: modalHeight, backgroundColor: props.backGroundColor ? props.backGroundColor : Color.CUTEYELLOW, position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30 , paddingHorizontal : widthPercent(20)}}>
        <View style={{ marginLeft: '45%', marginVertical: widthPercent(12), width: widthPercent(40), borderBottomWidth: 4, borderRadius: 4, borderColor: Color.MAINBLACK}} />
        {props.children}
      </View>
    </Modal>
  );
};

/**
 *
 * @param props
 * isVisible : 이 모달의 useState
 * setIsVisible : 이 모달의 setUseState
 * children : 모달 영역 내 들어갈 내용입니다. <모달> children </모달> 태그안에 사용하시면 됩니다.
 * height? : 슬라이스 모달의 영역 슬라이스를 위해서 사용됩니다. (잡아끌기 등)
 * backGroundColor? : 모달영역의 백그라운드 색상
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
            <View style={{ width: '90%', padding: widthPercent(20), backgroundColor: props.backGroundColor ? props.backGroundColor : Color.CUTEYELLOW , borderRadius: 10 }}>
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