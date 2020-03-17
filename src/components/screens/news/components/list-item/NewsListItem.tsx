import React from 'react';
import {
  Linking, Image, View, Text,
} from 'react-native';
import styled from 'styled-components';

import {
  DefaultText, TextWrapper, Wrapper, imageWrapper,
} from './common-styles';
import DateDiff from './date-diff/DateDiff';

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

const NewsImage = styled(Image)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  borderradius: ${imageWrapper.borderRadius}px;
`;

type Props = {
  source: string;
  image: string;
  text: string;
  date: string;
  url: string;
};

const NewsListItem = ({
  source, image, text, date, url,
}: Props) => (
  <Wrapper
    testID="news-list-item-wrapper"
    onPress={() => Linking.openURL(url)}
  >
    <NewsImage
      source={{ uri: image }}
    />
    <TextWrapper>
      <DefaultText
        numberOfLines={3}
      >
        {text}
      </DefaultText>
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
