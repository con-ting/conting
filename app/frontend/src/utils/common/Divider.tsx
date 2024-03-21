import { View } from 'react-native';
import * as Color from '../../config/Color';
import {heightPercent, widthPercent} from "../../config/Dimensions.tsx";


/**
 * view와 같은 컴포넌트를 구분짓는 divider입니다.
 * @returns
 * @author 김형민
 */
export const Divider = () => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderWidth: heightPercent(0.5),
        marginHorizontal: widthPercent(10),
        borderColor: Color.MAINGRAY,
      }}
    />
  );
};
