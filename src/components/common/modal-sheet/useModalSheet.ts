import {useCallback, useEffect, useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import metrics from '@styles/metrics';

import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';
import {useGestureEvents} from './useGestureEvents';
import {useDarkLayerAnimatedStyle} from './useDarkLayerAnimatedStyle';

export const MAX_CLAMPING = metrics.getWidthFromDP('8%');

const CLOSE_MODAL_ANIMATION_DURATION = 300;

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  stiffness: 500,
};

type UseModalSheetProps = {
  ctaButtonCallback?: () => unknown;
  height?: number;
  onClose: () => void;
  isOpen?: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const darkLayerAnimatedStyle = useDarkLayerAnimatedStyle({
    distanceFromTop,
    cardInitialPosition,
    windowHeight: dimensions.height,
    maxClamping: MAX_CLAMPING,
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

  const openModalSheetWithAnimation = useCallback(() => {
    distanceFromTop.value = withSpring(cardInitialPosition, SPRING_CONFIG);
  }, [cardInitialPosition]);

  const closeModalSheetWithAnimation = useCallback(() => {
    distanceFromTop.value = withTiming(
      dimensions.height,
      {duration: CLOSE_MODAL_ANIMATION_DURATION},
      () => runOnJS(props.onClose)(),
    );
  }, [props.onClose]);

  const handleAnimateDistanceFromTop = useCallback(
    () =>
      isOpen ? openModalSheetWithAnimation() : closeModalSheetWithAnimation(),
    [openModalSheetWithAnimation, closeModalSheetWithAnimation, isOpen],
  );

  useEffect(() => {
    handleAnimateDistanceFromTop();
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return {
    cardAnimatedStyle: distanceFromTopAnimatedStyle,
    bottomGapSectionHeight: MAX_CLAMPING,
    darkLayerAnimatedStyle,
    onPressCTAButton: () => setIsOpen(false),
    handleGestureEvent,
    cardHeight,
    isOpen,
  };
};
