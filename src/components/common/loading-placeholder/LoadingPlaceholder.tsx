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

export const LoadingPlaceholder = withTheme(
  (props: LoadingPlaceholderProps) => {
    const loadingPlaceholder = useLoadingPlaceholder({
      indexToDelayAnimation: props.indexToDelayAnimation || 0,
    });

    return (
      <Animated.View
        style={{
          ...props.style,
          backgroundColor: props.theme.colors.loadingColor,
          opacity: loadingPlaceholder.opacity,
        }}
        testID={props.testID || 'loading-placeholder'}
      />
    );
  },
);
