import React from 'react';

import { Typography, SVGIcon } from '@common-components';
import metrics from '@styles/metrics';

import { useStarsVotes } from './use-stars-votes';
import * as Styles from './StarsVotes.styles';

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
        <Typography.SmallText testID="votes-text" color={props.textColor}>
          {starsVotes.votes}
        </Typography.SmallText>
      )}
      <Styles.StarsWrapper testID="stars-wrapper">
        {starsVotes.numberFullStars > 0 && (
          <Styles.Wrapper testID="full-stars-wrapper">
            {Array(starsVotes.numberFullStars)
              .fill({})
              .map((_, index) => (
                <SVGIcon
                  key={`${index}-full-star`}
                  size={metrics.xl}
                  color="primary"
                  id="star-full"
                  style={{
                    marginRight: metrics.xs,
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
                  size={metrics.xl}
                  color="primary"
                  id="star-half"
                  style={{
                    marginRight: metrics.xs,
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
                  size={metrics.xl}
                  color="primary"
                  id="star-empty"
                  style={{
                    marginRight: metrics.xs,
                  }}
                />
              ))}
          </Styles.Wrapper>
        )}
      </Styles.StarsWrapper>
      {starsVotes.shouldShowVoteCount && (
        <Typography.SmallText testID="vote-count" color={props.textColor}>
          {`(${props.voteCount})`}
        </Typography.SmallText>
      )}
    </Styles.Wrapper>
  );
};
