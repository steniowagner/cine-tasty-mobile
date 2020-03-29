import React from 'react';
import { Linking, View, Text } from 'react-native';
import styled from 'styled-components';

import { TextWrapper, Wrapper } from './common-styles';
import DateDiff from './date-diff/DateDiff';
import NewsImage from './news-image/NewsListItemImage';

const SourceText = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const BottomTextContentWrapper = styled(View)`
  width: 70%;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const NewsText = styled(Text)<{ withRTL: boolean }>`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ withRTL }) => (withRTL ? 'right' : 'left')};
`;

export type Props = {
  withRTL: boolean;
  source: string;
  image: string;
  text: string;
  date: string;
  url: string;
};

const NewsListItem = ({
  withRTL, source, image, text, date, url,
}: Props) => (
  <Wrapper
    onPress={() => Linking.openURL(url)}
    testID="news-list-item-wrapper"
  >
    <NewsImage
      image={image}
    />
    <TextWrapper>
      <NewsText
        testID="news-text"
        withRTL={withRTL}
        numberOfLines={3}
      >
        {text}
      </NewsText>
      <BottomTextContentWrapper>
        <SourceText>{`${source}  \u2022`}</SourceText>
        <DateDiff
          now={new Date()}
          date={date}
        />
      </BottomTextContentWrapper>
    </TextWrapper>
  </Wrapper>
);

export default NewsListItem;
