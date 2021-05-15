import {
  useCallback, useEffect, useState, useMemo, useRef,
} from 'react';
import { Animated } from 'react-native';
import {
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

export const ANIMATION_TIMING = 400;

type UseCustomizedModalProps = {
  cardContainerHeight: number;
  onClose: () => void;
};

type HookState = {
  onHandlerStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
  animatedEvent: (event: PanGestureHandlerGestureEvent) => void;
  translateY: Animated.Value;
  onCloseModal: () => void;
  shouldHideCard: boolean;
};

const useCustomizedModal = (props: UseCustomizedModalProps): HookState => {
  let offset = 0;

  const translateY = useRef(new Animated.Value(props.cardContainerHeight)).current;

  const [shouldHideCard, setShouldHideCard] = useState<boolean>(false);

  const animatedEvent = useMemo(
    () => Animated.event(
      [
        {
          nativeEvent: {
            translationY: translateY,
          },
        },
      ],
      {
        useNativeDriver: true,
      },
    ),
    [translateY],
  );

  const onAnimateCard = useCallback((toValue: number, callback?: () => void): void => {
    Animated.timing(translateY, {
      duration: toValue === 0 ? ANIMATION_TIMING : ANIMATION_TIMING / 2,
      useNativeDriver: true,
      toValue,
    }).start(callback);
  }, []);

  useEffect(() => {
    onAnimateCard(0);
  }, []);

  const setTranslationValues = useCallback(
    (translationOffset: number, translationValue: number, offsetValue: number): void => {
      translateY.setOffset(translationOffset);
      translateY.setValue(translationValue);
      offset = offsetValue;
    },
    [offset],
  );

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent): void => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        const { translationY } = event.nativeEvent;
        let isFilterOpen = false;

        offset += translationY;

        if (translationY >= props.cardContainerHeight / 2) {
          isFilterOpen = true;
        } else {
          setTranslationValues(0, offset, 0);
        }

        const nextCardPosition = isFilterOpen ? props.cardContainerHeight : 0;

        onAnimateCard(nextCardPosition, () => {
          setTranslationValues(nextCardPosition, 0, nextCardPosition);

          if (isFilterOpen) {
            setShouldHideCard(true);
            props.onClose();
          }
        });
      }
    },
    [props.onClose],
  );

  const onCloseModal = useCallback(() => {
    onAnimateCard(props.cardContainerHeight, () => {
      setShouldHideCard(true);

      props.onClose();
    });
  }, [props.onClose]);

  return {
    onHandlerStateChange,
    shouldHideCard,
    animatedEvent,
    onCloseModal,
    translateY,
  };
};

export default useCustomizedModal;
