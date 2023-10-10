import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';

import { Icons } from '@common-components';
import { renderSVGIconConditionally } from '@utils';
import { dark } from '@styles/themes';

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

    return (
      <Styles.Wrapper testID="tab-button" onPress={props.onPress}>
        {renderSVGIconConditionally({
          condition: props.isSelected,
          ifTrue: {
            color:
              // Didn't use the theme.id because we would need to
              // also check the cases of dark/light when "theme" is "system"
              theme.colors.background === dark.colors.background
                ? 'primary'
                : 'text',
            size: Styles.DEFAULT_ICON_SIZE,
            id: props.activeIcon,
          },
          ifFalse: {
            color: 'inactiveWhite',
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
