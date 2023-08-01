jest.unmock('react-native-reanimated');
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {InMemoryCache} from '@apollo/client';
import {MockedProvider} from '@apollo/client/testing';

import {TMDBImageQualitiesProvider, AlertMessageProvider} from '@providers';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import * as searchFamousFixtures from '@mocks/fixtures/search-famous';
import {dark as theme} from '@styles/themes';
import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import possibleTypes from '@graphql/possibleTypes.json';
import {randomArrayIndex, randomPositiveNumber} from '@mocks/utils';
import {Routes} from '@routes/routes';
import {CONSTANTS} from '@utils';

import {SEARCH_BY_QUERY_DELAY} from '../useSearchByQuery';
import {SearchFamous} from './SearchFamous';

jest.mock('@utils', () => {
  const actualUtilsModule = jest.requireActual('@utils');
  return {
    ...actualUtilsModule,
  };
});

const utils = require('@utils');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const reactNavigationNativeModule = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...reactNavigationNativeModule,
    useNavigation: () => ({
      getState: jest.fn().mockReturnValue({routes: [{name: 'FAMOUS'}]}),
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

const STORAGE_KEY = `${
  CONSTANTS.KEYS.APP_STORAGE_KEY
}:RECENT_SEARCHES:${SchemaTypes.SearchType.PERSON.toString()}`;

type RenderSearchFamousParams = {
  resolvers: any;
  goBack?: jest.Mock;
  navigate?: jest.Mock;
};

const renderSearchFamous = (params: RenderSearchFamousParams) => {
  const SearchFamousComponent = ({navigation}) => (
    <MockedProvider
      mocks={params.resolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <ThemeProvider theme={theme}>
        <TMDBImageQualitiesProvider>
          <AlertMessageProvider>
            <SearchFamous
              navigation={{
                ...navigation,
                goBack: params.goBack || jest.fn(),
                navigate: params.navigate || jest.fn(),
              }}
            />
          </AlertMessageProvider>
        </TMDBImageQualitiesProvider>
      </ThemeProvider>
    </MockedProvider>
  );
  return (
    <MockedNavigation
      component={SearchFamousComponent}
      extraScreens={[Routes.Famous.DETAILS]}
    />
  );
};

describe('<SearchFamous />', () => {
  const elements = {
    famousList: (api: RenderAPI) => api.queryByTestId('famous-list'),
    searchWrapper: (api: RenderAPI) => api.queryByTestId('searchbar-wrapper'),
    recentSearchesList: (api: RenderAPI) =>
      api.queryByTestId('recent-searches-list'),
    loading: (api: RenderAPI) => api.queryByTestId('famous-loading-list'),
    searchInput: (api: RenderAPI) => api.queryByTestId('search-input'),
    items: (api: RenderAPI) => api.queryAllByTestId('famous-list-item-button'),
    removeRecentSearchButtons: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-close-button'),
    recentSearchedItemButton: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-button'),
    headerCloseButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-close'),
    topReloadButotn: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    listFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    listFoooterPaginating: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    listFooterRepaginate: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    famousTexts: (api: RenderAPI) => api.queryAllByTestId('title-text'),
  };

  describe('Rendering', () => {
    beforeEach(setupTimeTravel);

    it('should render correctly in the "default-state"', async () => {
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({});
      const component = render(renderSearchFamous({resolvers}));
      expect(elements.searchWrapper(component)).not.toBeNull();
      expect(elements.recentSearchesList(component)).toBeNull();
      expect(elements.loading(component)).toBeNull();
      expect(elements.famousList(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should show the "loading-state" after user type some search', async () => {
      const query = 'SOME_QUERY';
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
        query,
      });
      const component = render(renderSearchFamous({resolvers}));
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      expect(elements.loading(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should show the "search-result-items" correctly', async () => {
      const query = 'SOME_QUERY';
      const numberOfItems = randomPositiveNumber(10, 1);
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
        numberOfItems,
        query,
      });
      const component = render(renderSearchFamous({resolvers}));
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.famousList(component)).not.toBeNull();
      expect(elements.items(component).length).toEqual(numberOfItems);
      await waitFor(() => {});
    });
  });

  describe('Pressing items', () => {
    beforeEach(setupTimeTravel);

    it('should call "navigation.navigate" correctly when the user select some item from the "media-list"', async () => {
      const query = 'SOME_QUERY';
      const navigate = jest.fn();
      const numberOfItems = randomPositiveNumber(10, 1);
      const items = searchFamousFixtures.searchFamousResultItems(numberOfItems);
      const indexItemSelected = randomArrayIndex(Array(numberOfItems).fill({}));
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
        numberOfItems,
        query,
      });
      const component = render(renderSearchFamous({resolvers, navigate}));
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.items(component)[indexItemSelected]);
      await waitFor(() => {});
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: items[indexItemSelected].profileImage,
        name: items[indexItemSelected].name,
        id: items[indexItemSelected].id,
      });
    });

    it('should call "storage.set" correctly when the user remove some item from the "recent-searches"', async () => {
      const itemsFromStorage = [
        {
          image: 'SOME_IMAGE',
          title: 'SOME_TITLE',
          id: 'SOME_ID',
        },
      ];
      utils.storage.get = jest.fn().mockResolvedValue(itemsFromStorage);
      utils.storage.set = jest.fn();
      const navigate = jest.fn();
      const numberOfItems = randomPositiveNumber(10, 1);
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
        numberOfItems,
      });
      const component = render(renderSearchFamous({resolvers, navigate}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      fireEvent.press(elements.removeRecentSearchButtons(component)[0]);
      expect(utils.storage.set).toHaveBeenLastCalledWith(STORAGE_KEY, []);
    });

    it('should call "navigation.navigate" when the user presses some of the "recent-searched" items', async () => {
      const itemsFromStorage = [
        {
          image: 'SOME_IMAGE',
          title: 'SOME_TITLE',
          id: 'SOME_ID',
        },
      ];
      utils.storage.get = jest.fn().mockResolvedValue(itemsFromStorage);
      utils.storage.set = jest.fn();
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({});
      const navigate = jest.fn();
      const component = render(renderSearchFamous({resolvers, navigate}));
      await waitFor(() => {});
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.recentSearchedItemButton(component)[0]);
      expect(navigate).toHaveBeenCalledTimes(1);
    });

    it('should call "navigation.goBack" when the user presses the "close-search" button', async () => {
      const goBack = jest.fn();
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({});
      const component = render(renderSearchFamous({resolvers, goBack}));
      expect(goBack).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.headerCloseButton(component));
      expect(goBack).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });

    describe('When never searched before', () => {
      it('should call "storage.set" correctly when the user selects some item from the "media-list"', async () => {
        utils.storage.set = jest.fn();
        utils.storage.get = jest.fn().mockResolvedValue([]);
        const query = 'SOME_QUERY';
        const navigate = jest.fn();
        const numberOfItems = randomPositiveNumber(10, 1);
        const items =
          searchFamousFixtures.searchFamousResultItems(numberOfItems);
        const indexItemSelected = randomArrayIndex(items);
        const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
          numberOfItems,
          query,
        });
        const component = render(renderSearchFamous({resolvers, navigate}));
        fireEvent(elements.searchInput(component), 'onChangeText', query);
        act(() => {
          timeTravel(SEARCH_BY_QUERY_DELAY);
        });
        act(() => {
          jest.runAllTimers();
        });
        expect(utils.storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.items(component)[indexItemSelected]);
        await waitFor(() => {});
        expect(utils.storage.set).toHaveBeenCalledTimes(1);
        expect(utils.storage.set).toHaveBeenCalledWith(STORAGE_KEY, [
          {
            image: items[indexItemSelected].profileImage,
            title: items[indexItemSelected].name,
            id: items[indexItemSelected].id,
          },
        ]);
      });
    });

    describe('When has searched before', () => {
      it('should call "storage.set" correctly when the user selects some item from the "media-list"', async () => {
        const itemsFromStorage = [
          {
            __typename: 'BasePerson',
            image: 'SOME_IMAGE',
            title: 'SOME_TITLE',
            id: 'SOME_ID',
          },
        ];
        utils.storage.get = jest.fn().mockResolvedValue(itemsFromStorage);
        utils.storage.set = jest.fn();
        const query = 'SOME_QUERY';
        const navigate = jest.fn();
        const numberOfItems = randomPositiveNumber(10, 1);
        const items =
          searchFamousFixtures.searchFamousResultItems(numberOfItems);
        const indexItemSelected = randomArrayIndex(items);
        const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
          numberOfItems,
          query,
        });
        const component = render(renderSearchFamous({resolvers, navigate}));
        fireEvent(elements.searchInput(component), 'onChangeText', query);
        act(() => {
          timeTravel(SEARCH_BY_QUERY_DELAY);
        });
        act(() => {
          jest.runAllTimers();
        });
        expect(utils.storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.items(component)[indexItemSelected]);
        await waitFor(() => {});
        expect(utils.storage.set).toHaveBeenCalledTimes(1);
        expect(utils.storage.set).toHaveBeenCalledWith(STORAGE_KEY, [
          {
            image: items[indexItemSelected].profileImage,
            title: items[indexItemSelected].name,
            id: items[indexItemSelected].id,
          },
          ...itemsFromStorage,
        ]);
      });

      it('should call "storage.set" correctly when the user selects some item from the "media-list" that was previously searched', async () => {
        utils.storage.set = jest.fn();
        const query = 'SOME_QUERY';
        const navigate = jest.fn();
        const numberOfItems = randomPositiveNumber(10, 1);
        const items =
          searchFamousFixtures.searchFamousResultItems(numberOfItems);
        const indexItemSelected = randomArrayIndex(items);
        const previouslySearches = [
          {
            image: 'OTHER_IMAGE',
            title: 'OTHER_TITLE',
            id: 'OTHER_ID',
          },
          {
            image: items[indexItemSelected].profileImage,
            title: items[indexItemSelected].name,
            id: items[indexItemSelected].id,
          },
        ];
        utils.storage.get = jest.fn().mockResolvedValue(previouslySearches);
        const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
          numberOfItems,
          query,
        });
        const component = render(renderSearchFamous({resolvers, navigate}));
        fireEvent(elements.searchInput(component), 'onChangeText', query);
        act(() => {
          timeTravel(SEARCH_BY_QUERY_DELAY);
        });
        act(() => {
          jest.runAllTimers();
        });
        expect(utils.storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.items(component)[indexItemSelected]);
        await waitFor(() => {});
        expect(utils.storage.set).toHaveBeenCalledTimes(1);
        expect(utils.storage.set).toHaveBeenCalledWith(STORAGE_KEY, [
          previouslySearches[1],
          previouslySearches[0],
        ]);
      });
    });
  });

  describe('Reseting pagination', () => {
    beforeEach(setupTimeTravel);

    it('should reset the state when the user totally wipe the query', () => {
      const query = 'SOME_QUERY';
      const resolvers = searchFamousFixtures.makeEntryQuerySuccessResolver({
        numberOfItems: 1,
        query,
      });
      const component = render(renderSearchFamous({resolvers}));
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.items(component).length).toBeGreaterThan(0);
      fireEvent(elements.searchInput(component), 'onChangeText', '');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.items(component).length).toEqual(0);
      expect(elements.loading(component)).toBeNull();
      expect(elements.recentSearchesList(component)).toBeNull();
      expect(elements.topReloadButotn(component)).toBeNull();
      expect(elements.listFooter(component)).toBeNull();
    });
  });

  describe('When paginate succesfully', () => {
    beforeEach(setupTimeTravel);

    it('should render correctly the "pagination-state"', async () => {
      const query = 'SOME_QUERY';
      const component = render(
        renderSearchFamous({
          resolvers: searchFamousFixtures.makePaginationSuccessResolver({
            query,
          }),
        }),
      );
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {});
      expect(elements.items(component).length).toBeGreaterThan(0);
      fireEvent(elements.famousList(component), 'onEndReached');
      await waitFor(() => {
        expect(elements.listFooter(component)).not.toBeNull();
        expect(elements.listFoooterPaginating(component)).not.toBeNull();
        expect(elements.listFooterRepaginate(component)).toBeNull();
      });
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.listFooter(component)).toBeNull();
        expect(elements.listFoooterPaginating(component)).toBeNull();
        expect(elements.listFooterRepaginate(component)).toBeNull();
      });
    });

    it('should show items from both first and second queries', async () => {
      const query = 'SOME_QUERY';
      const numberOfEntryQueryItems = randomPositiveNumber(10, 1);
      const numberOfPaginationItems = randomPositiveNumber(10, 1);
      const entryQueryItems = searchFamousFixtures.searchFamousResultItems(
        numberOfEntryQueryItems,
      );
      const paginationItems = searchFamousFixtures.searchFamousResultItems(
        numberOfPaginationItems,
      );
      const component = render(
        renderSearchFamous({
          resolvers: searchFamousFixtures.makePaginationSuccessResolver({
            numberOfItems: numberOfEntryQueryItems,
            paginationNumberOfItems: numberOfPaginationItems,
            query,
          }),
        }),
      );
      fireEvent(elements.searchInput(component), 'onChangeText', query);
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {});
      expect(elements.items(component).length).toEqual(entryQueryItems.length);
      for (let i = 0; i < elements.items(component).length; i++) {
        expect(elements.famousTexts(component)[i].children[0]).toEqual(
          entryQueryItems[i].name,
        );
      }
      fireEvent(elements.famousList(component), 'onEndReached');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.items(component).length).toEqual(
        entryQueryItems.length + paginationItems.length,
      );
      const properArrayItems = [...entryQueryItems, ...paginationItems];
      for (let i = 0; i < elements.items(component).length; i++) {
        expect(elements.famousTexts(component)[i].children[0]).toEqual(
          properArrayItems[i].name,
        );
      }
      await waitFor(() => {});
    });
  });

  describe('When some error happens', () => {
    describe('Entry query', () => {
      describe('When the error is a "GraphQL-error"', () => {
        beforeEach(setupTimeTravel);

        it('should show the "top-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makeEntryGraphQLError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {
            expect(elements.topReloadButotn(component)).not.toBeNull();
          });
        });

        it('should show the "loading-state" when the user presses the "top-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makeEntryGraphQLError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {
            expect(elements.topReloadButotn(component)).not.toBeNull();
          });
          expect(elements.loading(component)).toBeNull();
          fireEvent.press(elements.topReloadButotn(component));
          expect(elements.loading(component)).not.toBeNull();
        });

        describe('Showing the "error-message"', () => {
          it('should render the "error-message" correctly when has some error during the entry', async () => {
            const query = 'SOME_QUERY';
            const component = render(
              renderSearchFamous({
                resolvers: searchFamousFixtures.makeEntryGraphQLError({
                  query,
                }),
              }),
            );
            fireEvent(elements.searchInput(component), 'onChangeText', query);
            act(() => {
              timeTravel(SEARCH_BY_QUERY_DELAY);
            });
            await waitFor(() => {});
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
            );
          });
        });
      });

      describe('When the error is a "Network-error"', () => {
        beforeEach(setupTimeTravel);

        it('should show the "top-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makeEntryNetowrkError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {
            expect(elements.topReloadButotn(component)).not.toBeNull();
          });
        });

        it('should show the "loading-state" when the user presses the "top-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makeEntryNetowrkError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {
            expect(elements.topReloadButotn(component)).not.toBeNull();
          });
          expect(elements.loading(component)).toBeNull();
          fireEvent.press(elements.topReloadButotn(component));
          expect(elements.loading(component)).not.toBeNull();
        });

        describe('Showing the "error-message"', () => {
          it('should render the "error-message" correctly when has some error during the entry', async () => {
            const query = 'SOME_QUERY';
            const component = render(
              renderSearchFamous({
                resolvers: searchFamousFixtures.makeEntryNetowrkError({
                  query,
                }),
              }),
            );
            fireEvent(elements.searchInput(component), 'onChangeText', query);
            act(() => {
              timeTravel(SEARCH_BY_QUERY_DELAY);
            });
            await waitFor(() => {});
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
            );
          });
        });
      });
    });

    describe('Pagination', () => {
      describe('When the error is a "GraphQL-error"', () => {
        beforeEach(setupTimeTravel);

        it('should show the "footer-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makePaginationGraphQLError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {});
          expect(elements.items(component).length).toBeGreaterThan(0);
          fireEvent(elements.famousList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.listFooter(component)).not.toBeNull();
            expect(elements.listFooterRepaginate(component)).not.toBeNull();
            expect(elements.listFoooterPaginating(component)).toBeNull();
          });
        });

        it('should show the "paginating-state" when the user persses the "footer-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makePaginationGraphQLError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {});
          expect(elements.items(component).length).toBeGreaterThan(0);
          fireEvent(elements.famousList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.listFooter(component)).not.toBeNull();
            expect(elements.listFooterRepaginate(component)).not.toBeNull();
          });
          fireEvent.press(elements.listFooterRepaginate(component));
          expect(elements.listFoooterPaginating(component)).not.toBeNull();
        });

        describe('Showing the "error-message"', () => {
          it('should show the "error-message" correctly when has some error during the pagination', async () => {
            const query = 'SOME_QUERY';
            const component = render(
              renderSearchFamous({
                resolvers: searchFamousFixtures.makePaginationGraphQLError({
                  query,
                }),
              }),
            );
            fireEvent(elements.searchInput(component), 'onChangeText', query);
            act(() => {
              timeTravel(SEARCH_BY_QUERY_DELAY);
            });
            await waitFor(() => {});
            expect(elements.items(component).length).toBeGreaterThan(0);
            fireEvent(elements.famousList(component), 'onEndReached');
            await waitFor(() => {
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
              );
            });
          });
        });
      });

      describe('When the error is a "Network-error"', () => {
        beforeEach(setupTimeTravel);

        it('should show the "footer-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makePaginationNetworkError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {});
          expect(elements.items(component).length).toBeGreaterThan(0);
          fireEvent(elements.famousList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.listFooter(component)).not.toBeNull();
            expect(elements.listFooterRepaginate(component)).not.toBeNull();
            expect(elements.listFoooterPaginating(component)).toBeNull();
          });
        });

        it('should show the "paginating-state" when the user persses the "footer-reload" button', async () => {
          const query = 'SOME_QUERY';
          const component = render(
            renderSearchFamous({
              resolvers: searchFamousFixtures.makePaginationNetworkError({
                query,
              }),
            }),
          );
          fireEvent(elements.searchInput(component), 'onChangeText', query);
          act(() => {
            timeTravel(SEARCH_BY_QUERY_DELAY);
          });
          await waitFor(() => {});
          expect(elements.items(component).length).toBeGreaterThan(0);
          fireEvent(elements.famousList(component), 'onEndReached');
          await waitFor(() => {
            expect(elements.listFooter(component)).not.toBeNull();
            expect(elements.listFooterRepaginate(component)).not.toBeNull();
          });
          fireEvent.press(elements.listFooterRepaginate(component));
          expect(elements.listFoooterPaginating(component)).not.toBeNull();
        });

        describe('Showing the "error-message"', () => {
          it('should show the "error-message" correctly when has some error during the pagination', async () => {
            const query = 'SOME_QUERY';
            const component = render(
              renderSearchFamous({
                resolvers: searchFamousFixtures.makePaginationNetworkError({
                  query,
                }),
              }),
            );
            fireEvent(elements.searchInput(component), 'onChangeText', query);
            act(() => {
              timeTravel(SEARCH_BY_QUERY_DELAY);
            });
            await waitFor(() => {});
            expect(elements.items(component).length).toBeGreaterThan(0);
            fireEvent(elements.famousList(component), 'onEndReached');
            await waitFor(() => {
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
              );
            });
          });
        });
      });
    });
  });
});
