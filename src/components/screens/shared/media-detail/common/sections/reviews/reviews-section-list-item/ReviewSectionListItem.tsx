import React from 'react';

import * as Styles from './ReviewSectionListItem.styles';

type ReviewSectionListItemProps = {
  review: string;
  author: string;
};

const ReviewSectionListItem = (props: ReviewSectionListItemProps) => (
  <Styles.Wrapper>
    <Styles.AuthorText>{props.author}</Styles.AuthorText>
    <Styles.ReviewText>{props.review}</Styles.ReviewText>
  </Styles.Wrapper>
);

export default ReviewSectionListItem;
