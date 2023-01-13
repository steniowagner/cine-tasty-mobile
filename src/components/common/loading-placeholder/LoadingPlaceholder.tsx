import React from 'react';
import Animated from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';

import {useLoadingPlaceholder, Style} from './useLoadingPlaceholder';

type LoadingPlaceholderProps = {
  indexToDelayAnimation?: number;
  testID?: string;
  style: Style;
};

export const LoadingPlaceholder = (props: LoadingPlaceholderProps) => {
  const loadingPlaceholder = useLoadingPlaceholder({
    indexToDelayAnimation: props.indexToDelayAnimation || 0,
    style: props.style,
  });

  const theme = useTheme();

  return (
    <Animated.View
      style={[
        {
          borderRadius: props.style.borderRadius,
          width: props.style.width,
          height: props.style.height,
          marginBottom: props.style.marginBottom,
          backgroundColor: theme.colors.loadingColor,
        },
        {
          ...loadingPlaceholder.style,
        },
      ]}
      testID={props.testID || 'loading-placeholder'}
    />
  );
};
