import React, { useMemo, memo } from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import { SupportedIcons } from '@components/common/svg-icon/getXML';
import { useGetCurrentTheme } from '@hooks';
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

const NavigatorItem = withTheme((props: NavigatorItemProps) => {
  const { currentTheme } = useGetCurrentTheme({ theme: props.theme });

  const selectedIconColor = useMemo(
    () => (currentTheme === Types.ThemeId.DARK ? 'primary' : 'text'),
    [currentTheme],
  );

  const textColor = useMemo(() => {
    const selectedColor = currentTheme === Types.ThemeId.DARK
      ? props.theme.colors.primary
      : props.theme.colors.text;

    return props.isSelected ? selectedColor : props.theme.colors.inactiveWhite;
  }, [props.isSelected, currentTheme]);

  return (
    <Styles.Wrapper
      testID="button-wrapper"
      onPress={props.onPress}
      width={props.width}
    >
      {renderSVGIconConditionally({
        condition: props.isSelected,
        ifTrue: {
          colorThemeRef: selectedIconColor,
          size: DEFAULT_ICON_SIZE,
          id: props.activeIcon,
        },
        ifFalse: {
          colorThemeRef: 'inactiveWhite',
          size: DEFAULT_ICON_SIZE,
          id: props.inactiveIcon,
        },
      })}
      <Styles.ItemText
        testID="item-title"
        color={textColor}
      >
        {props.title}
      </Styles.ItemText>
    </Styles.Wrapper>
  );
});

const shouldComponentUpdate = (
  previousState: NavigatorItemProps,
  nextState: NavigatorItemProps,
): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(NavigatorItem, shouldComponentUpdate);
