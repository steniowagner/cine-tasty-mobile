import {useCallback, useEffect, useMemo, useState} from 'react';

import {useAnimateDarkLayerOpacity} from './useAnimateDarkLayerOpacity';
import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';
import {
  useAnimateModalDistanceFromTop,
  MAX_CLAMPING,
} from './useAnimateModalDistanceFromTop';

const TIMEOUT_TO_CLOSE_MODAL = 1000;

type UseModalSheetProps = {
  height?: number;
  onClose: () => void;
  isOpen: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      props.onClose();
    }, TIMEOUT_TO_CLOSE_MODAL);
  }, [props.onClose]);

  const cardHeight = useMemo(
    () => props.height ?? DEFAULT_MODAL_SHEET_HEIGHT,
    [props.height],
  );

  const animateDarkLayerOpacity = useAnimateDarkLayerOpacity({
    isOpen,
  });

  const animateModalDistanceFromTop = useAnimateModalDistanceFromTop({
    closeModal: handleCloseModal,
    cardHeight,
    isOpen,
  });

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return {
    cardAnimatedStyle: animateModalDistanceFromTop.animatedStyle,
    handleGestureEvent: animateModalDistanceFromTop.handleGestureEvent,
    darkLayerAnimatedStyle: animateDarkLayerOpacity.animatedStyle,
    height: cardHeight + Math.abs(MAX_CLAMPING),
  };
};
