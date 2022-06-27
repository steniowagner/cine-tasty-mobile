import React, {Fragment, useRef} from 'react';
import {Animated} from 'react-native';

import * as Types from '@local-types';

import * as Top3ListItemStyles from './top-3-list-item/Top3ListItem.styles';
import {Top3ListItem} from './top-3-list-item/Top3ListItem';
import * as Styles from './Top3.styles';

export type Top3Props = {
  items: Types.HomeTop3Item[];
};

export const Top3 = (props: Top3Props) => {
  const scrollX = useRef(
    new Animated.Value(Styles.INITIAL_SCROLL_POSITION),
  ).current;
  return (
    <Styles.ListWrapper>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        contentOffset={{x: Styles.SCROLL_CONTENT_OFFSET, y: 0}}
        snapToInterval={Styles.SNAP_INTERVAL}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        snapToAlignment="start"
        testID="top3-list"
        bounces={false}
        pagingEnabled
        horizontal>
        {props.items.map((item, index) => {
          const translateY = scrollX.interpolate({
            inputRange: [
              (index - 1) * Top3ListItemStyles.ITEM_WIDTH,
              index * Top3ListItemStyles.ITEM_WIDTH,
              (index + 1) * Top3ListItemStyles.ITEM_WIDTH,
            ],
            outputRange: [
              Top3ListItemStyles.ITEM_MARGING_TOP,
              0,
              Top3ListItemStyles.ITEM_MARGING_TOP,
            ],
            extrapolate: 'clamp',
          });
          return (
            <Fragment key={item.id}>
              {index === 0 && <Styles.ListGap />}
              <Top3ListItem
                onPress={item.onPress}
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                translateY={translateY}
                genres={item.genreIds}
                image={item.posterPath}
                title={item.title}
                index={index}
              />
              {index === 2 && <Styles.ListGap />}
            </Fragment>
          );
        })}
      </Animated.ScrollView>
    </Styles.ListWrapper>
  );
};
