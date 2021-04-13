import React from 'react';
import { Animated, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import StarsVotes from '@components/common/stars-votes/StarsVotes';
import RoundedButton from '@components/common/RoundedButton';
import { useGetCurrentTheme } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import {
  ITEM_MARGING_HORIZONTAL,
  ITEM_BORDER_RADIUS,
  SmokeShadow,
  ITEM_WIDTH,
  ITEM_HEIGHT,
} from './commonStyles';

type ItemWrapperStyleProps = {
  isTheMiddle: boolean;
  width: number;
};

type StarsWrapperStyleProps = {
  currentTheme: Types.ThemeId;
};

const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${ITEM_WIDTH}px;
  margin-horizontal: ${({ isTheMiddle }) => (isTheMiddle ? ITEM_MARGING_HORIZONTAL : 0)}px;
  height: ${ITEM_HEIGHT}px;
`;

const TextContentWrapper = styled(View)`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
`;

const StarsWrapper = styled(View)<StarsWrapperStyleProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({ currentTheme, theme }) => (currentTheme === Types.ThemeId.LIGHT ? theme.colors.buttonText : 'transparent')};
  padding: ${({ currentTheme, theme }) => (currentTheme === Types.ThemeId.LIGHT ? theme.metrics.mediumSize : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

const GenreText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;

const LearnMoreButtonWrapper = styled(View)`
  width: 80%;
`;

type Props = {
  translateY: Animated.AnimatedInterpolation;
  isTheMiddle: boolean;
  onPress: () => void;
  voteAverage: number;
  theme: DefaultTheme;
  voteCount: number;
  genres: string[];
  width: number;
  image: string;
  title: string;
};

const Top3ListItem = ({
  isTheMiddle,
  voteAverage,
  translateY,
  voteCount,
  onPress,
  genres,
  width,
  image,
  theme,
  title,
}: Props) => {
  const { currentTheme } = useGetCurrentTheme({ theme });
  const { t } = useTranslation();

  return (
    <Wrapper
      isTheMiddle={isTheMiddle}
      style={{
        transform: [{ translateY }],
      }}
      width={width}
      testID="wrapper"
    >
      <ProgressiveImage
        borderRadius={ITEM_BORDER_RADIUS}
        imageType="backdrop"
        image={image}
      />
      <SmokeShadow
        isTheMiddle={false}
      />
      <TextContentWrapper>
        <TitleText>{title}</TitleText>
        <StarsWrapper
          currentTheme={currentTheme}
        >
          <StarsVotes
            voteCount={voteCount}
            votes={voteAverage}
            textColor="white"
            withText
          />
        </StarsWrapper>
        <GenreText>{genres.join('  \u2022  ')}</GenreText>
        <LearnMoreButtonWrapper
          testID="test"
        >
          <RoundedButton
            onPress={onPress}
            text={t(TRANSLATIONS.HOME_LEARN_MORE)}
          />
        </LearnMoreButtonWrapper>
      </TextContentWrapper>
    </Wrapper>
  );
};

export default withTheme(Top3ListItem);
