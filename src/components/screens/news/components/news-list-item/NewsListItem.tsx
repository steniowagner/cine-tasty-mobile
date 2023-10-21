import React, { memo } from 'react';

import { NewsImage } from './news-image/NewsImage';
import * as Styles from './NewsListItem.styles';
import { DateDiff } from './date-diff/DateDiff';
import { useNewsListItem } from './use-news-list-item';

type NewsListItemProps = {
  source: string;
  image: string;
  text: string;
  date: string;
  url?: string;
};

export const NewsListItem = memo((props: NewsListItemProps) => {
  const newsListItem = useNewsListItem({ url: props.url });

  return (
    <Styles.Wrapper
      onPress={newsListItem.onPress}
      testID="news-list-item-wrapper">
      <NewsImage image={props.image} />
      <Styles.TextWrapper>
        <Styles.SourceText testID="source-text">
          {props.source}
        </Styles.SourceText>
        <Styles.NewsText
          testID="news-text"
          // @ts-ignore ts complaining for no reason
          numberOfLines={3}>
          {props.text}
        </Styles.NewsText>
        <DateDiff now={new Date()} date={props.date} />
      </Styles.TextWrapper>
    </Styles.Wrapper>
  );
});
