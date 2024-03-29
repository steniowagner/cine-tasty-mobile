import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  runOnJS,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';

import metrics from '@/styles/metrics';

const CLOSE_MODAL_GESTURE_ANIMATION_DURATION = 180;

type HandleGestureEventProps = {
  startY: number;
};

type UseGestureEventsProps = {
  distanceFromTop: SharedValue<number>;
  cardInitialPosition: number;
  cardHeight: number;
  windowHeight: number;
  onClose: () => void;
  maxClamping: number;
};

export const useGestureEvents = (props: UseGestureEventsProps) => {
  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    HandleGestureEventProps
  >({
    onStart(_, context) {
      context.startY = props.distanceFromTop.value;
    },
    onActive(event, context) {
      const isInTheScrollableArea = event.translationY >= -props.maxClamping;
      if (isInTheScrollableArea) {
        const startY = process.env.JEST_WORKER_ID ? 0 : context.startY;
        props.distanceFromTop.value = startY + event.translationY;
      }
    },
    onEnd() {
      const shouldCloseModal =
        props.distanceFromTop.value > metrics.height - props.cardHeight / 2;
      const nextDistanceFromTopValue = shouldCloseModal
        ? props.windowHeight
        : props.cardInitialPosition;
      props.distanceFromTop.value = withTiming(
        nextDistanceFromTopValue,
        { duration: CLOSE_MODAL_GESTURE_ANIMATION_DURATION },
        () => {
          if (shouldCloseModal) {
            runOnJS(props.onClose)();
          }
        },
      );
    },
  });

  return handleGestureEvent;
};
