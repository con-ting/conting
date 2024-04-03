import {Dimensions, Easing, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useState} from 'react';
import TicketQrCard from './TicketQrCard';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import TicketFront from '../ticketEntry/TicketFront';
import {vec} from '@shopify/react-native-skia';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BackgroundGradient} from './NFTCard';

export type ticketProps = {
  id: string;
  poster: string;
  title: string;
  date: string;
  location: string;
  row: string;
  col: string;
};

type TicketEntryCardProps = {
  onPress?: () => void;
  colors: Array<string>;
  ticket: ticketProps;
};

const {width, height} = Dimensions.get('window');
const cardWidth = width * 0.8;
const cardHeight = height * 0.7;
const imageHeight = 0.45 * cardHeight;
const c = vec(imageHeight / 2, imageHeight / 2);
const r = c.x - 32;
const MAX_SWIPE = Math.ceil(cardWidth - 50);

export default function TicketEntryCard(props: TicketEntryCardProps) {
  const [isBack, setIsBack] = useState(true);
  const {ticket} = props;
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const absoluteX = useSharedValue(0);
  const absoluteY = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .onBegin(e => {
      absoluteX.value = e.absoluteX;
      absoluteY.value = e.absoluteY;
    })
    .onUpdate(e => {
      const x = e.absoluteX - absoluteX.value;
      const y = e.absoluteY - absoluteY.value;
      if (x < MAX_SWIPE) {
        rotateX.value = x;
        imageScale.value = 1.2;
      }
      if (y < MAX_SWIPE) {
        rotateY.value = y;
        imageScale.value = 1.2;
      }
    })
    .onEnd(e => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
      imageScale.value = 1;
    });

  const animatedCard = useAnimatedStyle(() => {
    const xAxisRotation = `${interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-40, 40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const yAxisRotation = `${interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [40, -40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    return {
      transform: [
        {perspective: 1500},
        {rotateX: yAxisRotation},
        {rotateY: xAxisRotation},
        {translateX: x.value},
        {translateY: y.value},
      ],
    };
  });
  const toggleBack = () => {
    rotation.value = withTiming(
      // 각도
      isBack ? 0 : 180,
      {
        duration: 1000,
        easing: Easing.ease,
      }, // 애니메이션 종류 후 상태 업데이트
    );
    // setIsBack(!isBack);
  };

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotation.value}deg`}],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotation.value + 180}deg`}],
    };
  });

  const animatedImage = useAnimatedStyle(() => {
    const xAxisRotation = `${interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-40, 40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const yAxisRotation = `${interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [40, -40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const translationX = interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-80, 80],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    const translationY = interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-80, 80],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [
        {perspective: 1500},
        {rotateX: yAxisRotation},
        {rotateY: xAxisRotation},
        {scale: withTiming(imageScale.value)},
        {translateX: translationX},
        {translateY: translationY},
      ],
    };
  });
  const back = () => {
    setIsBack(!isBack);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BackgroundGradient
        width={cardWidth}
        height={cardHeight}
        colors={props.colors}
      />
      <GestureDetector gesture={dragGesture}>
        <Animated.View style={[styles.ticketContainer, animatedCard]}>
          <TouchableOpacity
            style={{zIndex: 100, width: cardWidth - 5, height: cardHeight - 5}}
            activeOpacity={1}
            onPress={back}>
            {isBack ? (
              // <Animated.View style={frontCardStyle}>
              <TicketFront {...ticket} />
            ) : (
              // </Animated.View>
              <TicketQrCard ticket={ticket} colors={props.colors} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketContainer: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: widthPercent(20),
  },
  imageContainer: {
    height: imageHeight,
  },
});
