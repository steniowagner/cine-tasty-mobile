import {useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

type UsePopupAdviceProps = {
  onFinishToShow?: () => void;
};

export const usePopupAdvice = (props: UsePopupAdviceProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const onHidePopup = useCallback(() => {
    Animated.timing(opacity, {
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
      toValue: 0,
    }).start(() => props.onFinishToShow && props.onFinishToShow());
  }, [props.onFinishToShow]);

  const onShowPopup = useCallback(() => {
    Animated.timing(opacity, {
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
    opacity,
  };
};
