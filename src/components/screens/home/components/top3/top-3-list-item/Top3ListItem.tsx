import React from 'react';
import {SharedValue} from 'react-native-reanimated';

import {ProgressiveImage, RoundedButton, StarsVotes} from '@components';

import {useTop3ListItem} from './useTop3ListItem';
import * as Styles from './Top3ListItem.styles';

type Top3ListItemProps = {
  scrollViewPosition: SharedValue<number>;
  onPress: () => void;
  voteAverage: number;
  voteCount: number;
  genres: string[];
  image: string;
  title: string;
  index: number;
};

export const Top3ListItem = (props: Top3ListItemProps) => {
  const top3ListItem = useTop3ListItem({
    scrollViewPosition: props.scrollViewPosition,
    index: props.index,
  });

  return (
    <Styles.Wrapper
      style={top3ListItem.style}
      index={props.index}
      testID="top3-wrapper">
      <ProgressiveImage
        borderRadius={Styles.ITEM_BORDER_RADIUS}
        imageType="backdrop"
        image={props.image}
      />
      <Styles.SmokeShadow />
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
