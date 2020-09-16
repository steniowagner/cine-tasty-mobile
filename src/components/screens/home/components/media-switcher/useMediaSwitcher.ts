import { Animated } from 'react-native';
import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import metrics from 'styles/metrics';

type AnimationWithTranslationY = {
  opacity: Animated.AnimatedInterpolation;
  transform: (
    | {
        scale: Animated.Value;
        translateY?: undefined;
      }
    | {
        translateY: Animated.AnimatedInterpolation;
        scale?: undefined;
      }
  )[];
};

type AnimationWithTranslationX = {
  opacity: Animated.AnimatedInterpolation;
  transform: {
    translateX?: Animated.AnimatedInterpolation;
    scale?: Animated.AnimatedInterpolation;
  }[];
};

type State = {
  moviesOptionAnimatedStyle: AnimationWithTranslationY;
  optionTextAnimatedStyle: AnimationWithTranslationX;
  backgroundAnimatedStyle: AnimationWithTranslationX;
  tvOptionAnimatedStyle: AnimationWithTranslationY;
  onPressSwitchButton: () => void;
  t: (key: string) => string;
  onPressMovies: () => void;
  onPressTV: () => void;
  isOpen: boolean;
};

type Props = {
  switcherButtonAnimation: Animated.Value;
};

const useMediaSwitcher = ({ switcherButtonAnimation }: Props): State => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const optionTextAnimatedStyle = useMemo((): AnimationWithTranslationX => {
    const optionTextPositionInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-30, -metrics.getWidthFromDP('38%')],
    });

    const opacityInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    return {
      opacity: opacityInterpolation,
      transform: [
        {
          translateX: optionTextPositionInterpolation,
        },
      ],
    };
  }, []);

  const backgroundAnimatedStyle = useMemo((): AnimationWithTranslationX => {
    const scaleInterpolate = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    });

    const opacityInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [0, 1, 1],
    });

    return {
      opacity: opacityInterpolation,
      transform: [
        {
          scale: scaleInterpolate,
        },
      ],
    };
  }, []);

  const moviesOptionAnimatedStyle = useMemo((): AnimationWithTranslationY => {
    const moviesInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -80],
    });

    const opacityInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      opacity: opacityInterpolation,

      transform: [
        {
          scale: switcherButtonAnimation,
        },
        {
          translateY: moviesInterpolation,
        },
      ],
    };
  }, []);

  const tvOptionAnimatedStyle = useMemo((): AnimationWithTranslationY => {
    const tvInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -160],
    });

    const opacityInterpolation = switcherButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      opacity: opacityInterpolation,
      transform: [
        {
          scale: switcherButtonAnimation,
        },
        {
          translateY: tvInterpolation,
        },
      ],
    };
  }, []);

  const animateSwitcher = useCallback((shouldOpen: boolean, callback?: () => void) => {
    Animated.timing(switcherButtonAnimation, {
      toValue: shouldOpen ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start(callback);
  }, []);

  const onPressSwitchButton = useCallback(() => {
    setIsOpen((prevSetIsOpen: boolean) => !prevSetIsOpen);

    animateSwitcher(!isOpen);
  }, [isOpen]);

  const onPressMovies = useCallback(() => {
    setIsOpen(false);

    animateSwitcher(false, () => console.warn('MOVIES'));
  }, []);

  const onPressTV = useCallback(() => {
    setIsOpen(false);

    animateSwitcher(false, () => console.warn('TV'));
  }, []);

  return {
    moviesOptionAnimatedStyle,
    optionTextAnimatedStyle,
    backgroundAnimatedStyle,
    tvOptionAnimatedStyle,
    onPressSwitchButton,
    onPressMovies,
    onPressTV,
    isOpen,
    t,
  };
};

export default useMediaSwitcher;
