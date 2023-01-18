import {useCallback, useEffect, useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';

import metrics from '@styles/metrics';

import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';

export const MAX_CLAMPING = metrics.getWidthFromDP('8%');

const DARK_LAYER_OPACITY_ANIMATION_DURATION = 50;

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  stiffness: 500,
};

type HandleGestureEventProps = {
  startY: number;
};

type UseModalSheetProps = {
  height?: number;
  onClose: () => void;
  isOpen?: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const dimensions = useWindowDimensions();

  const distanceFromTop = useSharedValue(dimensions.height);

  const cardHeight = useMemo(
    () =>
      props.height
        ? props.height + MAX_CLAMPING
        : DEFAULT_MODAL_SHEET_HEIGHT + MAX_CLAMPING,
    [props.height],
  );

  const cardInitialPosition = useMemo(
    () => dimensions.height - cardHeight,
    [cardHeight],
  );

  const distanceFromTopAnimatedStyle = useAnimatedStyle(() => ({
    top: withSpring(distanceFromTop.value, SPRING_CONFIG),
  }));

  const darkLayerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(
        distanceFromTop.value,
        [dimensions.height - 1.5 * MAX_CLAMPING, cardInitialPosition],
        [0, 1],
        Extrapolate.CLAMP,
      ),
      {duration: DARK_LAYER_OPACITY_ANIMATION_DURATION},
    );
    return {
      opacity,
    };
  });

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    HandleGestureEventProps
  >({
    onStart(_, context) {
      context.startY = distanceFromTop.value;
    },
    onActive(event, context) {
      if (event.translationY >= -MAX_CLAMPING) {
        distanceFromTop.value = context.startY + event.translationY;
      }
    },
    onEnd() {
      const shouldCloseModal = distanceFromTop.value > cardHeight;
      const nextDistanceFromTopValue = shouldCloseModal
        ? dimensions.height
        : cardInitialPosition;
      distanceFromTop.value = nextDistanceFromTopValue;
      if (shouldCloseModal) {
        runOnJS(setIsOpen)(false);
      }
    },
  });

  const handleAnimateDistanceFromTop = useCallback(() => {
    const nextDistanceFromTopValue = props.isOpen
      ? cardInitialPosition
      : dimensions.height;
    distanceFromTop.value = withSpring(nextDistanceFromTopValue, SPRING_CONFIG);
  }, [cardInitialPosition, props.isOpen]);

  useEffect(() => {
    handleAnimateDistanceFromTop();
  }, [props.isOpen]);

  useEffect(() => {
    if (!isOpen && props.isOpen) {
      props.onClose();
    }
  }, [isOpen]);

  return {
    cardAnimatedStyle: distanceFromTopAnimatedStyle,
    bottomGapSectionHeight: MAX_CLAMPING,
    darkLayerAnimatedStyle,
    handleGestureEvent,
    cardHeight,
    isOpen,
  };
};
