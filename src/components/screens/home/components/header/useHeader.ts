import {useCallback, useState, useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {CONSTANTS} from '@utils';

type UseHeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
};

export const useHeader = (props: UseHeaderProps) => {
  const [isSwitchWidthCalculated, setIsSwitchWidthCalculated] = useState(false);

  const opacity = useSharedValue(0);

  const onCalculateSwitchWidth = useCallback(
    () => setIsSwitchWidthCalculated(true),
    [],
  );

  const animateHeaderOpacity = useCallback((toValue: number) => {
    opacity.value = withTiming(toValue, {
      duration: CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION,
    });
  }, []);

  const handleOnChangeShouldDisableActions = useCallback(() => {
    if (!isSwitchWidthCalculated) {
      return;
    }
    setTimeout(() => {
      const toValue = props.shouldDisableActions ? 0.5 : 1;
      animateHeaderOpacity(toValue);
    }, CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION);
  }, [props.shouldDisableActions, isSwitchWidthCalculated]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    handleOnChangeShouldDisableActions();
  }, [props.shouldDisableActions]);

  return {
    onPresSwitchTVShows: props.onPresSwitchTVShows,
    onPressSwitchMovies: props.onPressSwitchMovies,
    onCalculateSwitchWidth,
    animatedStyles,
  };
};
