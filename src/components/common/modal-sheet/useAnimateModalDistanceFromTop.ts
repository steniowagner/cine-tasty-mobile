import {useCallback, useEffect, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';

export const MAX_CLAMPING = -50;

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  stiffness: 500,
};

type HandleGestureEventProps = {
  startY: number;
};

type UseAnimateModalDistanceFromTopProps = {
  cardHeight: number;
  closeModal: () => void;
  isOpen?: boolean;
};

export const useAnimateModalDistanceFromTop = (
  props: UseAnimateModalDistanceFromTopProps,
) => {
  const dimensions = useWindowDimensions();

  const distanceFromTop = useSharedValue(dimensions.height);

  const cardInitialPosition = useMemo(
    () => dimensions.height - props.cardHeight,
    [props.cardHeight],
  );

  const distanceFromTopAnimatedStyle = useAnimatedStyle(() => ({
    top: withSpring(distanceFromTop.value, SPRING_CONFIG),
  }));

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    HandleGestureEventProps
  >({
    onStart(_, context) {
      context.startY = distanceFromTop.value;
    },
    onActive(event, context) {
      if (event.translationY >= MAX_CLAMPING) {
        distanceFromTop.value = context.startY + event.translationY;
      }
    },
    onEnd() {
      const shouldCloseModal = distanceFromTop.value > props.cardHeight;
      const nextDistanceFromTopValue = shouldCloseModal
        ? dimensions.height
        : cardInitialPosition;
      distanceFromTop.value = nextDistanceFromTopValue;
      if (shouldCloseModal) {
        runOnJS(props.closeModal)();
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

  return {
    animatedStyle: distanceFromTopAnimatedStyle,
    handleGestureEvent,
  };
};
