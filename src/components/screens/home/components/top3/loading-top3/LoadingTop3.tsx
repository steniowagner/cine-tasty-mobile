import React from 'react';

import {LoadingPlaceholder} from '@components/common';

import * as Top3ListItemStyles from '../top-3-list-item/Top3ListItem.styles';
import * as Styles from './LoadingTop3.styles';
import * as Top3Styles from '../Top3.styles';

const DEFAULT_STYLE = {
  borderRadius: Top3ListItemStyles.ITEM_BORDER_RADIUS,
  height: Top3ListItemStyles.ITEM_HEIGHT,
  width: Top3ListItemStyles.ITEM_WIDTH,
};

const LoadingTop3 = () => (
  <Top3Styles.ListWrapper testID="loading-home">
    <Styles.RightItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={0}
        style={{...DEFAULT_STYLE}}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.RightItemWrapper>
    <Styles.CenterItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={1}
        style={{...DEFAULT_STYLE}}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.CenterItemWrapper>
    <Styles.LeftItemWrapper>
      <LoadingPlaceholder
        indexToDelayAnimation={2}
        style={{...DEFAULT_STYLE}}
      />
      <Styles.LoadingSmokeShadow />
    </Styles.LeftItemWrapper>
  </Top3Styles.ListWrapper>
);

export default LoadingTop3;
