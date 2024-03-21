import { DimensionValue, Text } from 'react-native';
import * as Font from "./Font.ts";
import * as Color from "./Color.ts";
import {fontPercent} from "./Dimensions.tsx";

type FontProps = {
  numberOfLines?: number;
  color?: string;
  children: React.ReactNode;
  lineHeight?: number;
};

/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const H1 = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(28),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
      }}
    >
      {props.children}
    </Text>
  );
};

/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const H2 = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(24),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
      }}
    >
      {props.children}
    </Text>
  );
};

/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const H3 = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(22),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
      }}
    >
      {props.children}
    </Text>
  );
};

/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const H4 = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(20),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
      }}
    >
      {props.children}
    </Text>
  );
};

/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const BODY1 = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(18),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
      }}
    >
      {props.children}
    </Text>
  );
};


/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const BODY2 = (props: FontProps) => {
  return (
      <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode='tail'
          style={{
            lineHeight: props.lineHeight,
            fontSize: fontPercent(16),
            fontFamily: Font.MAINFONT,
            color: props.color || Color.TEXTGRAY,
          }}
      >
        {props.children}
      </Text>
  );
};


/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const DETAIL1 = (props: FontProps) => {
  return (
      <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode='tail'
          style={{
            lineHeight: props.lineHeight,
            fontSize: fontPercent(14),
            fontFamily: Font.MAINFONT,
            color: props.color || Color.TEXTGRAY,
          }}
      >
        {props.children}
      </Text>
  );
};

export const DETAIL2 = (props: FontProps) => {
  return (
      <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode='tail'
          style={{
            lineHeight: props.lineHeight,
            fontSize: fontPercent(12),
            fontFamily: Font.MAINFONT,
            color: props.color || Color.TEXTGRAY,
          }}
      >
        {props.children}
      </Text>
  );
};


/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const DETAIL3 = (props: FontProps) => {
  return (
      <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode='tail'
          style={{
            lineHeight: props.lineHeight,
            fontSize: fontPercent(10),
            fontFamily: Font.MAINFONT,
            color: props.color || Color.TEXTGRAY,
          }}
      >
        {props.children}
      </Text>
  );
};


/**
 * typography
 * @param props
 * @returns
 * @author 김형민
 */
export const DETAIL3_UNDERLINE = (props: FontProps) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      ellipsizeMode='tail'
      style={{
        lineHeight: props.lineHeight,
        fontSize: fontPercent(10),
        fontFamily: Font.MAINFONT,
        color: props.color || Color.TEXTGRAY,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
      }}
    >
      {props.children}
    </Text>
  );
};
