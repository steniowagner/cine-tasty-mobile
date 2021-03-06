/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

import useStarsVotes from './useStarsVotes';

interface VotesTextStyleProps {
  readonly textColor?: string;
}

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const VotesText = styled(Text)<VotesTextStyleProps>`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ textColor, theme }) => textColor || theme.colors.text};
  font-family: CircularStd-Medium;
`;

type Props = {
  textColor?: string;
  withText?: boolean;
  voteCount?: number;
  votes: number;
};

const StarsVotes = ({
  textColor, voteCount, withText, votes,
}: Props) => {
  const { numberEmptyStars, numberFullStars, numberHalfStars } = useStarsVotes(votes);

  const shouldShowVoteCount = withText && !!voteCount;
  const shouldShowVotes = withText && !!votes;

  return (
    <Wrapper>
      {shouldShowVotes && (
        <VotesText
          textColor={textColor}
        >
          {`${votes.toFixed(1)} `}
        </VotesText>
      )}
      <Wrapper
        testID="stars-wrapper"
      >
        {numberFullStars > 0 && (
          <Wrapper
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
          </Wrapper>
        )}
        {numberHalfStars > 0 && (
          <Wrapper
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
          </Wrapper>
        )}
        {numberEmptyStars > 0 && (
          <Wrapper
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
          </Wrapper>
        )}
      </Wrapper>
      {shouldShowVoteCount && (
        <VotesText
          textColor={textColor}
        >
          {` (${voteCount})`}
        </VotesText>
      )}
    </Wrapper>
  );
};

export default StarsVotes;
