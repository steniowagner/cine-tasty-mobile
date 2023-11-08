import React from 'react';
import Animated, { SharedValue } from 'react-native-reanimated';

import { HeaderIconButton } from '@common-components';
import GLOBAL_STYLES from '@styles/constants';

import { useAnimatedHeader } from './use-animated-header';
import * as Styles from './AnimatedHeader.styles';

type AnimatedHeaderProps = {
  onPressHeaderBackButton: () => void;
  scrollViewPosition: SharedValue<number>;
  backgroundColorInterpolationInput: number[];
  backgroundColorInterpolationOutput: string[];
  titleOpacityInterpolationInput: number[];
  titleOpacityInterpolationOutput: number[];
  title: string;
};

export const AnimatedHeader = (props: AnimatedHeaderProps) => {
  const animatedHeader = useAnimatedHeader({
    scrollViewPosition: props.scrollViewPosition,
    backgroundColorInterpolationInput: props.backgroundColorInterpolationInput,
    backgroundColorInterpolationOutput:
      props.backgroundColorInterpolationOutput,
    titleOpacityInterpolationInput: props.titleOpacityInterpolationInput,
    titleOpacityInterpolationOutput: props.titleOpacityInterpolationOutput,
  });

  return (
    <Animated.View
      testID="animated-header"
      style={[
        Styles.sheet.header,
        animatedHeader.headerBackgroundColor,
        { ...GLOBAL_STYLES.defaultShadow },
        animatedHeader.shadow,
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
            testID="animated-header-title"
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
