import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import TabNavigatorItem from './TabNavigatorItem';
import items from './items';

type Props = {
  onPress?: () => void;
  isSelected?: boolean;
  icon: string;
};

const renderTabNavigationItem = ({
  icon,
  isSelected = true,
  onPress = jest.fn(),
}: Props) => (
  <ThemeProvider theme={theme}>
    <TabNavigatorItem
      isSelected={isSelected}
      title="ItemTitle"
      onPress={onPress}
      icon={icon}
      width={12}
    />
  </ThemeProvider>
);

describe('Testing <TabNavigatorItem />', () => {
  it('should renders correctly', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED].icon }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('item-title')).not.toBeNull();

    expect(getByTestId('icon').props.name).toEqual(items[ITEM_SELECTED].icon);
  });

  it('should renders correctly when the item is selected', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED].icon }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toEqual(items[ITEM_SELECTED].icon);

    expect(getByTestId('icon').props.color).toEqual(theme.colors.text);

    expect(getByTestId('item-title').props.color).toEqual(theme.colors.text);
  });

  it("should renders correctly when the item isn't selected", () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED].icon, isSelected: false }),
    );

    expect(getByTestId('button-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toEqual(items[ITEM_SELECTED].icon);

    expect(getByTestId('icon').props.color).toEqual(theme.colors.inactiveWhite);

    expect(getByTestId('item-title').props.color).toEqual(theme.colors.inactiveWhite);
  });

  it('should call the "onPress" action when is pressed', () => {
    const ITEM_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const { getByTestId } = render(
      renderTabNavigationItem({ icon: items[ITEM_SELECTED].icon, onPress }),
    );

    fireEvent.press(getByTestId('button-wrapper'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
