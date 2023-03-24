import React from 'react';
import {FlatList} from 'react-native';

import * as SchemaTypes from '@schema-types';
import {SectionViewAll} from '@components';

import {ReviewSectionListItem} from './reviews-section-list-item/ReviewSectionListItem';
import {useReviewsSection, REVIEWS_LENGTH} from './useReviewsSection';
import * as Styles from './ReviewsSection.styles';

export type Review =
  | SchemaTypes.TVShowDetail_tvShow_reviews
  | SchemaTypes.MovieDetail_movie_reviews;

type ReviewsSectionProps = {
  onPressViewAll: () => void;
  reviews: Review[];
};

export const ReviewsSection = (props: ReviewsSectionProps) => {
  const reviewSection = useReviewsSection({
    reviewsLength: props.reviews.length,
  });

  return (
    <Styles.ContentWrapper testID="reviews-content-wrapper">
      <SectionViewAll
        sectionTitle={`${reviewSection.texts.section} (${props.reviews.length})`}
        onPressViewAll={props.onPressViewAll}
        withViewAll={!!props.reviews.length}
        id="reviews"
      />
      <FlatList
        onMomentumScrollEnd={reviewSection.onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <ReviewSectionListItem review={item.content} author={item.author} />
        )}
        data={props.reviews.slice(0, REVIEWS_LENGTH)}
        ref={reviewSection.flatListRef}
        testID="reviews-preview-list"
        pagingEnabled
        horizontal
      />
      {props.reviews.length > 1 && (
        <Styles.PaginationWrapper>
          {Array(reviewSection.paginationDotsLenght)
            .fill({})
            .map((_, index) => (
              <Styles.Dot
                isSelected={index === reviewSection.indexReviewSelected}
                testID="dot"
                key={index}>
                {'\u2022'}
              </Styles.Dot>
            ))}
        </Styles.PaginationWrapper>
      )}
    </Styles.ContentWrapper>
  );
};
