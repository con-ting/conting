import React, {memo, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import NftFront from '../nft/NftFront.tsx';
import NftClick from '../nft/NftClick.tsx';
import {PopUpModal} from '../modal/Modal.tsx';
import {MAINWHITE, MAINYELLOW} from '../../config/Color.ts';
import {Dimensions, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  BlurMask,
  Canvas,
  Extrapolate,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';

type NFTCardProps = {
  poster: string;
  title: string;
  date: string;
  location: string;
  row: string;
  no: string;
  ticketAddress: string;
  webmUrl: string;
  colors: Array<string>;
};

const width = Dimensions.get('window').width * 0.9;
const height = 320;
const cardWidth = width - 5;
const cardHeight = height - 5;

export default function NFTCard(props: NFTCardProps) {
  const [modal, setModal] = useState(false);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, cardHeight], [10, -10], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, cardWidth], [-10, 10], Extrapolate.CLAMP),
      );
    })
    .onUpdate(event => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)
      rotateX.value = interpolate(
        event.y,
        [0, cardHeight],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, cardWidth],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });
  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
        },
        {rotateX: rotateXvalue},
        {rotateY: rotateYvalue},
      ],
    };
  }, []);
  const modalToggle = () => {
    console.log('모달 온 NFT');
    setModal(!modal);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BackgroundGradient width={width} height={height} colors={[MAINYELLOW ,props.colors[0],MAINYELLOW ,props.colors[0]]} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: cardHeight,
              width: cardWidth,
              backgroundColor: 'black',
              position: 'absolute',
              borderRadius: 20,
              zIndex: 300,
            },
            rStyle,
          ]}>
          <TouchableOpacity activeOpacity={1} onPress={modalToggle}>
            <NftFront
              width={cardWidth}
              height={cardHeight}
              poster={props.poster}
              row={props.row}
              date={props.date}
              location={props.location}
              title={props.title}
              no={props.no}
            />
            {/* 인증번호 안올 때 모달 */}
            <PopUpModal
              isVisible={modal}
              backGroundColor={MAINWHITE}
              setIsVisible={setModal}>
              <NftClick url={props.webmUrl} />
            </PopUpModal>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export const BackgroundGradient = memo(
  ({
    width,
    height,
    colors,
  }: {
    width: number;
    height: number;
    colors: Array<string>;
  }) => {
    const canvasPadding = 40;
    return (
      <Canvas
        style={{
          width: width + canvasPadding,
          height: height + canvasPadding,
        }}>
        <RoundedRect
          x={canvasPadding / 2}
          y={canvasPadding / 2}
          width={width}
          height={height}
          color={'white'}
          r={20}>
          <SweepGradient
            c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
            colors={colors}
          />
        </RoundedRect>
        <BlurMask blur={10} style={'solid'} />
      </Canvas>
    );
  },
);
