import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const AuthorText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const ReviewText = styled(Text).attrs({
  numberOfLines: 4,
})`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
  review: string;
  author: string;
};

const ReviewSectionListItem = ({ review, author }: Props) => (
  <Wrapper>
    <AuthorText>{author}</AuthorText>
    <ReviewText>{review}</ReviewText>
  </Wrapper>
);

export default ReviewSectionListItem;
