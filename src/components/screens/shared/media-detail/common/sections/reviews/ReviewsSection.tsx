/* eslint-disable camelcase */
import React from 'react';
import { FlatList } from 'react-native';

import SectionViewAll from '@components/common/section-view-all/SectionViewAll';
import * as SchemaTypes from '@schema-types';

import ReviewSectionListItem from './reviews-section-list-item/ReviewSectionListItem';
import useReviewsSection from './useReviewsSection';
import * as Styles from './ReviewsSection.styles';

type ReviewsSectionProps = {
  reviews: (
    | SchemaTypes.TVShowDetail_tvShow_reviews
    | SchemaTypes.MovieDetail_movie_reviews
  )[];
  onPressViewAll: () => void;
};

const ReviewsSection = (props: ReviewsSectionProps) => {
  const reviewsSection = useReviewsSection();

  return (
    <Styles.ContentWrapper
      testID="reviews-content-wrapper"
    >
      <SectionViewAll
        sectionTitle={`${reviewsSection.sectionTitle} (${props.reviews.length})`}
        onPressViewAll={props.onPressViewAll}
        withViewAll={!!props.reviews.length}
        id="reviews"
      />
      <FlatList
        onMomentumScrollEnd={reviewsSection.onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ReviewSectionListItem
            review={item.content}
            author={item.author}
          />
        )}
        data={props.reviews.slice(0, 3)}
        ref={reviewsSection.flatListRef}
        pagingEnabled
        horizontal
      />
      {props.reviews.length > 1 && (
        <Styles.PaginationWrapper>
          {Array(Math.min(props.reviews.length, 3))
            .fill({})
            .map((_, index) => (
              <Styles.Dot
                isSelected={index === reviewsSection.indexReviewSelected}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {'\u2022'}
              </Styles.Dot>
            ))}
        </Styles.PaginationWrapper>
      )}
    </Styles.ContentWrapper>
  );
};

export default ReviewsSection;
