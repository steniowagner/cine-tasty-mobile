import { useCallback, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DefaultTheme } from 'styled-components';

export const ANIMATION_DURATION = 100;
export const CALLBACK_DELAY = 1000;

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
      setTimeout(() => {
        callback();
      }, CALLBACK_DELAY);
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

  return {
    tvShowsButtonBackgroudColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.primary, theme.colors.contrast],
    }),
    tvShowsTextColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.buttonText, theme.colors.text],
    }),
    moviesButtonBackgroudColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.contrast, theme.colors.primary],
    }),
    moviesTextColor: switchAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.text, theme.colors.buttonText],
    }),
    onPressTVShows,
    onPressMovies,
    t,
  };
};

export default useMediaSwitcher;
