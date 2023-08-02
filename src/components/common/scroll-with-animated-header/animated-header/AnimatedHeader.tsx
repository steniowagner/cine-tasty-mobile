import React from 'react';
import Animated from 'react-native-reanimated';

import {dark as theme} from '@styles/themes';
import {HeaderIconButton} from '@components';

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
        {...theme.colors.defaultShadow},
      ]}>
      <Styles.Row>
        <Styles.Gap>
          <HeaderIconButton
            onPress={props.onPressHeaderBackButton}
            iconName="arrow-back"
            withMarginLeft
            color="text"
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
