import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';

const ListWrapper = styled(View)`
  flex-direction: row;
`;

type Props = {
  theme: DefaultTheme;
};

const items = Array(3)
  .fill(0)
  .map((item, index) => `${item + index}`);

const ImageListLoading = ({ theme }: Props) => (
  <>
    <LoadingPlaceholder
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={7}
      style={{
        marginVertical: 20,
        width: theme.metrics.getWidthFromDP('30%'),
        borderRadius: theme.metrics.height,
        height: theme.metrics.largeSize,
      }}
    />
    <ListWrapper>
      {items.map((item, index) => (
        <LoadingPlaceholder
          colors={theme.colors.loadingColors}
          indexToDelayAnimation={8 + index}
          key={item}
          style={{
            width: theme.metrics.getWidthFromDP('45%'),
            height: theme.metrics.getWidthFromDP('32%'),
            marginRight: theme.metrics.largeSize,
            borderRadius: theme.metrics.extraSmallSize,
          }}
        />
      ))}
    </ListWrapper>
  </>
);

export default withTheme(ImageListLoading);
