import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components';

import SectionViewAll from 'components/common/SectionViewAll';
import {
  TVShowDetail_tvShow_reviews as TVSahowReview,
  MovieDetail_movie_reviews as MovieReview,
} from 'types/schema';

import ReviewSectionListItem from './ReviewSectionListItem';
import useReviewsSection from './useReviewsSection';

interface DotStyleProps {
  readonly isSelected: boolean;
}

const ContentWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  []background-color: ${({ theme }) => theme.colors.secondary};
`;

const Dot = styled(Text)<DotStyleProps>`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.contrast)};
`;

const PaginationWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

type Props = {
  reviews: (TVSahowReview | MovieReview)[];
  onPressViewAll: () => void;
};

const ReviewsSection = ({ onPressViewAll, reviews }: Props) => {
  const {
    indexReviewSelected,
    onMomentumScrollEnd,
    sectionTitle,
    flatListRef,
  } = useReviewsSection();

  return (
    <ContentWrapper
      testID="reviews-content-wrapper"
    >
      <SectionViewAll
        sectionTitle={`${sectionTitle} (${reviews.length})`}
        onPressViewAll={onPressViewAll}
        withViewAll={!!reviews.length}
        id="reviews"
      />
      <FlatList
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ReviewSectionListItem
            review={item.content}
            author={item.author}
          />
        )}
        data={reviews.slice(0, 3)}
        ref={flatListRef}
        pagingEnabled
        horizontal
      />
      {reviews.length > 1 && (
        <PaginationWrapper>
          {Array(Math.min(reviews.length, 3))
            .fill({})
            .map((_, index) => (
              <Dot
                isSelected={index === indexReviewSelected}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {'\u2022'}
              </Dot>
            ))}
        </PaginationWrapper>
      )}
    </ContentWrapper>
  );
};

export default ReviewsSection;
