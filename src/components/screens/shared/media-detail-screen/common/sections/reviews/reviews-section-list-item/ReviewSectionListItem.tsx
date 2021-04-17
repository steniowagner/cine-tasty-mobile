import React from 'react';

import * as Styles from './ReviewSectionListItem.styles';

type Props = {
  review: string;
  author: string;
};

const ReviewSectionListItem = ({ review, author }: Props) => (
  <Styles.Wrapper>
    <Styles.AuthorText>{author}</Styles.AuthorText>
    <Styles.ReviewText>{review}</Styles.ReviewText>
  </Styles.Wrapper>
);

export default ReviewSectionListItem;
