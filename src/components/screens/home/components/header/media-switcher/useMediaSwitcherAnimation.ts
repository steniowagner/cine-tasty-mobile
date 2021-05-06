import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export const SWITCH_ANIMATION_DURATION_MS = 300;

type UseMediaSwitcherAnimation = {
  setIsSwitching: (isSwitching: boolean) => void;
  setIndexSelected: (index: number) => void;
  indexSelected: number;
};

const useMediaSwitcherAnimation = ({
  setIndexSelected,
  setIsSwitching,
  indexSelected,
}: UseMediaSwitcherAnimation) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onAniamateSwitch = useCallback(
    (index: number, onFinishAnimation: () => void) => {
      if (indexSelected === index) {
        return;
      }

      setIndexSelected(index);

      setIsSwitching(true);

      Animated.timing(translateX, {
        duration: SWITCH_ANIMATION_DURATION_MS,
        useNativeDriver: true,
        toValue: index,
      }).start(() => {
        setIsSwitching(false);
        onFinishAnimation();
      });
    },
    [indexSelected],
  );

  return {
    onAniamateSwitch,
    translateX,
  };
};

export default useMediaSwitcherAnimation;
