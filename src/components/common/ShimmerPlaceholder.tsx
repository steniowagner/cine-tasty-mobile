import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { DefaultTheme, withTheme } from 'styled-components';

type Props = {
  theme: DefaultTheme;
  style: object;
};

const PlaceHolder = ({ theme, style }: Props) => (
  <ShimmerPlaceHolder
    colorShimmer={theme.colors.shimmer}
    visible={false}
    duration={1200}
    style={style}
    autoRun
  />
);

export default withTheme(PlaceHolder);
