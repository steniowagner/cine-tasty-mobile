import {useCallback, useEffect} from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {DEFAULT_MODAL_SHEET_HEIGHT} from './ModalSheet.styles';

type UseModalSheetProps = {
  height?: number;
  onClose: () => void;
  isOpen: boolean;
};

export const useModalSheet = (props: UseModalSheetProps) => {
  const darkLayerOpacity = useSharedValue(0);

  const darkLayerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: darkLayerOpacity.value,
  }));

  const handlePressBackgroundLayer = useCallback(() => {
    props.onClose();
  }, [props.onClose]);

  const handleAnimateDarkLayerOpacity = useCallback(() => {
    const nextDarkLayerOpacity = props.isOpen ? 1 : 0;
    darkLayerOpacity.value = withTiming(nextDarkLayerOpacity, {duration: 700});
  }, [props.isOpen]);

  useEffect(() => {
    handleAnimateDarkLayerOpacity();
  }, [props.isOpen]);

  return {
    height: props.height ?? DEFAULT_MODAL_SHEET_HEIGHT,
    onPressBackgroundLayer: handlePressBackgroundLayer,
    darkLayerAnimatedStyle,
  };
};
