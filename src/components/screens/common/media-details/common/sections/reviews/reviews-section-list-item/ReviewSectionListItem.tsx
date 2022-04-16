import React from 'react';

import * as Styles from './ReviewSectionListItem.styles';

type ReviewSectionListItemProps = {
  review: string;
  author: string;
};

export const ReviewSectionListItem = (props: ReviewSectionListItemProps) => (
  <Styles.Wrapper testID="reviews-section-list-item-wrapper">
    <Styles.AuthorText testID="reviews-section-list-item-author">
      {props.author}
    </Styles.AuthorText>
    <Styles.ReviewText testID="reviews-section-list-item-review">
      {props.review}
    </Styles.ReviewText>
  </Styles.Wrapper>
);
