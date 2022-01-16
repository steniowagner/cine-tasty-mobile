import React from 'react';

import * as Styles from './ReviewSectionListItem.styles';

type ReviewSectionListItemProps = {
  review: string;
  author: string;
};

const ReviewSectionListItem = ({ review, author }: ReviewSectionListItemProps) => (
  <Styles.Wrapper>
    <Styles.AuthorText>{author}</Styles.AuthorText>
    <Styles.ReviewText>{review}</Styles.ReviewText>
  </Styles.Wrapper>
);

export default ReviewSectionListItem;
