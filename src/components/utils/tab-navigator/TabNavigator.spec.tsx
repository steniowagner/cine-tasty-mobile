import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react-native';

import { dark } from 'styles/themes';

import TabNavigator from './TabNavigator';
import items from './items';

jest.mock('Dimensions');

const routeNames = items.map(item => item.id);

const index = 0;

const state = {
  routeNames,
  index,
  routes: [
    {
      state: {
        routes: [
          {
            name: '',
          },
        ],
        index: 0,
      },
    },
  ],
};

describe('Testing <TabNavigator />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing the render', () => {
    it('should render correctly', () => {
      const { queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <TabNavigator navigation={{ navigate: jest.fn() }} state={state} />
        </ThemeProvider>,
      );

      expect(queryByTestId('tab-wrapper')).not.toBeNull();

      expect(Array.isArray(queryByTestId('tab-wrapper').props.children)).toBe(true);

      expect(queryByTestId('tab-wrapper').props.children.length).toBe(items.length);
    });

    it('should return null when the current screen is on the blacklist', () => {
      const { queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <TabNavigator
            navigation={{ navigate: jest.fn() }}
            state={{
              routeNames,
              index,
              routes: [
                {
                  state: {
                    routes: [
                      {
                        name: '',
                      },
                    ],
                  },
                },
              ],
            }}
          />
        </ThemeProvider>,
      );

      expect(queryByTestId('tab-wrapper')).toBeNull();
    });
  });

  describe('Testing the children state provided by state prop', () => {
    it('should render children correctly', () => {
      const { queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <TabNavigator navigation={{ navigate: jest.fn() }} state={state} />
        </ThemeProvider>,
      );

      expect(queryByTestId('tab-wrapper').props.children[index].props.isSelected).toBe(
        true,
      );

      expect(
        queryByTestId('tab-wrapper')
          .props.children.slice(1, items.length)
          .every(item => item.props.isSelected === false),
      ).toBe(true);
    });
  });

  describe('Testing the navigate() function passed to children', () => {
    it('should call the navigation() when is pressed', () => {
      const navigate = jest.fn();

      const { queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <TabNavigator navigation={{ navigate }} state={state} />
        </ThemeProvider>,
      );

      fireEvent.press(queryByTestId('tab-wrapper').props.children[index]);

      expect(navigate).toBeCalledTimes(1);

      expect(navigate).toBeCalledWith(items[index].id);
    });
  });
});
