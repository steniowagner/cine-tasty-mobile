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

const NewsListItem = (props: NewsListItemProps) => (
  <Styles.Wrapper
    onPress={() => Linking.openURL(props.url)}
    testID="news-list-item-wrapper">
    <NewsImage image={props.image} />
    <Styles.TextWrapper>
      <Styles.SourceText>{props.source}</Styles.SourceText>
      <Styles.NewsText
        testID="news-text"
        withRTL={props.withRTL}
        numberOfLines={3}>
        {props.text}
      </Styles.NewsText>
      <DateDiff now={new Date()} date={props.date} />
    </Styles.TextWrapper>
  </Styles.Wrapper>
);

export default memo(NewsListItem);
