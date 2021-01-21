import React, { memo } from 'react';
import { Linking, View, Text } from 'react-native';
import styled from 'styled-components';

import { ThemeId } from 'types';

import { TextWrapper, Wrapper } from './common-styles';
import NewsImage from './news-image/NewsListItemImage';
import DateDiff from './date-diff/DateDiff';

const SourceText = styled(Text).attrs({
  numberOfLines: 1,
})`
  max-width: 80%;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const BottomTextContentContainer = styled(View)`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const BottomTextContentWrapper = styled(View)`
  flex-direction: row;
  padding: ${({ theme }) => (theme.id === ThemeId.LIGHT ? theme.metrics.smallSize : 0)}px;
  background-color: ${({ theme }) => (theme.id === ThemeId.LIGHT ? theme.colors.buttonText : 'transparent')};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
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
      <BottomTextContentContainer>
        <BottomTextContentWrapper>
          <SourceText>{`${source}  \u2022  `}</SourceText>
          <DateDiff
            now={new Date()}
            date={date}
          />
        </BottomTextContentWrapper>
      </BottomTextContentContainer>
    </TextWrapper>
  </Wrapper>
);

export default memo(NewsListItem);
