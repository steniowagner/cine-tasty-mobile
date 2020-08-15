import React from 'react';
import { Animated } from 'react-native';

import useLoadingPlaceholder from './useLoadingPlaceholder';

type Props = {
  indexToDelayAnimation?: number;
  colors: string[];
  style: object;
};

const LoadingPlaceholder = ({ indexToDelayAnimation = 0, style, colors }: Props) => {
  const { color } = useLoadingPlaceholder({
    indexToDelayAnimation,
    colors,
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Animated.View
      style={{ ...style, backgroundColor: color }}
      testID="loading-placeholder"
    />
  );
};

export default LoadingPlaceholder;
