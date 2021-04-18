import React from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, withTheme } from 'styled-components';

import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import RoundedButton from '@components/common/rounded-button/RoundedButton';
import StarsVotes from '@components/common/stars-votes/StarsVotes';
import { useGetCurrentTheme } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import * as LoadingTop3Styles from '../LoadingTop3.styles';
import * as Styles from './Top3ListItem.styles';

type Top3ListItemProps = {
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
}: Top3ListItemProps) => {
  const { currentTheme } = useGetCurrentTheme({ theme });
  const { t } = useTranslation();

  return (
    <Styles.Wrapper
      isTheMiddle={isTheMiddle}
      style={{
        transform: [{ translateY }],
      }}
      width={width}
      testID="wrapper"
    >
      <ProgressiveImage
        borderRadius={LoadingTop3Styles.ITEM_BORDER_RADIUS}
        imageType="backdrop"
        image={image}
      />
      <LoadingTop3Styles.SmokeShadow
        isTheMiddle={false}
      />
      <Styles.TextContentWrapper>
        <Styles.TitleText>{title}</Styles.TitleText>
        <Styles.StarsWrapper
          currentTheme={currentTheme}
        >
          <StarsVotes
            voteCount={voteCount}
            votes={voteAverage}
            textColor="white"
            withText
          />
        </Styles.StarsWrapper>
        <Styles.GenreText>{genres.join('  \u2022  ')}</Styles.GenreText>
        <Styles.LearnMoreButtonWrapper
          testID="test"
        >
          <RoundedButton
            onPress={onPress}
            text={t(TRANSLATIONS.HOME_LEARN_MORE)}
          />
        </Styles.LearnMoreButtonWrapper>
      </Styles.TextContentWrapper>
    </Styles.Wrapper>
  );
};

export default withTheme(Top3ListItem);
