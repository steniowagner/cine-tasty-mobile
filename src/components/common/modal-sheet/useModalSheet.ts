import {useCallback, useEffect, useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {WRAPPER_HEIGHT as TAB_NAVIGATOR_HEIGHT} from '@routes/components/tab-navigator/TabNavigator.styles';
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
  const [bottomGapSectionHeight, setBottomGapSectionHeight] =
    useState(MAX_CLAMPING);
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

  const handlePressCTAButton = useCallback(() => {
    setBottomGapSectionHeight(0);
    distanceFromTop.value = withTiming(
      dimensions.height + TAB_NAVIGATOR_HEIGHT,
      {duration: CLOSE_MODAL_ANIMATION_DURATION},
      () => runOnJS(props.ctaButtonCallback)(),
    );
  }, [props.ctaButtonCallback]);

  const openModalSheetWithAnimation = useCallback(() => {
    distanceFromTop.value = withSpring(cardInitialPosition, SPRING_CONFIG, () =>
      runOnJS(setBottomGapSectionHeight)(MAX_CLAMPING),
    );
  }, [cardInitialPosition]);

  useEffect(() => {
    if (isOpen) {
      openModalSheetWithAnimation();
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return {
    cardAnimatedStyle: distanceFromTopAnimatedStyle,
    bottomGapSectionHeight,
    darkLayerAnimatedStyle,
    onPressCTAButton: handlePressCTAButton,
    handleGestureEvent,
    cardHeight,
    isOpen,
  };
};
