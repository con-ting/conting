import {View, Text, StyleSheet} from 'react-native';
import {MAINBLACK, MAINYELLOW} from '../../config/Color';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

interface SquareProps {
  index: number;
  progress: any;
}

export const Square = (props: SquareProps) => {
  const offsetAngle = (2 * Math.PI) / 12;
  const finalAngle = offsetAngle * (11 - props.index);
  const rotate = useDerivedValue(() => {
    if (props.progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, props.progress.value);
    }
    if (props.progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return props.progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-12 * 12);
    }

    if (props.progress.value > 2 * Math.PI) {
      return withTiming((props.index - 12) * 12);
    }

    return withTiming(-props.index * 12);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 12,
          aspectRatio: 1,
          backgroundColor: MAINYELLOW,
          opacity: (props.index + 1) / 12,
          position: 'absolute',
        },
        rStyle,
      ]}
    />
  );
};

export default function Loading() {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  return (
    <View style={styles.container}>
      {new Array(12).fill(0).map((_, index) => {
        return <Square key={index} progress={progress} index={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
