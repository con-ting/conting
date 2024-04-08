import {Dimensions, Easing, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketQrCard from './TicketQrCard';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import TicketFront from '../ticketEntry/TicketFront';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BackgroundGradient} from './NFTCard';
import {useState} from 'react';

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

const MAX_SWIPE = Math.ceil(cardWidth - 50);

export default function TicketEntryCard(props: TicketEntryCardProps) {
  const {ticket} = props;
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const absoluteX = useSharedValue(0);
  const absoluteY = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const [isBack, setIsback] = useState(false);

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
  const backHandler = () => {
    setIsback(!isBack);
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
            style={{width: cardWidth, height: cardHeight}}
            activeOpacity={1}
            onPress={backHandler}>
            {!isBack ? (
              <TicketFront
                ticket={ticket}
                width={cardWidth}
                height={cardHeight}
              />
            ) : (
              <TicketQrCard
                width={cardWidth}
                height={cardHeight}
                ticket={ticket}
                colors={props.colors}
              />
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
  frontCard: {
    width: cardWidth - 5,
    height: cardHeight - 5,
    position: 'absolute',
  },
  backCard: {
    width: cardWidth - 5,
    height: cardHeight - 5,
    position: 'absolute',
  },
});
