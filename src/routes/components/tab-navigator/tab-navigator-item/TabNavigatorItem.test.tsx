import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';
import * as Types from '@local-types';

import {TabNavigatorItem} from './TabNavigatorItem';
import items from '../items';

type RenderTabNavigationItemProps = {
  icon: Types.TabNavigatorItem;
  onPress?: () => void;
  isSelected?: boolean;
};

const renderTabNavigationItem = ({
  icon,
  isSelected = true,
  onPress = jest.fn(),
}: RenderTabNavigationItemProps) => (
  <ThemeProvider theme={theme}>
    <TabNavigatorItem
      inactiveIcon={icon.inactiveIcon}
      activeIcon={icon.activeIcon}
      isSelected={isSelected}
      onPress={onPress}
      title={icon.id}
    />
  </ThemeProvider>
);

describe('<TabNavigatorItem />', () => {
  const elements = {
    button: (api: RenderAPI) => api.queryByTestId('tab-button'),
    text: (api: RenderAPI) => api.queryByTestId('tab-title'),
  };

  it('should render correctly when the item is "unselected"', () => {
    const indexItemSelected = randomPositiveNumber(items.length - 1);
    const component = render(
      renderTabNavigationItem({
        icon: items[indexItemSelected],
        isSelected: false,
      }),
    );
    expect(elements.button(component)).not.toBeNull();
    expect(elements.text(component)).not.toBeNull();
    expect(
      component.queryByTestId(`icon-${items[indexItemSelected].activeIcon}`),
    ).toBeNull();
    expect(
      component.queryByTestId(`icon-${items[indexItemSelected].inactiveIcon}`),
    ).not.toBeNull();
  });

  it('should render correctly when the item is "selected"', () => {
    const indexItemSelected = randomPositiveNumber(items.length - 1);
    const component = render(
      renderTabNavigationItem({
        icon: items[indexItemSelected],
        isSelected: true,
      }),
    );
    expect(elements.button(component)).not.toBeNull();
    expect(elements.text(component)).not.toBeNull();
    expect(
      component.queryByTestId(`icon-${items[indexItemSelected].activeIcon}`),
    ).not.toBeNull();
    expect(
      component.queryByTestId(`icon-${items[indexItemSelected].inactiveIcon}`),
    ).toBeNull();
  });

  it('should call the "onPress" action when is pressed', () => {
    const indexItemSelected = randomPositiveNumber(items.length - 1);
    const onPress = jest.fn();
    const component = render(
      renderTabNavigationItem({
        icon: items[indexItemSelected],
        onPress,
      }),
    );
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.button(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
