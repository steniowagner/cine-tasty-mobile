import React, {useMemo, memo} from 'react';
import {useTheme} from 'styled-components/native';

import {renderSVGIconConditionally, Icons} from '@components';
import * as Types from '@local-types';

import * as Styles from './TabNavigatorItem.styles';

type TabNavigatorItemProps = {
  inactiveIcon: Icons;
  activeIcon: Icons;
  onPress: () => void;
  isSelected: boolean;
  title: string;
  width: number;
};

export const TabNavigatorItem = memo(
  (props: TabNavigatorItemProps) => {
    const theme = useTheme();

    const selectedIconColor = useMemo(
      () => (theme.id === Types.ThemeId.DARK ? 'primary' : 'text'),
      [theme.id],
    );

    return (
      <Styles.Wrapper
        testID="button-wrapper"
        onPress={props.onPress}
        width={props.width}>
        {renderSVGIconConditionally({
          condition: props.isSelected,
          ifTrue: {
            colorThemeRef: selectedIconColor,
            size: Styles.DEFAULT_ICON_SIZE,
            id: props.activeIcon,
          },
          ifFalse: {
            colorThemeRef: 'inactiveWhite',
            size: Styles.DEFAULT_ICON_SIZE,
            id: props.inactiveIcon,
          },
        })}
        <Styles.ItemText testID="item-title" isSelected={props.isSelected}>
          {props.title}
        </Styles.ItemText>
      </Styles.Wrapper>
    );
  },
  (
    previousState: TabNavigatorItemProps,
    nextState: TabNavigatorItemProps,
  ): boolean =>
    (previousState.isSelected || !nextState.isSelected) &&
    (!previousState.isSelected || nextState.isSelected),
);
