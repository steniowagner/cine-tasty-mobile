import React, { useMemo, memo } from 'react';
import { TouchableOpacity, Platform, Text } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import renderSVGIconConditionally from 'components/common/svg-icon/renderSVGIconConditionally';
import { SupportedIcons } from 'components/common/svg-icon/getXML';
import { useGetCurrentTheme } from 'hooks';
import metrics from 'styles/metrics';
import { ThemeId } from 'types';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

type WrapperButtonProps = {
  width: number;
};

type ItemTextProps = {
  color: string;
};

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
  inactiveIcon: SupportedIcons;
  activeIcon: SupportedIcons;
  onPress: () => void;
  isSelected: boolean;
  theme: DefaultTheme;
  title: string;
  width: number;
};

const NavigatorItem = withTheme(
  ({
    inactiveIcon, activeIcon, isSelected, onPress, theme, width, title,
  }: Props) => {
    const { currentTheme } = useGetCurrentTheme({ theme });

    const selectedIconColor = useMemo(
      () => (currentTheme === ThemeId.DARK ? 'primary' : 'text'),
      [currentTheme],
    );

    const textColor = useMemo(() => {
      const selectedColor = currentTheme === ThemeId.DARK ? theme.colors.primary : theme.colors.text;

      return isSelected ? selectedColor : theme.colors.inactiveWhite;
    }, [isSelected, currentTheme]);

    return (
      <Wrapper
        testID="button-wrapper"
        onPress={onPress}
        width={width}
      >
        {renderSVGIconConditionally({
          condition: isSelected,
          ifTrue: {
            colorThemeRef: selectedIconColor,
            size: DEFAULT_ICON_SIZE,
            id: activeIcon,
          },
          ifFalse: {
            colorThemeRef: 'inactiveWhite',
            size: DEFAULT_ICON_SIZE,
            id: inactiveIcon,
          },
        })}
        <ItemText
          testID="item-title"
          color={textColor}
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
