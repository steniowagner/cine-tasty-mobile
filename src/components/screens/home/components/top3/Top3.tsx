import React from 'react';
import Animated from 'react-native-reanimated';

import * as Types from '@local-types';

import {Top3ListItem} from './top-3-list-item/Top3ListItem';
import * as Styles from './Top3.styles';
import {useTop3} from './useTop3';

export type Top3Props = {
  items: Types.HomeTop3Item[];
};

export const Top3 = (props: Top3Props) => {
  const top3List = useTop3();

  return (
    <Styles.ListWrapper>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={top3List.handleScroll}
        contentOffset={{x: Styles.SCROLL_CONTENT_OFFSET, y: 0}}
        snapToInterval={Styles.SNAP_INTERVAL}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        snapToAlignment="start"
        testID="top3-list"
        bounces={false}
        pagingEnabled
        horizontal>
        {props.items.map((item, index) => (
          <Top3ListItem
            key={item.id}
            scrollViewPosition={top3List.scrollViewPosition}
            onPress={item.onPress}
            voteAverage={item.voteAverage}
            voteCount={item.voteCount}
            genres={item.genreIds}
            image={item.posterPath}
            title={item.title}
            index={index}
          />
        ))}
      </Animated.ScrollView>
    </Styles.ListWrapper>
  );
};
