import React from 'react';

import metrics from '@styles/metrics';
import {SVGIcon} from '@components';

import * as Styles from './StarsVotes.styles';
import {useStarsVotes} from './useStarsVotes';

type StarsVotesProps = {
  textColor?: string;
  withText?: boolean;
  voteCount?: number;
  votes: number;
};

export const StarsVotes = (props: StarsVotesProps) => {
  const starsVotes = useStarsVotes({
    voteCount: props.voteCount,
    withText: props.withText,
    votes: props.votes,
  });
  return (
    <Styles.Wrapper>
      {starsVotes.shouldShowVotes && (
        <Styles.VotesText testID="votes-text" textColor={props.textColor}>
          {starsVotes.votes}
        </Styles.VotesText>
      )}
      <Styles.Wrapper testID="stars-wrapper">
        {starsVotes.numberFullStars > 0 && (
          <Styles.Wrapper testID="full-stars-wrapper">
            {Array(starsVotes.numberFullStars)
              .fill({})
              .map((_, index) => (
                <SVGIcon
                  key={`${index}-full-star`}
                  size={metrics.extraLargeSize}
                  colorThemeRef="primary"
                  id="star-full"
                  style={{
                    marginRight: metrics.extraSmallSize,
                  }}
                />
              ))}
          </Styles.Wrapper>
        )}
        {starsVotes.numberHalfStars > 0 && (
          <Styles.Wrapper testID="half-stars-wrapper">
            {Array(starsVotes.numberHalfStars)
              .fill({})
              .map((_, index) => (
                <SVGIcon
                  key={`${index}-half-star`}
                  size={metrics.extraLargeSize}
                  colorThemeRef="primary"
                  id="star-half"
                  style={{
                    marginRight: metrics.extraSmallSize,
                  }}
                />
              ))}
          </Styles.Wrapper>
        )}
        {starsVotes.numberEmptyStars > 0 && (
          <Styles.Wrapper testID="empty-stars-wrapper">
            {Array(starsVotes.numberEmptyStars)
              .fill({})
              .map((_, index) => (
                <SVGIcon
                  key={`${index}-empty-star`}
                  size={metrics.extraLargeSize}
                  colorThemeRef="primary"
                  id="star-empty"
                  style={{
                    marginRight: metrics.extraSmallSize,
                  }}
                />
              ))}
          </Styles.Wrapper>
        )}
      </Styles.Wrapper>
      {starsVotes.shouldShowVoteCount && (
        <Styles.VotesText testID="vote-count" textColor={props.textColor}>
          {` (${props.voteCount})`}
        </Styles.VotesText>
      )}
    </Styles.Wrapper>
  );
};
