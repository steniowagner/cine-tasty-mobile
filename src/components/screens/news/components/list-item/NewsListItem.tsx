import React, { memo } from 'react';
import { Linking, Text } from 'react-native';
import styled from 'styled-components';

import { ThemeId } from 'types';

import { TextWrapper, Wrapper } from './common-styles';
import NewsImage from './news-image/NewsListItemImage';
import DateDiff from './date-diff/DateDiff';

const SourceText = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === ThemeId.DARK ? theme.colors.primary : theme.colors.buttonText)};
`;

const NewsText = styled(Text)<{ withRTL: boolean }>`
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === ThemeId.DARK ? theme.colors.text : theme.colors.subText)};
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
      <SourceText>{source}</SourceText>
      <NewsText
        testID="news-text"
        withRTL={withRTL}
        numberOfLines={3}
      >
        {text}
      </NewsText>
      <DateDiff
        now={new Date()}
        date={date}
      />
    </TextWrapper>
  </Wrapper>
);

export default memo(NewsListItem);
