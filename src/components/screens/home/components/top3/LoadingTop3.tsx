import React from 'react';
import { FlatList } from 'react-native';
import { withTheme, DefaultTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';

import {
  ITEM_MARGING_HORIZONTAL,
  ITEM_BORDER_RADIUS,
  LoadingSmokeShadow,
  ITEM_MARGING_TOP,
  ListWrapper,
  ITEM_HEIGHT,
  GapFlatlist,
  ITEM_WIDTH,
} from './commonStyles';

type Props = {
  theme: DefaultTheme;
};

const loadingItems = Array(3)
  .fill(0)
  .map((_item, index) => index);

const LoadingTop3 = ({ theme }: Props) => (
  <ListWrapper
    testID="loading-home"
  >
    <FlatList
      ListHeaderComponent={() => <GapFlatlist />}
      ListFooterComponent={() => <GapFlatlist />}
      renderItem={({ index }) => (
        <>
          <LoadingPlaceholder
            colors={theme.colors.loadingColors}
            indexToDelayAnimation={index}
            style={{
              marginHorizontal: index === 1 ? ITEM_MARGING_HORIZONTAL : 0,
              marginTop: index !== 1 ? ITEM_MARGING_TOP : 0,
              borderRadius: ITEM_BORDER_RADIUS,
              height: ITEM_HEIGHT,
              width: ITEM_WIDTH,
            }}
          />
          <LoadingSmokeShadow
            isTheMiddle={index === 1}
          />
        </>
      )}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_data, index) => ({
        offset: ITEM_WIDTH * index,
        length: ITEM_WIDTH,
        index,
      })}
      keyExtractor={(item) => `${item}`}
      initialScrollIndex={1}
      scrollEnabled={false}
      data={loadingItems}
      bounces={false}
      horizontal
    />
  </ListWrapper>
);

export default withTheme(LoadingTop3);
