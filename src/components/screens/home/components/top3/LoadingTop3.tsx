import React from 'react';
import { FlatList } from 'react-native';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';

import * as Styles from './LoadingTop3.styles';

const loadingItems = Array(3)
  .fill(0)
  .map((_item, index) => index);

const LoadingTop3 = () => (
  <Styles.ListWrapper
    testID="loading-home"
  >
    <FlatList
      ListHeaderComponent={() => <Styles.GapFlatlist />}
      ListFooterComponent={() => <Styles.GapFlatlist />}
      renderItem={({ index }) => (
        <>
          <LoadingPlaceholder
            indexToDelayAnimation={index}
            style={{
              marginHorizontal: index === 1 ? Styles.ITEM_MARGING_HORIZONTAL : 0,
              marginTop: index !== 1 ? Styles.ITEM_MARGING_TOP : 0,
              borderRadius: Styles.ITEM_BORDER_RADIUS,
              height: Styles.ITEM_HEIGHT,
              width: Styles.ITEM_WIDTH,
            }}
          />
          <Styles.LoadingSmokeShadow
            isTheMiddle={index === 1}
          />
        </>
      )}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_data, index) => ({
        offset: Styles.ITEM_WIDTH * index,
        length: Styles.ITEM_WIDTH,
        index,
      })}
      keyExtractor={(item) => `${item}`}
      initialScrollIndex={1}
      scrollEnabled={false}
      data={loadingItems}
      bounces={false}
      horizontal
    />
  </Styles.ListWrapper>
);

export default LoadingTop3;
