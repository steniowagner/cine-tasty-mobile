import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import metrics from '../../../styles/metrics';
import Icon from '../Icon';

interface WrapperButtonProps {
  readonly width: number;
}

interface ItemTextProps {
  readonly color: string;
}

const Wrapper = styled(TouchableOpacity)<WrapperButtonProps>`
  width: ${({ width }) => width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

type Props = {
  inactiveIcon: string;
  onPress: () => void;
  isSelected: boolean;
  theme: DefaultTheme;
  activeIcon: string;
  width: number;
};

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

const NavigatorItem = withTheme(
  ({
    inactiveIcon, activeIcon, isSelected, onPress, theme, width,
  }: Props) => {
    const color = isSelected ? theme.colors.primary : theme.colors.inactiveWhite;
    const icon = isSelected ? activeIcon : inactiveIcon;

    return (
      <Wrapper
        onPress={onPress}
        testID="button-wrapper"
        width={width}
      >
        <Icon
          color={color}
          name={icon}
          size={metrics.getWidthFromDP('8%')}
        />
      </Wrapper>
    );
  },
);

export default memo(NavigatorItem, shouldComponentUpdate);
