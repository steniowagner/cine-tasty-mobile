import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import metrics from 'styles/metrics';

const ListWrapper = styled(View)`
  flex-direction: row;
`;

const items = Array(3)
  .fill(0)
  .map((item, index) => `${item + index}`);

const ImageListLoading = () => (
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
            width: metrics.getWidthFromDP('45%'),
            height: metrics.getWidthFromDP('32%'),
            marginRight: metrics.largeSize,
            borderRadius: metrics.extraSmallSize,
          }}
        />
      ))}
    </ListWrapper>
  </>
);

export default ImageListLoading;
