import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  useSharedValue,
  withSpring,
  interpolate,
  useAnimatedStyle,
  runOnJS,
  withSequence,
  withTiming,
  ReduceMotion,
} from 'react-native-reanimated';
import { WRAPPER_HEIGHT as TabNavigatorHeight } from '@/navigation/components/tab-navigator/TabNavigator.styles';
import metrics from '@styles/metrics';

import { DEFAULT_HEIGHT as AlertHeight } from './AlertMessage.styles';

const OPACITY_INPUT_INTERPOLATION = [0, 0.5, 0.9, 1];
const OPACITY_OUTPUT_INTERPOLATION = [0, 0.5, 1, 1];
const TRANSLATE_Y_INPUT_INTERPOLATION = [0, 0.9, 1];
const BASE_ANIMATITON_FINAL_POSITION =
  metrics.height - (TabNavigatorHeight + AlertHeight + metrics.xl);
const ANIMATITON_FINAL_POSITION =
  Platform.OS === 'android'
    ? BASE_ANIMATITON_FINAL_POSITION - metrics.xl
    : BASE_ANIMATITON_FINAL_POSITION;

export const TRANSLATE_Y_OUTPUT_INTERPOLATION = [
  metrics.height,
  ANIMATITON_FINAL_POSITION,
  ANIMATITON_FINAL_POSITION - metrics.sm,
];
export const TIMING_HIDE_ANIMATION = 200;
export const TIMING_SPRING_ANIMATION = 400;
export const HIDE_DELAY = 3000;

type UsePopupAdviceParams = {
  onFinishToShow?: () => void;
};

export const useAlertMessage = ({
  onFinishToShow = () => {},
}: UsePopupAdviceParams) => {
  const position = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      position.value,
      OPACITY_INPUT_INTERPOLATION,
      OPACITY_OUTPUT_INTERPOLATION,
    ),
    transform: [
      {
        translateY: interpolate(
          position.value,
          TRANSLATE_Y_INPUT_INTERPOLATION,
          TRANSLATE_Y_OUTPUT_INTERPOLATION,
        ),
      },
    ],
  }));

  const hide = useCallback(() => {
    position.value = withSequence(
      withSpring(1, {
        duration: TIMING_SPRING_ANIMATION,
        dampingRatio: 0.5,
        stiffness: 500,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        reduceMotion: ReduceMotion.System,
      }),
      withTiming(
        0,
        { duration: TIMING_HIDE_ANIMATION },
        (isFinished?: boolean) => {
          if (isFinished) {
            runOnJS(onFinishToShow)();
          }
        },
      ),
    );
  }, [onFinishToShow]);

  const show = useCallback(() => {
    const onShow = () => {
      setTimeout(() => {
        hide();
      }, HIDE_DELAY);
    };
    position.value = withSpring(
      0.9,
      {
        damping: 30,
        stiffness: 500,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.01,
      },
      (isFinished?: boolean) => {
        if (isFinished) {
          runOnJS(onShow)();
        }
      },
    );
  }, [hide]);

  useEffect(() => {
    show();
  }, []);

  return {
    animatedStyle,
  };
};
