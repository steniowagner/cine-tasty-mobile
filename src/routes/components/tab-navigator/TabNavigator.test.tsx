jest.unmock('react-native-reanimated');
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes';
import {Routes} from '@routes/routes';

import {TabNavigator} from './TabNavigator';
import items from './items';
import {randomPositiveNumber} from '@mocks/utils';
import {Translations} from '@i18n/tags';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const routes = [
  {
    key: Routes.Tabs.HOME,
    name: Routes.Tabs.HOME,
    id: 'home',
  },
  {
    key: Routes.Tabs.FAMOUS,
    name: Routes.Tabs.FAMOUS,
    id: 'famous',
  },
  {
    key: Routes.Tabs.QUIZ,
    name: Routes.Tabs.QUIZ,
    id: 'quiz',
  },
  {
    key: Routes.Tabs.NEWS,
    name: Routes.Tabs.NEWS,
    id: 'news',
  },
];

const notListedRoute = {
  key: 'NOT_LISTED_ROUTE',
  name: 'NOT_LISTED_ROUTE',
  id: 'not-listed_route',
};

const makeState = (indexTabSelected: number, tabState: any) => ({
  routeNames: items.map(item => item.id),
  index: indexTabSelected,
  routes: routes.map((item, index) => {
    if (index === indexTabSelected) {
      return {
        ...item,
        state: tabState,
      };
    }
    return item;
  }),
});

type RenderTabNavigatorParams = {
  withNotListedRoutes?: boolean;
  indexTabSelected: number;
  tabState: any;
  navigate?: jest.Mock;
};

const renderTabNavigator = (params: RenderTabNavigatorParams) => (
  <ThemeProvider theme={theme}>
    <TabNavigator
      // @ts-ignore
      navigation={{navigate: params.navigate || jest.fn()}}
      // @ts-ignore
      state={makeState(params.indexTabSelected, params.tabState)}
    />
  </ThemeProvider>
);

describe('<TabNavigator />', () => {
  const elements = {
    tabButtons: (api: RenderAPI) => api.queryAllByTestId('tab-button'),
    tabTitles: (api: RenderAPI) => api.queryAllByTestId('tab-title'),
    wrapper: (api: RenderAPI) => api.queryByTestId('tab-wrapper'),
  };

  describe('Rendering', () => {
    describe('When there is not "tab-state"', () => {
      it('should render the tabs-labels correctly', () => {
        const indexTabSelected = randomPositiveNumber(items.length - 1);
        const component = render(
          renderTabNavigator({
            indexTabSelected,
            tabState: false,
          }),
        );
        for (let i = 0; i < elements.tabButtons(component).length; i++) {
          expect(elements.tabTitles(component)[i].children[0]).toEqual(
            `${Translations.Tags.TABS}:${routes[i].id}`,
          );
        }
      });

      it('should render the tabs-icons correctly', () => {
        const indexTabSelected = randomPositiveNumber(items.length - 1);
        const component = render(
          renderTabNavigator({
            indexTabSelected,
            tabState: false,
          }),
        );
        for (let i = 0; i < elements.tabButtons(component).length; i++) {
          const showedIconId = `icon-${routes[i].id}-${
            indexTabSelected === i ? 'active' : 'inactive'
          }`;
          const notShowedIconId = `icon-${routes[i].id}-${
            indexTabSelected === i ? 'inactive' : 'active'
          }`;
          expect(component.queryByTestId(showedIconId)).not.toBeNull();
          expect(component.queryByTestId(notShowedIconId)).toBeNull();
        }
      });
    });

    describe('When the "tab-state" is set', () => {
      describe('When the "tab-state.index" is not a number', () => {
        it('should render the tabs-labels correctly', () => {
          const indexTabSelected = randomPositiveNumber(items.length - 1);
          const component = render(
            renderTabNavigator({
              indexTabSelected,
              tabState: {
                index: undefined,
              },
            }),
          );
          for (let i = 0; i < elements.tabButtons(component).length; i++) {
            expect(elements.tabTitles(component)[i].children[0]).toEqual(
              `${Translations.Tags.TABS}:${routes[i].id}`,
            );
          }
        });

        it('should render the tabs-icons correctly', () => {
          const indexTabSelected = randomPositiveNumber(items.length - 1);
          const component = render(
            renderTabNavigator({
              indexTabSelected,
              tabState: false,
            }),
          );
          for (let i = 0; i < elements.tabButtons(component).length; i++) {
            const showedIconId = `icon-${routes[i].id}-${
              indexTabSelected === i ? 'active' : 'inactive'
            }`;
            const notShowedIconId = `icon-${routes[i].id}-${
              indexTabSelected === i ? 'inactive' : 'active'
            }`;
            expect(component.queryByTestId(showedIconId)).not.toBeNull();
            expect(component.queryByTestId(notShowedIconId)).toBeNull();
          }
        });
      });

      describe('When the "tab-state.index" is a number', () => {
        it('should render the tabs-labels correctly', () => {
          const indexTabSelected = randomPositiveNumber(items.length - 1);
          const component = render(
            renderTabNavigator({
              indexTabSelected,
              tabState: {
                routes: [notListedRoute],
                index: 0,
              },
            }),
          );
          for (let i = 0; i < elements.tabButtons(component).length; i++) {
            expect(elements.tabTitles(component)[i].children[0]).toEqual(
              `${Translations.Tags.TABS}:${routes[i].id}`,
            );
          }
        });

        it('should render the tabs-icons correctly', () => {
          const indexTabSelected = randomPositiveNumber(items.length - 1);
          const component = render(
            renderTabNavigator({
              indexTabSelected,
              tabState: false,
            }),
          );
          for (let i = 0; i < elements.tabButtons(component).length; i++) {
            const showedIconId = `icon-${routes[i].id}-${
              indexTabSelected === i ? 'active' : 'inactive'
            }`;
            const notShowedIconId = `icon-${routes[i].id}-${
              indexTabSelected === i ? 'inactive' : 'active'
            }`;
            expect(component.queryByTestId(showedIconId)).not.toBeNull();
            expect(component.queryByTestId(notShowedIconId)).toBeNull();
          }
        });
      });
    });
  });

  describe('Pressing the items', () => {
    it('should call "navigation.navigate" correctly when the user presses some of the items', () => {
      const navigate = jest.fn();
      const indexTabSelected = randomPositiveNumber(items.length - 1);
      const component = render(
        renderTabNavigator({
          indexTabSelected,
          tabState: false,
          navigate,
        }),
      );
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.tabButtons(component)[indexTabSelected]);
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(items[indexTabSelected].id);
    });
  });
});
