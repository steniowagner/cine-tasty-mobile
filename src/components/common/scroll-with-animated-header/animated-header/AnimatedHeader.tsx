import React from 'react';
import Animated from 'react-native-reanimated';

import {HeaderBackButton} from '@components';
import {CONSTANTS} from '@utils';

import {useAnimatedHeader} from './useAnimatedHeader';
import * as Styles from './AnimatedHeader.styles';

type AnimatedHeaderProps = {
  onPressHeaderBackButton: () => void;
  scrollViewPosition: Animated.SharedValue<number>;
  headerBackgroundColorInterpolationInput: number[];
  headerBackgroundColorInterpolationOutput: string[];
  headerTitleOpacityInterpolationInput: number[];
  headerTitleOpacityInterpolationOutput: number[];
  title: string;
};

export const AnimatedHeader = (props: AnimatedHeaderProps) => {
  const animatedHeader = useAnimatedHeader({
    scrollViewPosition: props.scrollViewPosition,
    headerBackgroundColorInterpolationInput:
      props.headerBackgroundColorInterpolationInput,
    headerBackgroundColorInterpolationOutput:
      props.headerBackgroundColorInterpolationOutput,
    headerTitleOpacityInterpolationInput:
      props.headerTitleOpacityInterpolationInput,
    headerTitleOpacityInterpolationOutput:
      props.headerTitleOpacityInterpolationOutput,
  });

  return (
    <Animated.View
      style={[
        animatedHeader.headerBackgroundColor,
        animatedHeader.baseAnimatedStyle,
        {...CONSTANTS.VALUES.DEFAULT_SHADOW},
      ]}>
      <Styles.Row>
        <Styles.Gap>
          <HeaderBackButton
            color="text"
            onPress={props.onPressHeaderBackButton}
          />
        </Styles.Gap>
        <Styles.TitleWrapper>
          <Animated.Text
            style={[animatedHeader.titleAnimatedStyle, Styles.sheet.title]}
            numberOfLines={2}>
            {props.title}
          </Animated.Text>
        </Styles.TitleWrapper>
        <Styles.Gap />
      </Styles.Row>
    </Animated.View>
  );
};
