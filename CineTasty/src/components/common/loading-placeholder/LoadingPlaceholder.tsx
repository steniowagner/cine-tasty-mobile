import React from 'react';
import { Animated } from 'react-native';
import { withTheme, DefaultTheme } from 'styled-components';

import useLoadingPlaceholder from './useLoadingPlaceholder';

type Props = {
  indexToDelayAnimation?: number;
  theme: DefaultTheme;
  colors?: string[];
  testID?: string;
  style: object;
};

const LoadingPlaceholder = ({
  indexToDelayAnimation = 0,
  testID,
  style,
  theme,
}: Props) => {
  const { color } = useLoadingPlaceholder({
    colors: theme.colors.loadingColors,
    indexToDelayAnimation,
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Animated.View
      style={{ ...style, backgroundColor: color }}
      testID={testID || 'loading-placeholder'}
    />
  );
};

export default withTheme(LoadingPlaceholder);
