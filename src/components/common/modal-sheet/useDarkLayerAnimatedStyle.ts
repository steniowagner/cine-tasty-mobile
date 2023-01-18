import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const DARK_LAYER_OPACITY_ANIMATION_DURATION = 50;

type UseDarkLayerAnimatedStyleProps = {
  distanceFromTop: SharedValue<number>;
  cardInitialPosition: number;
  windowHeight: number;
  maxClamping: number;
};

export const useDarkLayerAnimatedStyle = (
  props: UseDarkLayerAnimatedStyleProps,
) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(
        props.distanceFromTop.value,
        [
          props.windowHeight - 1.5 * props.maxClamping,
          props.cardInitialPosition,
        ],
        [0, 1],
        Extrapolate.CLAMP,
      ),
      {duration: DARK_LAYER_OPACITY_ANIMATION_DURATION},
    );
    return {
      opacity,
    };
  });

  return animatedStyle;
};
