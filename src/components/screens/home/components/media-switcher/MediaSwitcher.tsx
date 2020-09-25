import React from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import styled, { withTheme, DefaultTheme } from 'styled-components';

import useMediaSwitcher from './useMediaSwitcher';

export const I18N_TV_SHOWS_KEY = 'translations:home:tvShows';
export const I18N_MOVIES_KEY = 'translations:home:movies';

interface OptionButtonStyleProps {
  readonly isRight?: boolean;
  readonly isLeft?: boolean;
}

interface WrapperStyleProps {
  readonly isDisabled: boolean;
}

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const Wrapper = styled(View)<WrapperStyleProps>`
  flex-direction: row;
  align-items: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
`;

const OptionButton = styled(TouchableOpacityAnimated)<OptionButtonStyleProps>`
  border-radius: 4px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  border-top-left-radius: ${({ isLeft, theme }) => (isLeft ? theme.metrics.extraSmallSize : 0)}px;
  border-bottom-left-radius: ${({ isLeft, theme }) => (isLeft ? theme.metrics.extraSmallSize : 0)}px;
  border-top-right-radius: ${({ isRight, theme }) => (isRight ? theme.metrics.extraSmallSize : 0)}px;
  border-bottom-right-radius: ${({ isRight, theme }) => (isRight ? theme.metrics.extraSmallSize : 0)}px;
`;

const OptionText = styled(Animated.Text)`
  text-align: center;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
`;

type Props = {
  onSwitchToTVShows: () => void;
  onSwitchToMovies: () => void;
  theme: DefaultTheme;
  isDisabled: boolean;
};

const MediaSwitcher = ({
  onSwitchToTVShows,
  onSwitchToMovies,
  isDisabled,
  theme,
}: Props) => {
  const {
    tvShowsButtonBackgroudColor,
    moviesButtonBackgroudColor,
    tvShowsTextColor,
    moviesTextColor,
    onPressTVShows,
    onPressMovies,
    t,
  } = useMediaSwitcher({
    onSwitchToTVShows,
    onSwitchToMovies,
    theme,
  });

  return (
    <Wrapper
      testID="media-switcher-wrapper"
      isDisabled={isDisabled}
    >
      <OptionButton
        style={{ backgroundColor: moviesButtonBackgroudColor }}
        testID="media-switcher-movies-button"
        onPress={onPressMovies}
        disabled={isDisabled}
        isLeft
      >
        <OptionText
          testID="media-switcher-movies-text"
          style={{
            color: moviesTextColor,
          }}
        >
          {t(I18N_MOVIES_KEY)}
        </OptionText>
      </OptionButton>
      <OptionButton
        style={{ backgroundColor: tvShowsButtonBackgroudColor }}
        testID="media-switcher-tv-shows-button"
        onPress={onPressTVShows}
        disabled={isDisabled}
        isRight
      >
        <OptionText
          testID="media-switcher-tv-shows-text"
          style={{
            color: tvShowsTextColor,
          }}
        >
          {t(I18N_TV_SHOWS_KEY)}
        </OptionText>
      </OptionButton>
    </Wrapper>
  );
};

export default withTheme(MediaSwitcher);
