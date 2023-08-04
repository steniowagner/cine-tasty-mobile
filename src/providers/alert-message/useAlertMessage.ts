import metrics from '@styles/metrics';
import {useCallback, useEffect} from 'react';
import {
  useSharedValue,
  withSpring,
  interpolate,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSequence,
} from 'react-native-reanimated';

import {WRAPPER_HEIGHT as TabNavigatorHeight} from '@routes/components/tab-navigator/TabNavigator.styles';

import {DEFAULT_HEIGHT as AlertHeight} from './AlertMessage.styles';

export const DEFAULT_ANIMATION_DURATION = 200;
export const HIDE_POPUP_DELAY = 3000;

const ANIMATION_SPRING_CONFIGURATION = {
  damping: 30,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.01,
};
const ANIMATITON_FINAL_POSITION =
  metrics.height - (TabNavigatorHeight + AlertHeight + metrics.extraLargeSize);

type UsePopupAdviceProps = {
  onFinishToShow?: () => void;
};

export const useAlertMessage = (props: UsePopupAdviceProps) => {
  const position = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          position.value,
          [0, 0.9, 1],
          [
            metrics.height,
            ANIMATITON_FINAL_POSITION,
            ANIMATITON_FINAL_POSITION - metrics.extraSmallSize,
          ],
        ),
      },
    ],
  }));

  const hide = useCallback(() => {
    position.value = withSequence(
      withSpring(1, ANIMATION_SPRING_CONFIGURATION),
      withTiming(
        0,
        {duration: DEFAULT_ANIMATION_DURATION},
        (isFinished: boolean) => {
          if (isFinished) {
            runOnJS(props.onFinishToShow)();
          }
        },
      ),
    );
  }, [props.onFinishToShow]);

  const show = useCallback(() => {
    const onShow = () => {
      setTimeout(() => {
        hide();
      }, HIDE_POPUP_DELAY);
    };
    position.value = withSpring(
      0.9,
      ANIMATION_SPRING_CONFIGURATION,
      (isFinished: boolean) => {
        if (isFinished) {
          runOnJS(onShow)();
        }
      },
    );
  }, []);

  useEffect(() => {
    show();
  }, []);

  return {
    animatedStyle,
  };
};
