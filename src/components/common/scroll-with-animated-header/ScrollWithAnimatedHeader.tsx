import React, { useCallback, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { useScrollWithAnimatedHeader } from './use-scroll-with-animated-header';
import { AnimatedHeader } from './animated-header/AnimatedHeader';

type ScrollWithAnimatedHeaderProps = {
  backgroundColorInterpolationInput: number[];
  backgroundColorInterpolationOutput: string[];
  titleOpacityInterpolationInput: number[];
  titleOpacityInterpolationOutput: number[];
  children: React.ReactNode;
  canBounce: boolean;
  isScrollEnabled: boolean;
  headerTitle: string;
};

export const ScrollWithAnimatedHeader = (
  props: ScrollWithAnimatedHeaderProps,
) => {
  const scrollWithAnimatedHeader = useScrollWithAnimatedHeader();
  const navigation = useNavigation();

  const Header = useCallback(
    () => (
      <AnimatedHeader
        onPressHeaderBackButton={navigation.goBack}
        scrollViewPosition={scrollWithAnimatedHeader.scrollViewPosition}
        title={props.headerTitle}
        backgroundColorInterpolationInput={
          props.backgroundColorInterpolationInput
        }
        backgroundColorInterpolationOutput={
          props.backgroundColorInterpolationOutput
        }
        titleOpacityInterpolationInput={props.titleOpacityInterpolationInput}
        titleOpacityInterpolationOutput={props.titleOpacityInterpolationOutput}
      />
    ),
    [props.headerTitle],
  );

  useEffect(() => {
    navigation.setOptions({
      header: Header,
    });
  }, [Header]);

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      bounces={props.canBounce}
      onScroll={scrollWithAnimatedHeader.onScroll}
      testID="scrollview-with-animated-header"
      scrollEnabled={props.isScrollEnabled}>
      {props.children}
    </Animated.ScrollView>
  );
};
