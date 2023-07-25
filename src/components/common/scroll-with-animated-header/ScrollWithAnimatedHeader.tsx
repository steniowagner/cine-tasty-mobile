import React, {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import {AnimatedHeader} from './animated-header/AnimatedHeader';
import {useScrollWithAnimatedHeader} from './useScrollWithAnimatedHeader';

type ScrollWithAnimatedHeaderProps = {
  headerBackgroundColorInterpolationInput: number[];
  headerBackgroundColorInterpolationOutput: string[];
  headerTitleOpacityInterpolationInput: number[];
  headerTitleOpacityInterpolationOutput: number[];
  children: React.ReactNode;
  isLoading: boolean;
  hasError: boolean;
  headerTitle: string;
};

export const ScrollWithAnimatedHeader = (
  props: ScrollWithAnimatedHeaderProps,
) => {
  const scrollWithAnimatedHeader = useScrollWithAnimatedHeader({
    isLoading: props.isLoading,
    hasError: props.hasError,
  });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <AnimatedHeader
          onPressHeaderBackButton={navigation.goBack}
          scrollViewPosition={scrollWithAnimatedHeader.scrollViewPosition}
          title={props.headerTitle}
          headerBackgroundColorInterpolationInput={
            props.headerBackgroundColorInterpolationInput
          }
          headerBackgroundColorInterpolationOutput={
            props.headerBackgroundColorInterpolationOutput
          }
          headerTitleOpacityInterpolationInput={
            props.headerTitleOpacityInterpolationInput
          }
          headerTitleOpacityInterpolationOutput={
            props.headerTitleOpacityInterpolationOutput
          }
        />
      ),
    });
  }, [
    props.headerBackgroundColorInterpolationInput,
    props.headerBackgroundColorInterpolationOutput,
    props.headerTitleOpacityInterpolationInput,
    props.headerTitleOpacityInterpolationOutput,
    props.headerTitle,
  ]);

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      bounces={scrollWithAnimatedHeader.canScrollViewBounce}
      onScroll={scrollWithAnimatedHeader.onScroll}
      testID="scroll-with-animated-header"
      scrollEnabled={!props.isLoading}>
      {props.children}
    </Animated.ScrollView>
  );
};
