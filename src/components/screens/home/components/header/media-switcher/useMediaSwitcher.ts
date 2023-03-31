import {useCallback, useState, useMemo, useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import metrics from '@styles/metrics';

import {useDefineSwitchers} from './useDefineSwicthers';

const SWITCH_ANIMATION_DURATION_MS = 300;

export type SwitchItem = {
  title: string;
  onPress: () => void;
};

type UseMediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  onPressSwitchMovies: () => void;
  onPresSwitchTVShows: () => void;
};

export const useMediaSwitcher = (props: UseMediaSwitcherProps) => {
  const [switchItemsWidth, setSwitchItemsWidth] = useState<number[]>([
    undefined,
    undefined,
  ]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);
  const switcherPosition = useSharedValue(0);

  const animateSwitcher = useCallback(
    (index: number, onFinishAnimation: () => void) => {
      switcherPosition.value = withTiming(
        index,
        {
          duration: SWITCH_ANIMATION_DURATION_MS,
        },
        (isFinished: boolean) => {
          if (isFinished) {
            runOnJS(setIsSwitching)(false);
            runOnJS(onFinishAnimation)();
          }
        },
      );
    },
    [indexSelected],
  );

  const handlePressSwitcher = useCallback(
    (index: number, onFinishAnimation: () => void) => {
      if (indexSelected === index) {
        return;
      }
      setIndexSelected(index);
      setIsSwitching(true);
      animateSwitcher(index, onFinishAnimation);
    },
    [indexSelected],
  );

  const defineSwitchers = useDefineSwitchers({
    onPressSwitchMovies: props.onPressSwitchMovies,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    onPressSwitcher: handlePressSwitcher,
    switchItemsWidth,
    setSwitchItemsWidth,
    indexSelected,
  });

  const width = useMemo(() => {
    const isSwicthersWidthDefined = switchItemsWidth.every(
      switchItemWidth => typeof switchItemWidth === 'number',
    );
    if (!isSwicthersWidthDefined) {
      return metrics.width;
    }
    return switchItemsWidth.sort((a, b) => b - a)[0];
  }, [switchItemsWidth, defineSwitchers.items]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: width !== metrics.width ? 1 : 0,
    transform: [
      {translateX: interpolate(switcherPosition.value, [0, 1], [0, width])},
    ],
  }));

  useEffect(() => {
    const alreadyCalculatedSwitcherWidth = width !== metrics.width;
    if (alreadyCalculatedSwitcherWidth) {
      props.onCalcuateSwitchWidth();
    }
  }, [width]);

  return {
    items: defineSwitchers.items,
    animatedStyle,
    isSwitching,
    switcherPosition,
    width,
  };
};
