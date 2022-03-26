import React from 'react';
import {Animated} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DefaultTheme, withTheme} from 'styled-components/native';

import {ProgressiveImage, RoundedButton, StarsVotes} from '@components/common';
import {useGetCurrentTheme} from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

import * as LoadingTop3Styles from '../loading-top3/LoadingTop3.styles';
import * as Styles from './Top3ListItem.styles';

type Top3ListItemProps = {
  translateY: Animated.AnimatedInterpolation;
  onPress: () => void;
  voteAverage: number;
  theme: DefaultTheme;
  voteCount: number;
  genres: string[];
  image: string;
  title: string;
  index: number;
};

const Top3ListItem = ({
  voteAverage,
  translateY,
  voteCount,
  onPress,
  genres,
  index,
  image,
  theme,
  title,
}: Top3ListItemProps) => {
  const {currentTheme} = useGetCurrentTheme({theme});
  const {t} = useTranslation();

  return (
    <Styles.Wrapper
      style={{
        transform: [{translateY}],
      }}
      index={index}
      testID="wrapper">
      <ProgressiveImage
        borderRadius={Styles.ITEM_BORDER_RADIUS}
        imageType="backdrop"
        image={image}
      />
      <LoadingTop3Styles.SmokeShadow isTheMiddle={false} />
      <Styles.TextContentWrapper>
        <Styles.TitleText>{title}</Styles.TitleText>
        <Styles.StarsWrapper currentTheme={currentTheme}>
          <StarsVotes
            voteCount={voteCount}
            votes={voteAverage}
            textColor="white"
            withText
          />
        </Styles.StarsWrapper>
        <Styles.GenreText>{genres.join('  \u2022  ')}</Styles.GenreText>
        <Styles.LearnMoreButtonWrapper testID="test">
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
