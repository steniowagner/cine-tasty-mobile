import React from 'react';
import { FlatList, View } from 'react-native';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import metrics from 'styles/metrics';

import { Wrapper } from './MediaSerachListItem';
import { IMAGE_HEIGHT } from './MediaImage';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / IMAGE_HEIGHT);

const mediaLoadingItems = Array(INITIAL_ITEMS_TO_RENDER)
  .fill(0)
  .map((item, index) => `${index}`);

const getLoadingBaseStyle = (width: string, height: string) => ({
  height: metrics.getWidthFromDP(height),
  borderRadius: metrics.extraSmallSize,
  marginHorizontal: metrics.smallSize,
  width,
});

const LoadingMediaSearch = () => (
  <FlatList
    renderItem={({ index }) => (
      <Wrapper>
        <LoadingPlaceholder
          indexToDelayAnimation={index}
          style={getLoadingBaseStyle('30%', '40%')}
        />
        <View
          style={{
            width: '100%',
          }}
        >
          <LoadingPlaceholder
            indexToDelayAnimation={index}
            style={{}}
          />
          <LoadingPlaceholder
            indexToDelayAnimation={index}
            style={getLoadingBaseStyle('60%', '10%')}
          />
          <LoadingPlaceholder
            indexToDelayAnimation={index}
            style={{
              ...getLoadingBaseStyle('60%', '10%'),
              marginVertical: metrics.extraLargeSize,
            }}
          />
          <LoadingPlaceholder
            indexToDelayAnimation={index}
            style={getLoadingBaseStyle('60%', '10%')}
          />
        </View>
      </Wrapper>
    )}
    testID="loading-media-search"
    keyExtractor={(item) => item}
    data={mediaLoadingItems}
    scrollEnabled={false}
  />
);

export default LoadingMediaSearch;
