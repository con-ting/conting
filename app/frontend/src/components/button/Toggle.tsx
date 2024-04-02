import React, {useState} from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import {MAINGRAY, MAINYELLOW} from '../../config/Color';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';

type ToggleProps = {
  color?: String;
  isEnabled: boolean;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Toggle
 * Toggle 컴포넌트입니다.
 * - color: 토글 색상 (옵션, gray, yellow, 아무것도 지정하지 않았을 경우 yellow로 지정됩니다.)
 * @param props
 * @return
 * @author 김형민
 */
export const Toggle = (props: ToggleProps) => {
  const toggleSwitch = () => {
    props.setIsEnabled(!props.isEnabled);
  };

  return (
    <SwitchToggle
      switchOn={props.isEnabled}
      onPress={toggleSwitch}
      circleColorOff={props.color == 'gray' ? MAINGRAY : MAINYELLOW}
      circleColorOn="#fff"
      backgroundColorOn={props.color == 'gray' ? MAINGRAY : MAINYELLOW}
      backgroundColorOff="#fff"
      containerStyle={{
        width: widthPercent(45),
        height: heightPercent(18),
        borderRadius: 25,
        padding: 3,
        borderWidth: 1,
        borderColor: props.color == 'gray' ? MAINGRAY : MAINYELLOW,
      }}
      circleStyle={{
        width: 18,
        height: 18,
        borderRadius: 20,
      }}
    />
  );
};
