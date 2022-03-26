/* eslint-disable camelcase */
import React from 'react';
import {FlatList} from 'react-native';

import {SectionViewAll} from '@components/common';
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

const ReviewsSection = ({onPressViewAll, reviews}: ReviewsSectionProps) => {
  const {indexReviewSelected, onMomentumScrollEnd, sectionTitle, flatListRef} =
    useReviewsSection();

  return (
    <Styles.ContentWrapper testID="reviews-content-wrapper">
      <SectionViewAll
        sectionTitle={`${sectionTitle} (${reviews.length})`}
        onPressViewAll={onPressViewAll}
        withViewAll={!!reviews.length}
        id="reviews"
      />
      <FlatList
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <ReviewSectionListItem review={item.content} author={item.author} />
        )}
        data={reviews.slice(0, 3)}
        ref={flatListRef}
        pagingEnabled
        horizontal
      />
      {reviews.length > 1 && (
        <Styles.PaginationWrapper>
          {Array(Math.min(reviews.length, 3))
            .fill({})
            .map((_, index) => (
              <Styles.Dot
                isSelected={index === indexReviewSelected}
                // eslint-disable-next-line react/no-array-index-key
                key={index}>
                {'\u2022'}
              </Styles.Dot>
            ))}
        </Styles.PaginationWrapper>
      )}
    </Styles.ContentWrapper>
  );
};

export default ReviewsSection;
