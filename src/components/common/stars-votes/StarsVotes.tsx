/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

import useStarsVotes from './useStarsVotes';

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

const VotesAverageText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
`;

type Props = {
  withText?: boolean;
  votes: number;
};

const StarsVotes = ({ withText, votes }: Props) => {
  const { numberEmptyStars, numberFullStars, numberHalfStars } = useStarsVotes(votes);

  return (
    <Wrapper>
      {withText && <VotesAverageText>{votes}</VotesAverageText>}
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
    </Wrapper>
  );
};

export default StarsVotes;
