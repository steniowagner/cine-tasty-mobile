/* eslint-disable react/no-array-index-key */
import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './StarsVotes.styles';
import useStarsVotes from './useStarsVotes';

type StarsVotesProps = {
  textColor?: string;
  withText?: boolean;
  voteCount?: number;
  votes: number;
};

const StarsVotes = (props: StarsVotesProps) => {
  const { numberEmptyStars, numberFullStars, numberHalfStars } = useStarsVotes({
    votes: props.votes,
  });

  const shouldShowVoteCount = props.withText && !!props.voteCount;
  const shouldShowVotes = props.withText && !!props.votes;

  return (
    <Styles.Wrapper>
      {shouldShowVotes && (
        <Styles.VotesText
          textColor={props.textColor}
        >
          {`${props.votes.toFixed(1)} `}
        </Styles.VotesText>
      )}
      <Styles.Wrapper
        testID="stars-wrapper"
      >
        {numberFullStars > 0 && (
          <Styles.Wrapper
            testID="full-stars-wrapper"
          >
            {Array(numberFullStars)
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
        {numberHalfStars > 0 && (
          <Styles.Wrapper
            testID="half-stars-wrapper"
          >
            {Array(numberHalfStars)
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
        {numberEmptyStars > 0 && (
          <Styles.Wrapper
            testID="empty-stars-wrapper"
          >
            {Array(numberEmptyStars)
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
      {shouldShowVoteCount && (
        <Styles.VotesText
          textColor={props.textColor}
        >
          {` (${props.voteCount})`}
        </Styles.VotesText>
      )}
    </Styles.Wrapper>
  );
};

export default StarsVotes;
