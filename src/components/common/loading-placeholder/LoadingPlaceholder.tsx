import React from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { useLoadingPlaceholder } from './use-loading-placeholder';

export type LoadingPlaceholderProps = {
  style?: ViewStyle;
  indexToDelayAnimation?: number;
  testID?: string;
};

export const LoadingPlaceholder = ({
  testID = 'loading-placeholder',
  indexToDelayAnimation = 0,
  style = {},
}: LoadingPlaceholderProps) => {
  const loadingPlaceholder = useLoadingPlaceholder({
    indexToDelayAnimation: indexToDelayAnimation,
  });

  const theme = useTheme();

  return (
    <Animated.View
      style={[
        {
          ...style,
          backgroundColor: theme.colors.loadingColor,
        },
        {
          ...loadingPlaceholder.style,
        },
      ]}
      testID={testID}
    />
  );
};
