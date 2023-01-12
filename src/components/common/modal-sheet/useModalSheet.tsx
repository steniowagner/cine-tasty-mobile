import {useCallback, useEffect} from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useAnimateDarkLayerOpacity} from './useAnimateDarkLayerOpacity';
import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';

type UseModalSheetProps = {
  height?: number;
  onClose: () => void;
  isOpen: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const animateDarkLayerOpacity = useAnimateDarkLayerOpacity({
    onClose: props.onClose,
    isOpen: props.isOpen,
  });

  return {
    height: props.height ?? DEFAULT_MODAL_SHEET_HEIGHT,
    onPressBackgroundLayer: animateDarkLayerOpacity.onPressBackgroundLayer,
    darkLayerAnimatedStyle: animateDarkLayerOpacity.darkLayerAnimatedStyle,
  };
};
