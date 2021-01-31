import React from 'react';
import {
  TouchableOpacity, LayoutChangeEvent, Animated, View,
} from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import useMediaSwitcher, { SwitchItem } from './useMediaSwitcher';

interface WrapperStyleProps {
  readonly opacity: number;
  readonly width: number;
}

interface DynamicWidthStyleProps {
  readonly width: number;
}

const Wrapper = styled(View)<WrapperStyleProps>`
  width: ${({ width }) => width}px;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: ${({ opacity }) => opacity};
`;

const SwitcherIndicator = styled(Animated.View)<DynamicWidthStyleProps>`
  width: ${({ width }) => width}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => `${theme.metrics.extraSmallSize}px solid ${theme.colors.secondary}`};
  position: absolute;
`;

const OptionText = styled(Animated.Text)`
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const OptionButton = styled(TouchableOpacity)<DynamicWidthStyleProps>`
  width: ${({ width }) => width}px;
  justify-content: center;
  align-items: center;
`;

type Props = {
  theme: DefaultTheme;
  items: SwitchItem[];
  isDisabled: boolean;
};

const MediaSwitcher = ({ isDisabled, items, theme }: Props) => {
  const {
    switchItemWidth,
    wrapperOpacity,
    translateX,
    switchItems,
    isSwitching,
  } = useMediaSwitcher({ theme, items });

  return (
    <Wrapper
      width={items.length * switchItemWidth}
      opacity={wrapperOpacity}
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      testID="media-switcher-wrapper"
    >
      <SwitcherIndicator
        width={switchItemWidth}
        testID="switcher-indicator"
        style={{
          opacity: isDisabled ? 0.5 : 1,
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, switchItemWidth],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />
      <Row>
        {switchItems.map((switchItem) => (
          <OptionButton
            disabled={isSwitching || isDisabled}
            onPress={switchItem.onPress}
            testID={`${switchItem.title}-button`}
            width={switchItemWidth}
            key={switchItem.title}
          >
            <OptionText
              onLayout={(event: LayoutChangeEvent) => switchItem.onLayout(event)}
              style={{ color: switchItem.textColor }}
              testID={`${switchItem.title}-text`}
            >
              {switchItem.title}
            </OptionText>
          </OptionButton>
        ))}
      </Row>
    </Wrapper>
  );
};

export default withTheme(MediaSwitcher);
