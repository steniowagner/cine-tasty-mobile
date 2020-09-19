import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import useMediaSwitcher from './useMediaSwitcher';

export const I18N_TV_SHOWS_KEY = 'translations:home:tvShows';
export const I18N_MOVIES_KEY = 'translations:home:movies';

interface OptionButtonStyleProps {
  readonly isSelected: boolean;
  readonly isRight?: boolean;
  readonly isLeft?: boolean;
}

interface OptionTextStyleProps {
  readonly isSelected: boolean;
}

interface WrapperStyleProps {
  readonly isDisabled: boolean;
}

const Wrapper = styled(View)<WrapperStyleProps>`
  flex-direction: row;
  align-items: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
`;

const OptionButton = styled(TouchableOpacity)<OptionButtonStyleProps>`
  border-radius: 4px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.contrast)};
  border-top-left-radius: ${({ isLeft, theme }) => (isLeft ? theme.metrics.extraSmallSize : 0)}px;
  border-bottom-left-radius: ${({ isLeft, theme }) => (isLeft ? theme.metrics.extraSmallSize : 0)}px;
  border-top-right-radius: ${({ isRight, theme }) => (isRight ? theme.metrics.extraSmallSize : 0)}px;
  border-bottom-right-radius: ${({ isRight, theme }) => (isRight ? theme.metrics.extraSmallSize : 0)}px;
`;

const OptionText = styled(Text)<OptionTextStyleProps>`
  text-align: center;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  color: ${({ isSelected, theme }) => (isSelected ? '#262626' : theme.colors.text)};
`;

type Props = {
  onSwitchToTVShows: () => void;
  onSwitchToMovies: () => void;
  isDisabled: boolean;
};

const MediaSwitcher = ({ onSwitchToTVShows, onSwitchToMovies, isDisabled }: Props) => {
  const {
    isMovieSelected, onPressTVShows, onPressMovies, t,
  } = useMediaSwitcher({
    onSwitchToTVShows,
    onSwitchToMovies,
  });

  return (
    <Wrapper
      testID="media-switcher-wrapper"
      isDisabled={isDisabled}
    >
      <OptionButton
        testID="media-switcher-movies-button"
        isSelected={isMovieSelected}
        onPress={onPressMovies}
        disabled={isDisabled}
        isLeft
      >
        <OptionText
          testID="media-switcher-movies-text"
          isSelected={isMovieSelected}
        >
          {t(I18N_MOVIES_KEY)}
        </OptionText>
      </OptionButton>
      <OptionButton
        testID="media-switcher-tv-shows-button"
        isSelected={!isMovieSelected}
        onPress={onPressTVShows}
        disabled={isDisabled}
        isRight
      >
        <OptionText
          testID="media-switcher-tv-shows-text"
          isSelected={!isMovieSelected}
        >
          {t(I18N_TV_SHOWS_KEY)}
        </OptionText>
      </OptionButton>
    </Wrapper>
  );
};

export default MediaSwitcher;
