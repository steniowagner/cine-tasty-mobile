import React, { useMemo, memo } from 'react';
import { TouchableOpacity, Platform, Text } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';
import { ThemeId } from 'types';

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

const ItemText = styled(Text)<ItemTextProps>`
  margin-top: ${({ theme }) => (Platform.OS === 'android' ? theme.metrics.extraSmallSize : 0)}px;
  font-family: CircularStd-Medium;
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.1}px;
`;

type Props = {
  onPress: () => void;
  isSelected: boolean;
  theme: DefaultTheme;
  title: string;
  width: number;
  icon: string;
};

const NavigatorItem = withTheme(
  ({
    icon, isSelected, onPress, theme, width, title,
  }: Props) => {
    const color = useMemo(() => {
      const selectedColor = theme.id === ThemeId.DARK ? theme.colors.primary : theme.colors.text;

      return isSelected ? selectedColor : theme.colors.inactiveWhite;
    }, [isSelected, theme]);

    return (
      <Wrapper
        testID="button-wrapper"
        onPress={onPress}
        width={width}
      >
        <Icon
          size={metrics.getWidthFromDP('8%')}
          color={color}
          name={icon}
        />
        <ItemText
          testID="item-title"
          color={color}
        >
          {title}
        </ItemText>
      </Wrapper>
    );
  },
);

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(NavigatorItem, shouldComponentUpdate);
