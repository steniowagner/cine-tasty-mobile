import React from 'react';
import {
  RenderAPI,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Routes } from '@/navigation/routes';
import { dark as theme } from '@styles/themes';
import { Translations } from '@i18n/tags';

import { ANIMATION_DURATION } from './use-tab-navigator';
import { WRAPPER_HEIGHT } from './TabNavigator.styles';
import { TabNavigator } from './TabNavigator';
import tabs from './tabs';

type RenderTabNavigatorParams = {
  navigate?: jest.Mock;
  currentRoute?: string;
  state: Record<string, any>;
};

const renderTabNavigator = (params: RenderTabNavigatorParams) => (
  <ThemeProvider theme={theme}>
    <TabNavigator
      // @ts-ignore
      state={params.state}
      // @ts-ignore
      navigation={{ navigate: params.navigate || jest.fn() }}
    />
  </ThemeProvider>
);

const routes = tabs.map(tab => {
  const idParts = tab.id.split('/');
  return {
    key: tab.id,
    name: tab.id,
    id: idParts[idParts.length - 1],
  };
});

const makeState = (indexCurrentTab: number) => ({
  routeNames: tabs.map(tab => tab.id),
  index: indexCurrentTab,
  routes: routes.map((item, index) => {
    if (index === indexCurrentTab) {
      return {
        ...item,
        state: {},
      };
    }
    return item;
  }),
});

describe('Navigation/components/TabNavigator', () => {
  const elements = {
    buttons: (api: RenderAPI) => api.getAllByTestId('tab-button'),
    titles: (api: RenderAPI) => api.getAllByTestId('tab-title'),
    wrapper: (api: RenderAPI) => api.getByTestId('tab-wrapper'),
    icons: (api: RenderAPI) => api.getAllByTestId(/icon-/),
  };

  describe('Rendering the component', () => {
    describe('Tab-Icons', () => {
      test.each(tabs)(
        'should render the "Icons" of the tab %p correctly',
        tab => {
          const indexCurrentTab = tabs.findIndex(
            tabItem => tabItem.id === tab.id,
          );
          const component = render(
            renderTabNavigator({
              state: makeState(indexCurrentTab),
            }),
          );
          expect(
            elements.titles(component)[indexCurrentTab].children[0],
          ).toEqual(
            `${Translations.Tabs}:${routes[indexCurrentTab].id.toLowerCase()}`,
          );
          for (let i = 0; i < tabs.length; i++) {
            if (i === indexCurrentTab) {
              expect(
                component.getByTestId(`icon-${tab.activeIcon}`),
              ).not.toBeNull();
              expect(
                component.queryByTestId(`icon-${tab.inactiveIcon}`),
              ).toBeNull();
            }
          }
        },
      );
    });

    describe('Tab-Titles', () => {
      test.each(tabs)(
        'should render the "titles" of the tab %p correctly',
        tab => {
          const indexCurrentTab = tabs.findIndex(
            tabItem => tabItem.id === tab.id,
          );
          const component = render(
            renderTabNavigator({
              state: makeState(indexCurrentTab),
            }),
          );
          expect(
            elements.titles(component)[indexCurrentTab].children[0],
          ).toEqual(
            `${Translations.Tabs}:${routes[indexCurrentTab].id.toLowerCase()}`,
          );
        },
      );
    });
  });

  describe('Pressing the tabs', () => {
    test.each(tabs)(
      'should call "navigation.navigate" correctly when pressing the tab %p',
      tab => {
        const indexCurrentTab = tabs.findIndex(
          tabItem => tabItem.id === tab.id,
        );
        const state = makeState(indexCurrentTab);
        const navigate = jest.fn();
        const component = render(
          renderTabNavigator({
            navigate,
            state,
          }),
        );
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.buttons(component)[indexCurrentTab]);
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate.mock.calls[0][0]).toEqual(routes[indexCurrentTab].key);
      },
    );
  });

  describe('Showing/Hiding TabNavigator with animation', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    const getState = (currentRouteName: string | Routes.Tabs) => ({
      routeNames: tabs.map(tab => tab.id),
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

    it('should run the "hide-animation" when the "current screen" is "not allowed" to show the TabNavigator', () => {
      // visible
      const component = render(
        renderTabNavigator({ state: getState(Routes.Home.HOME) }),
      );
      expect(elements.wrapper(component)).toHaveAnimatedStyle({
        transform: [
          {
            translateY: 0,
          },
        ],
      });
      // hidden;
      component.rerender(
        renderTabNavigator({ state: getState('NOT_ALLOWED_ROUTE') }),
      );
      jest.advanceTimersByTime(ANIMATION_DURATION);
      expect(elements.wrapper(component)).toHaveAnimatedStyle({
        transform: [
          {
            translateY: WRAPPER_HEIGHT,
          },
        ],
      });
    });

    it('should run the "show-animation" when the "current screen" is "allowed" to show the TabNavigator', () => {
      // hidden
      const component = render(
        renderTabNavigator({ state: getState('NOT_ALLOWED_ROUTE') }),
      );
      jest.advanceTimersByTime(ANIMATION_DURATION);
      expect(elements.wrapper(component)).toHaveAnimatedStyle({
        transform: [
          {
            translateY: WRAPPER_HEIGHT,
          },
        ],
      });
      // visible;
      component.rerender(
        renderTabNavigator({ state: getState(Routes.Home.HOME) }),
      );
      jest.advanceTimersByTime(ANIMATION_DURATION);
      expect(elements.wrapper(component)).toHaveAnimatedStyle({
        transform: [
          {
            translateY: 0,
          },
        ],
      });
    });
  });
});
