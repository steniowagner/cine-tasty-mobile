import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {Animated} from 'react-native';

import {CONSTANTS} from '@utils';

type UseHeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
};

export const useHeader = (props: UseHeaderProps) => {
  const [isSwitchWidthCalculated, setIsSwitchWidthCalculated] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  const onCalcuateSwitchWidth = useCallback(
    () => setIsSwitchWidthCalculated(true),
    [],
  );

  const headerOpacity = useMemo(
    () => (isSwitchWidthCalculated ? opacity : 0),
    [isSwitchWidthCalculated, opacity],
  );

  const animateHeaderOpacity = useCallback(() => {
    const currentOpacity = props.shouldDisableActions ? 0.5 : 1;
    Animated.timing(opacity, {
      duration: CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION,
      toValue: currentOpacity,
      useNativeDriver: true,
    }).start();
  }, [props.shouldDisableActions]);

  useEffect(() => {
    animateHeaderOpacity();
  }, [props.shouldDisableActions]);

  return {
    opacity: headerOpacity,
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    onPressSwitchMovies: props.onPressSwitchMovies,
    onCalcuateSwitchWidth,
  };
};
