import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export const SWITCH_ANIMATION_DURATION_MS = 300;

type UseMediaSwitcherAnimation = {
  setIsSwitching: (isSwitching: boolean) => void;
  setIndexSelected: (index: number) => void;
  indexSelected: number;
};

const useMediaSwitcherAnimation = (props: UseMediaSwitcherAnimation) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onAniamateSwitch = useCallback(
    (index: number, onFinishAnimation: () => void) => {
      if (props.indexSelected === index) {
        return;
      }

      props.setIndexSelected(index);

      props.setIsSwitching(true);

      Animated.timing(translateX, {
        duration: SWITCH_ANIMATION_DURATION_MS,
        useNativeDriver: true,
        toValue: index,
      }).start(() => {
        props.setIsSwitching(false);
        onFinishAnimation();
      });
    },
    [props.indexSelected],
  );

  return {
    onAniamateSwitch,
    translateX,
  };
};

export default useMediaSwitcherAnimation;
