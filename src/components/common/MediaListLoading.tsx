import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import {
  WRAPPER_DEFAULT_WIDTH,
  WRAPPER_DEFAULT_HEIGHT,
} from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import metrics from 'styles/metrics';

const ListWrapper = styled(View)`
  flex-direction: row;
`;

const items = Array(3)
  .fill(0)
  .map((item, index) => `${item + index}`);

const MediaListLoading = () => (
  <>
    <LoadingPlaceholder
      indexToDelayAnimation={7}
      style={{
        marginVertical: 20,
        width: metrics.getWidthFromDP('30%'),
        borderRadius: metrics.height,
        height: metrics.largeSize,
      }}
    />
    <ListWrapper>
      {items.map((item, index) => (
        <LoadingPlaceholder
          indexToDelayAnimation={8 + index}
          key={item}
          style={{
            width: metrics.getWidthFromDP(WRAPPER_DEFAULT_WIDTH),
            height: metrics.getWidthFromDP(WRAPPER_DEFAULT_HEIGHT),
            marginRight: metrics.largeSize,
            borderRadius: metrics.extraSmallSize,
          }}
        />
      ))}
    </ListWrapper>
  </>
);

export default MediaListLoading;
