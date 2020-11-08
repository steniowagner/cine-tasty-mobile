import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import TabNavigator from './TabNavigator';
import items from './items';

const getState = (currentRouteName: string) => ({
  routeNames: items.map(item => item.id),
  index: 0,
  routes: [
    {
      state: {
        routes: [
          {
            name: currentRouteName,
          },
        ],
        index: 0,
      },
    },
  ],
});

const renderTabNavigator = (navigate = jest.fn(), currentRouteName = 'HOME') => (
  <ThemeProvider theme={dark}>
    <TabNavigator navigation={{ navigate }} state={getState(currentRouteName)} />
  </ThemeProvider>
);

describe('Testing <TabNavigator />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('Testing the render', () => {
    it('should render correctly', () => {
      const { getByTestId } = render(renderTabNavigator());

      expect(getByTestId('tab-wrapper')).not.toBeNull();

      expect(Array.isArray(getByTestId('tab-wrapper').props.children)).toEqual(true);

      expect(getByTestId('tab-wrapper').props.children.length).toEqual(items.length);
    });

    it('should return null when the current screen is not able to show the "TabNavigator"', () => {
      const { queryByTestId } = render(renderTabNavigator(undefined, 'OTHER_SCREEN'));

      expect(queryByTestId('tab-wrapper')).toBeNull();
    });

    it('should render children correctly on the first render', () => {
      const TAB_SELECTED_INDEX = 0;
      const { getByTestId } = render(renderTabNavigator());

      expect(
        getByTestId('tab-wrapper').props.children[TAB_SELECTED_INDEX].props.isSelected,
      ).toEqual(true);

      expect(
        getByTestId('tab-wrapper')
          .props.children.filter((_, index) => index !== TAB_SELECTED_INDEX)
          .every(item => item.props.isSelected === false),
      ).toEqual(true);
    });

    it('should call the navigation() when is pressed', () => {
      const INDEX_SELECTED = (Math.random() * (items.length - 1 - 0 + 1)) << 0;

      const navigate = jest.fn();

      const { getByTestId } = render(renderTabNavigator(navigate));

      fireEvent.press(getByTestId('tab-wrapper').props.children[INDEX_SELECTED]);

      expect(navigate).toBeCalledTimes(1);

      expect(navigate).toBeCalledWith(items[INDEX_SELECTED].id);
    });

    it('should call navigation when the user press in a certain tab', () => {
      const navigate = jest.fn();

      const { getAllByTestId } = render(renderTabNavigator(navigate));

      fireEvent.press(getAllByTestId('button-wrapper')[0]);

      expect(navigate).toHaveBeenCalledTimes(1);

      expect(navigate).toHaveBeenCalledWith('HOME');
    });
  });
});
