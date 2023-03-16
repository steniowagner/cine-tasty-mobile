import React from 'react';
import {StarsVotes} from '../stars-votes/StarsVotes';

import * as Styles from './MediaHeadline.styles';

type MediaHeadlineProps = {
  title: string;
  voteCount: number;
  voteAverage: number;
  tags?: string[];
};

export const MediaHeadline = (props: MediaHeadlineProps) => (
  <Styles.Wrapper>
    <Styles.TitleText testID="media-headline-title">
      {props.title}
    </Styles.TitleText>
    <Styles.StarsWrapper
      testID="media-headline-stars-wrapper"
      hasTags={props.tags && !!props.tags.length}>
      <StarsVotes
        voteCount={props.voteCount}
        votes={props.voteAverage}
        textColor="white"
        withText
      />
    </Styles.StarsWrapper>
    {props.tags && (
      <Styles.GenreText testID="media-headline-genres">
        {props.tags.join('  \u2022  ')}
      </Styles.GenreText>
    )}
  </Styles.Wrapper>
);
