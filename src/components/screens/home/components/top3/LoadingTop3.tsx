import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';

import * as Styles from './LoadingTop3.styles';

const DEFAULT_STYLE = {
  borderRadius: Styles.ITEM_BORDER_RADIUS,
  height: Styles.ITEM_HEIGHT,
  width: Styles.ITEM_WIDTH,
};

const LoadingTop3 = () => (
  <Styles.Wrapper
    testID="loading-home"
  >
    <Styles.RightItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={0}
        style={{ ...DEFAULT_STYLE }}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.RightItemWrapper>
    <Styles.CenterItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={1}
        style={{ ...DEFAULT_STYLE }}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.CenterItemWrapper>
    <Styles.LeftItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={2}
        style={{ ...DEFAULT_STYLE }}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.LeftItemWrapper>
  </Styles.Wrapper>
);

export default LoadingTop3;
