import { useCallback, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import GestureHandler, {
  State as GestureHandlerState,
} from 'react-native-gesture-handler';

type State = {
  onPinchStateChange: (event: GestureHandler.PinchGestureHandlerStateChangeEvent) => void;
  pinchScale: Animated.Value;
  onPinchEvent: () => void;
};

export const useImagePinch = (): State => {
  const pinchScale = useRef(new Animated.Value(1)).current;

  const onPinchEvent = useMemo(
    () => Animated.event(
      [
        {
          nativeEvent: {
            scale: pinchScale,
          },
        },
      ],
      {
        useNativeDriver: true,
      },
    ),
    [pinchScale],
  );

  const onPinchStateChange = useCallback(
    (event: GestureHandler.PinchGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === GestureHandlerState.ACTIVE) {
        Animated.spring(pinchScale, {
          toValue: 1,
          bounciness: 1,
          useNativeDriver: true,
        }).start();
      }
    },
    [pinchScale],
  );

  return {
    onPinchStateChange,
    onPinchEvent,
    pinchScale,
  };
};
