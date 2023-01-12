import {useCallback, useEffect, useMemo, useState} from 'react';

import {useAnimateDarkLayerOpacity} from './useAnimateDarkLayerOpacity';
import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';
import {
  useAnimateModalDistanceFromTop,
  MAX_CLAMPING,
} from './useAnimateModalDistanceFromTop';

type UseModalSheetProps = {
  height?: number;
  onClose: () => void;
  isOpen: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const cardHeight = useMemo(
    () => props.height ?? DEFAULT_MODAL_SHEET_HEIGHT,
    [props.height],
  );

  const animateModalDistanceFromTop = useAnimateModalDistanceFromTop({
    closeModal: props.onClose,
    cardHeight,
    isOpen: props.isOpen,
  });

  return {
    cardAnimatedStyle: animateModalDistanceFromTop.animatedStyle,
    handleGestureEvent: animateModalDistanceFromTop.handleGestureEvent,
    darkLayerAnimatedStyle: animateModalDistanceFromTop.darkLayerAnimatedStyle,
    height: cardHeight + MAX_CLAMPING,
  };
};
