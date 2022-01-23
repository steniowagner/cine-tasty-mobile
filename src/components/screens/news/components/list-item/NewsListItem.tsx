import React, {memo} from 'react';
import {Linking} from 'react-native';

import NewsImage from './news-image/NewsImage';
import * as Styles from './NewsListItem.styles';
import DateDiff from './date-diff/DateDiff';

type NewsListItemProps = {
  withRTL: boolean;
  source: string;
  image: string;
  text: string;
  date: string;
  url: string;
};

const NewsListItem = ({
  withRTL,
  source,
  image,
  text,
  date,
  url,
}: NewsListItemProps) => (
  <Styles.Wrapper
    onPress={() => Linking.openURL(url)}
    testID="news-list-item-wrapper">
    <NewsImage image={image} />
    <Styles.TextWrapper>
      <Styles.SourceText>{source}</Styles.SourceText>
      <Styles.NewsText testID="news-text" withRTL={withRTL} numberOfLines={3}>
        {text}
      </Styles.NewsText>
      <DateDiff now={new Date()} date={date} />
    </Styles.TextWrapper>
  </Styles.Wrapper>
);

export default memo(NewsListItem);
