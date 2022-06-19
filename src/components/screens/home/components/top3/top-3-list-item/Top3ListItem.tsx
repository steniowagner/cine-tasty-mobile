import React from 'react';
import {Animated} from 'react-native';

import {ProgressiveImage, RoundedButton, StarsVotes} from '@components';

import * as LoadingTop3Styles from '../loading-top3/LoadingTop3.styles';
import {useTop3ListItem} from './useTop3ListITem';
import * as Styles from './Top3ListItem.styles';

type Top3ListItemProps = {
  translateY: Animated.AnimatedInterpolation;
  onPress: () => void;
  voteAverage: number;
  voteCount: number;
  genres: string[];
  image: string;
  title: string;
  index: number;
};

export const Top3ListItem = (props: Top3ListItemProps) => {
  const top3ListItem = useTop3ListItem();
  return (
    <Styles.Wrapper
      style={{
        transform: [{translateY: props.translateY}],
      }}
      index={props.index}
      testID="top3-wrapper">
      <ProgressiveImage
        borderRadius={Styles.ITEM_BORDER_RADIUS}
        imageType="backdrop"
        image={props.image}
      />
      <LoadingTop3Styles.SmokeShadow isTheMiddle={false} />
      <Styles.TextContentWrapper>
        <Styles.TitleText testID="top3-title">{props.title}</Styles.TitleText>
        <Styles.StarsWrapper>
          <StarsVotes
            voteCount={props.voteCount}
            votes={props.voteAverage}
            textColor="white"
            withText
          />
        </Styles.StarsWrapper>
        <Styles.GenreText testID="top3-genres">
          {props.genres.join('  \u2022  ')}
        </Styles.GenreText>
        <Styles.LearnMoreButtonWrapper testID="test">
          <RoundedButton
            onPress={props.onPress}
            text={top3ListItem.texts.learnMore}
          />
        </Styles.LearnMoreButtonWrapper>
      </Styles.TextContentWrapper>
    </Styles.Wrapper>
  );
};
