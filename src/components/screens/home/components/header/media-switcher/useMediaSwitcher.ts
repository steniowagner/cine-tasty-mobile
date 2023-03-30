import {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

import metrics from '@styles/metrics';

import {useDefineSwitchers} from './useDefineSwicthers';

export const SWITCH_ANIMATION_DURATION_MS = 300;

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
  const [switchItemsWidth, setSwitchItemsWidth] = useState<number[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);

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

  const defineSwitchers = useDefineSwitchers({
    onPressSwitchMovies: props.onPressSwitchMovies,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    animateSwitcher: onAniamateSwitch,
    switchItemsWidth,
    setSwitchItemsWidth,
    indexSelected,
  });

  const width = useMemo(() => {
    if (switchItemsWidth.length !== defineSwitchers.items.length) {
      return metrics.width;
    }
    let switchItemWidth = 0;
    for (let i = 0; i < switchItemsWidth.length; i += 1) {
      if (switchItemsWidth[i] > switchItemWidth) {
        switchItemWidth = switchItemsWidth[i];
      }
    }
    return switchItemWidth;
  }, [switchItemsWidth, defineSwitchers.items]);

  useEffect(() => {
    if (width !== metrics.width) {
      props.onCalcuateSwitchWidth();
    }
  }, [width]);

  return {
    items: defineSwitchers.items,
    isSwitching,
    translateX,
    width,
  };
};
