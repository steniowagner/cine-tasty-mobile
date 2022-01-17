import React, {useMemo, memo} from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import {SupportedIcons} from '@components/common/svg-icon/getXML';
import {useGetCurrentTheme} from '@hooks';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './TabNavigatorItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

type NavigatorItemProps = {
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
    inactiveIcon,
    activeIcon,
    isSelected,
    onPress,
    theme,
    width,
    title,
  }: NavigatorItemProps) => {
    const {currentTheme} = useGetCurrentTheme({theme});

    const selectedIconColor = useMemo(
      () => (currentTheme === Types.ThemeId.DARK ? 'primary' : 'text'),
      [currentTheme],
    );

    const textColor = useMemo(() => {
      const selectedColor =
        currentTheme === Types.ThemeId.DARK
          ? theme.colors.primary
          : theme.colors.text;

      return isSelected ? selectedColor : theme.colors.inactiveWhite;
    }, [isSelected, currentTheme]);

    return (
      <Styles.Wrapper testID="button-wrapper" onPress={onPress} width={width}>
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
        <Styles.ItemText testID="item-title" color={textColor}>
          {title}
        </Styles.ItemText>
      </Styles.Wrapper>
    );
  },
);

const shouldComponentUpdate = (
  previousState: NavigatorItemProps,
  nextState: NavigatorItemProps,
): boolean =>
  (previousState.isSelected || !nextState.isSelected) &&
  (!previousState.isSelected || nextState.isSelected);

export default memo(NavigatorItem, shouldComponentUpdate);
