import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TabNavigatorItem as TabNavigatorItemType } from 'types';
import { dark as theme } from 'styles/themes/dark';

import TabNavigatorItem from './TabNavigatorItem';
import items from './items';

type Props = {
  icon: TabNavigatorItemType;
  onPress?: () => void;
  isSelected?: boolean;
};

const renderTabNavigationItem = ({
  icon,
  isSelected = true,
  onPress = jest.fn(),
}: Props) => (
  <ThemeProvider theme={theme}>
    <TabNavigatorItem
      inactiveIcon={icon.inactiveIcon}
      activeIcon={icon.activeIcon}
      isSelected={isSelected}
      onPress={onPress}
      title={icon.id}
      width={12}
    />
  </ThemeProvider>
);

describe('Testing <TabNavigatorItem />', () => {
  it('should renders correctly', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { queryByTestId, getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED] }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('item-title')).not.toBeNull();

    expect(queryByTestId(`icon-${items[ITEM_SELECTED].inactiveIcon}`)).toBeNull();
  });

  it('should renders correctly when the item is selected', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { queryByTestId, getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED] }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('item-title').props.color).toEqual(theme.colors.primary);

    expect(queryByTestId(`icon-${items[ITEM_SELECTED].inactiveIcon}`)).toBeNull();

    const iconXML = getByTestId(`icon-${items[ITEM_SELECTED].activeIcon}`).props.xml;

    expect(iconXML.includes(theme.colors.primary)).toBe(true);
  });

  it("should renders correctly when the item isn't selected", () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED], isSelected: false }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('item-title').props.color).toEqual(theme.colors.inactiveWhite);

    const iconXML = getByTestId(`icon-${items[ITEM_SELECTED].inactiveIcon}`).props.xml;

    expect(iconXML.includes(theme.colors.inactiveWhite)).toBe(true);
  });

  it('should call the "onPress" action when is pressed', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED], onPress }),
    );

    fireEvent.press(getByTestId('button-wrapper'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
