import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  withTiming,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

import { WRAPPER_HEIGHT as WRAPPER_HEIGHT } from '@/navigation/components/tab-navigator/TabNavigator.styles';
import metrics from '@styles/metrics';

import { DEFAULT_MODAL_SHEET_HEIGHT } from './ModalSheet.styles';
import { useGestureEvents } from './use-gesture-events';

export const MAX_CLAMPING = metrics.getWidthFromDP('8');

const DARK_LAYER_OPACITY_ANIMATION_DURATION = 50;
const CLOSE_MODAL_ANIMATION_DURATION = 300;

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  stiffness: 500,
};

type UseModalSheetProps = {
  onPressCTAButton?: () => unknown;
  forceClose?: boolean;
  onCloseForcibly?: () => void;
  height?: number;
  onClose: () => void;
  isOpen: boolean;
};

export const useModalSheet = ({
  onCloseForcibly = () => {},
  ...props
}: UseModalSheetProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

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

  // needed to copy dark-layer animation instead of reuse it, since use the same animation
  // with two components that are totally different can cause some weird-behaviors
  const bottomGapAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(
        distanceFromTop.value,
        [dimensions.height - 1.5 * MAX_CLAMPING, cardInitialPosition],
        [0, 1],
        Extrapolate.CLAMP,
      ),
      { duration: DARK_LAYER_OPACITY_ANIMATION_DURATION },
    );
    return {
      opacity,
    };
  });

  const darkLayerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(
        distanceFromTop.value,
        [dimensions.height - 1.5 * MAX_CLAMPING, cardInitialPosition],
        [0, 1],
        Extrapolate.CLAMP,
      ),
      { duration: DARK_LAYER_OPACITY_ANIMATION_DURATION },
    );
    return {
      opacity,
    };
  });

  const handleGestureEvent = useGestureEvents({
    distanceFromTop,
    cardInitialPosition,
    cardHeight,
    windowHeight: dimensions.height,
    onClose: props.onClose,
    maxClamping: MAX_CLAMPING,
  });

  const distanceFromTopAnimatedStyle = useAnimatedStyle(() => ({
    top: withSpring(distanceFromTop.value, SPRING_CONFIG),
  }));

  const closeModal = useCallback((callback = () => {}) => {
    distanceFromTop.value = withTiming(
      dimensions.height + WRAPPER_HEIGHT,
      { duration: CLOSE_MODAL_ANIMATION_DURATION },
      () => runOnJS(callback)(),
    );
  }, []);

  const handlePressCTAButton = useCallback(() => {
    closeModal(props.onPressCTAButton);
  }, [props.onPressCTAButton]);

  const openModal = useCallback(() => {
    distanceFromTop.value = withSpring(cardInitialPosition, SPRING_CONFIG);
  }, [cardInitialPosition]);

  useEffect(() => {
    if (internalIsOpen) {
      openModal();
    }
  }, [internalIsOpen]);

  const handleForceClose = useCallback(() => {
    if (props.forceClose === false) {
      setInternalIsOpen(props.isOpen);
    }
    if (props.forceClose === true && !props.isOpen) {
      closeModal(() => {
        onCloseForcibly();
        setInternalIsOpen(false);
      });
    }
  }, [onCloseForcibly, props.isOpen, props.forceClose]);

  useEffect(() => {
    if (props.forceClose === undefined) {
      return setInternalIsOpen(props.isOpen);
    }
    handleForceClose();
  }, [props.isOpen, props.forceClose]);

  return {
    cardAnimatedStyle: distanceFromTopAnimatedStyle,
    onPressCTAButton: handlePressCTAButton,
    darkLayerAnimatedStyle,
    bottomGapAnimatedStyle,
    handleGestureEvent,
    internalIsOpen,
    cardHeight,
  };
};
