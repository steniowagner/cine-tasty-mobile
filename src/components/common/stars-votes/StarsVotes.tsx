/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

import useStarsVotes from './useStarsVotes';

interface VotesTextStyleProps {
  readonly textColor?: string;
}

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const FullStarIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.extraLargeSize,
  color: '#FFD700',
  name: 'star',
}))`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const HalfStarIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.extraLargeSize,
  color: '#FFD700',
  name: 'star-half',
}))`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const EmptyStarIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.extraLargeSize,
  color: '#FFD700',
  name: 'star-outline',
}))`
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const VotesText = styled(Text)<VotesTextStyleProps>`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
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
        {votes.toFixed(1)}
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
              .map((fullStar, index) => (
                <FullStarIcon
                  key={`${index}-full-star`}
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
              .map((halfStar, index) => (
                <HalfStarIcon
                  key={`${index}-half-star`}
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
              .map((emptyStar, index) => (
                <EmptyStarIcon
                  key={`${index}-empty-star`}
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
