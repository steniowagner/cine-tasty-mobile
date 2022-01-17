import React from 'react';
import {Animated} from 'react-native';
import {withTheme, DefaultTheme} from 'styled-components/native';

import useLoadingPlaceholder from './useLoadingPlaceholder';

type LoadingPlaceholderProps = {
  indexToDelayAnimation?: number;
  theme: DefaultTheme;
  testID?: string;
  style: object;
};

const LoadingPlaceholder = ({
  indexToDelayAnimation = 0,
  testID,
  style,
  theme,
}: LoadingPlaceholderProps) => {
  const {opacity} = useLoadingPlaceholder({
    indexToDelayAnimation,
  });

  return (
    <Animated.View
      style={{...style, backgroundColor: theme.colors.loadingColor, opacity}}
      testID={testID || 'loading-placeholder'}
    />
  );
};

export default withTheme(LoadingPlaceholder);
