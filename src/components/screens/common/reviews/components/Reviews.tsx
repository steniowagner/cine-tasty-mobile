import React from 'react';
import {View} from 'react-native';

import {MediaItemDescription} from '@components';

import {ReviewsNavigationProps} from '../routes/route-params-types';
import * as Styles from './Reviews.styles';
import {useReviews} from './useReviews';

export const Reviews = (props: ReviewsNavigationProps) => {
  const reviews = useReviews();

  if (!props.route.params) {
    return (
      <Styles.ScrollWrapper>
        <Styles.ReviewsText testID="reviews-text">
          {reviews.texts.reviews}
        </Styles.ReviewsText>
      </Styles.ScrollWrapper>
    );
  }

  return (
    <Styles.ScrollWrapper>
      <Styles.ReviewsText testID="reviews-text">
        {reviews.texts.reviews}
      </Styles.ReviewsText>
      {props.route.params.reviews.map((review, index) => (
        <View testID="review-wrapper" key={`${review.author}-${index}`}>
          <Styles.ContentWrapper>
            <Styles.AuthorText testID="review-author">
              {review.author}
            </Styles.AuthorText>
            <MediaItemDescription description={review.content} />
          </Styles.ContentWrapper>
          {index < props.route.params.reviews.length - 1 && (
            <Styles.Separator testID="separator" />
          )}
        </View>
      ))}
    </Styles.ScrollWrapper>
  );
};
