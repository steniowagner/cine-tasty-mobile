import React, {useMemo, memo} from 'react';
import {useTheme} from 'styled-components/native';

import {renderSVGIconConditionally, Icons} from '@components';
import {dark} from '@styles/themes';

import * as Styles from './TabNavigatorItem.styles';

type TabNavigatorItemProps = {
  inactiveIcon: Icons;
  activeIcon: Icons;
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

export const TabNavigatorItem = memo(
  (props: TabNavigatorItemProps) => {
    const theme = useTheme();

    const selectedIconColor = useMemo(
      () =>
        theme.colors.background === dark.colors.background ? 'primary' : 'text',
      [theme.id],
    );

    return (
      <Styles.Wrapper testID="tab-button" onPress={props.onPress}>
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
        <Styles.ItemText testID="tab-title" isSelected={props.isSelected}>
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
