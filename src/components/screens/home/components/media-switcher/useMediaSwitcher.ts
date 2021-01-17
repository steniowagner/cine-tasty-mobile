import {
  useCallback, useState, useMemo, useRef,
} from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

export const ANIMATION_DURATION = 100;

type State = {
  tvShowsButtonBackgroudColor: Animated.AnimatedInterpolation;
  moviesButtonBackgroudColor: Animated.AnimatedInterpolation;
  tvShowsTextColor: Animated.AnimatedInterpolation;
  moviesTextColor: Animated.AnimatedInterpolation;
  onPressTVShows: () => void;
  t: (key: string) => string;
  onPressMovies: () => void;
};

type Props = {
  onSwitchToTVShows: () => void;
  onSwitchToMovies: () => void;
  theme: DefaultTheme;
};

const useMediaSwitcher = ({
  onSwitchToTVShows,
  onSwitchToMovies,
  theme,
}: Props): State => {
  const [isMovieSelected, setIsMovieSelected] = useState<boolean>(true);
  const switchAnimatedValue = useRef(new Animated.Value(1)).current;

  const { t } = useTranslation();

  const animateSwitch = useCallback((toValue: number, callback: () => void): void => {
    Animated.timing(switchAnimatedValue, {
      duration: ANIMATION_DURATION,
      toValue,
    }).start(() => {
      callback();
    });
  }, []);

  const onPressMovies = useCallback(() => {
    if (isMovieSelected) {
      return;
    }

    setIsMovieSelected(true);

    animateSwitch(1, onSwitchToMovies);
  }, [isMovieSelected]);

  const onPressTVShows = useCallback(() => {
    if (!isMovieSelected) {
      return;
    }

    setIsMovieSelected(false);

    animateSwitch(0, onSwitchToTVShows);
  }, [isMovieSelected]);

  const tvShowsButtonBackgroudColorOutputRange = useMemo(() => {
    if (theme.id === ThemeId.DARK) {
      return [theme.colors.primary, theme.colors.contrast];
    }

    return [theme.colors.primary, theme.colors.fallbackImageBackground];
  }, [theme]);

  const moviesButtonBackgroudColorOutputRange = useMemo(() => {
    if (theme.id === ThemeId.DARK) {
      return [theme.colors.contrast, theme.colors.primary];
    }

    return [theme.colors.fallbackImageBackground, theme.colors.primary];
  }, [theme]);

  return {
    tvShowsButtonBackgroudColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: tvShowsButtonBackgroudColorOutputRange,
    }),
    tvShowsTextColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.buttonText, theme.colors.inactiveWhite],
    }),
    moviesButtonBackgroudColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: moviesButtonBackgroudColorOutputRange,
    }),
    moviesTextColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.inactiveWhite, theme.colors.buttonText],
    }),
    onPressTVShows,
    onPressMovies,
    t,
  };
};

export default useMediaSwitcher;
