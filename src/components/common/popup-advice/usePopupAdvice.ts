import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

type UsePopupAdviceProps = {
  onFinishToShow?: () => void;
};

const usePopupAdvice = ({ onFinishToShow = () => {} }: UsePopupAdviceProps) => {
  const wrapperOpacity = useRef(new Animated.Value(0)).current;

  const onHidePopup = useCallback(() => {
    Animated.timing(wrapperOpacity, {
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
      toValue: 0,
    }).start(onFinishToShow);
  }, []);

  const onShowPopup = useCallback(() => {
    Animated.timing(wrapperOpacity, {
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
      toValue: 1,
    }).start(() => {
      setTimeout(() => {
        onHidePopup();
      }, HIDE_POPUP_DELAY);
    });
  }, []);

  useEffect(() => {
    onShowPopup();
  }, []);

  return {
    wrapperOpacity,
  };
};

export default usePopupAdvice;
