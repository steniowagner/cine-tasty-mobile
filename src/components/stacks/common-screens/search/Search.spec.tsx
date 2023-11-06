import React from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { AlertMessageProvider, TMDBImageQualitiesProvider } from '@/providers';
import { Translations } from '@/i18n/tags';
import { Routes } from '@/navigation';

import { BASE_STORAGE_KEY } from './components/recent-searches/use-recent-searches';
import {
  mockSearchEntryQuerySuccessResponse,
  mockSearchEntryQueryErrorResponse,
  MockedNavigator,
  randomPositiveNumber,
  SEARCH_ITEMS_PER_PAGE,
  searchItemsList,
  mockSearchPaginationQuerySuccessResponse,
  mockSearchPaginationQueryErrorResponse,
} from '../../../../../__mocks__';
import { SearchNavigationProps as SearchProps } from './types';
import { SearchEntryRoutes, SearchType } from './types';
import { Search } from './Search';

const searchTypes = Object.keys(SearchType) as SearchType[];
const query = 'SOME_QUERY';

const searchTypeNavigationParamsMapping = (
  searchType: SearchType,
  indexItemSelected: number,
) => {
  const mapping: Record<SearchType, any[]> = {
    [SearchType.FAMOUS]: [
      Routes.Famous.DETAILS,
      {
        profilePath: searchItemsList()[indexItemSelected].image,
        name: searchItemsList()[indexItemSelected].title,
        id: searchItemsList()[indexItemSelected].id,
      },
    ],
    [SearchType.MOVIE]: [Routes.Home.MOVIE_DETAILS],
    [SearchType.TV]: [Routes.Home.TV_SHOW_DETAILS],
  };
  return mapping[searchType];
};

const searchTypeEntryErrorMapping: Record<SearchType, string> = {
  [SearchType.FAMOUS]: Translations.SearchFamous.ENTRY_ERROR,
  [SearchType.MOVIE]: Translations.TrendingFamous.ENTRY_ERROR,
  [SearchType.TV]: Translations.TrendingFamous.ENTRY_ERROR,
};

jest.mock('@utils', () => ({
  isEqualsOrLargerThanIphoneX: jest.fn().mockReturnValue(true),
  getStatusBarHeight: jest.fn().mockReturnValue(10),
  renderSVGIconConditionally: () => <></>,
  storage: {
    set: jest.fn(),
    get: jest.fn(),
  },
}));

const utils = require('@/utils');

type RenderSearchProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
  searchType: SearchType;
  navigate?: jest.Mock;
  goBack?: jest.Mock;
};

const renderSearch = (props: RenderSearchProps) => {
  const searchTypeRouteMapping: Record<SearchType, SearchEntryRoutes> = {
    [SearchType.FAMOUS]: Routes.Famous.SEARCH_FAMOUS,
    [SearchType.MOVIE]: Routes.Home.SEARCH_MOVIE,
    [SearchType.TV]: Routes.Home.SEARCH_TV_SHOW,
  };
  const route = searchTypeRouteMapping[props.searchType];
  const SearchComponent = (searchComponentProps: SearchProps) => (
    <MockedProvider
      mocks={props.mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <TMDBImageQualitiesProvider>
        <AlertMessageProvider>
          <Search
            route={{
              name: route,
              key: `${route}-key`,
              params: {
                type: props.searchType,
              },
            }}
            navigation={{
              ...searchComponentProps.navigation,
              navigate: props.navigate || jest.fn(),
              goBack: props.goBack || jest.fn(),
            }}
          />
        </AlertMessageProvider>
      </TMDBImageQualitiesProvider>
    </MockedProvider>
  );
  return <MockedNavigator component={SearchComponent} />;
};

describe('Common-screens/Search', () => {
  const elements = {
    recentSearchesList: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list'),
    recentSearches: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-button'),
    headerCloseButton: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-close'),
    searchItems: (api: RenderAPI) => api.queryAllByTestId('search-item'),
    searchInput: (api: RenderAPI) => api.getByTestId('search-input'),
    loading: (api: RenderAPI) => api.queryByTestId('default-tmdb-list-loading'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    alertMessageIcon: (api: RenderAPI) =>
      api.queryByTestId('alert-message-icon'),
    paginationFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoading: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationReload: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    searchList: (api: RenderAPI) => api.queryByTestId('search-list'),
    searchItemsTitles: (api: RenderAPI) => api.queryAllByTestId('title-text'),
  };

  describe('Entry-query', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test.each(searchTypes)(
      'should show the "loading-state" when it is querying for %p',
      async searchType => {
        const mocks = mockSearchEntryQuerySuccessResponse({
          hasMore: true,
          type: searchType,
          query,
        });
        const navigate = jest.fn();
        const component = render(
          renderSearch({
            searchType,
            navigate,
            mocks,
          }),
        );
        act(() => {
          fireEvent(elements.searchInput(component), 'onChangeText', query);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).not.toBeNull();
        });
      },
    );

    test.each(searchTypes)(
      'should reset the "search-list" when change the "query" to "" and it is querying for %p',
      async searchType => {
        const mocks = mockSearchEntryQuerySuccessResponse({
          hasMore: true,
          type: searchType,
          query,
        });
        const navigate = jest.fn();
        const component = render(
          renderSearch({
            searchType,
            navigate,
            mocks,
          }),
        );
        act(() => {
          fireEvent(elements.searchInput(component), 'onChangeText', query);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.searchItems(component).length).toEqual(
            SEARCH_ITEMS_PER_PAGE,
          );
        });
        act(() => {
          fireEvent(elements.searchInput(component), 'onChangeText', '');
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.searchItems(component).length).toEqual(0);
        });
      },
    );

    describe('When querying successfuly', () => {
      test.each(searchTypes)(
        'should show the items %p-items correctly',
        async searchType => {
          const mocks = mockSearchEntryQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
        },
      );
    });

    describe('When querying with some error', () => {
      test.each(searchTypes)(
        'should show the "alert-error-message" correctly when "search-type" is %p',
        async searchType => {
          const mocks = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component)!.children[0]).toEqual(
              searchTypeEntryErrorMapping[searchType],
            );
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should show the "top-reload" button when "search-type" is %p',
        async searchType => {
          const mocks = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should not show any "search-list-item" when "search-type" is %p',
        async searchType => {
          const mocks = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(0);
          });
        },
      );
    });

    describe('Retrying', () => {
      test.each(searchTypes)(
        'should show the "loading-state" when it is retrying to search for %p',
        async searchType => {
          const mocks = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          act(() => {
            fireEvent.press(elements.topReloadButton(component)!);
          });
          await waitFor(() => {
            expect(elements.loading(component)).not.toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should show the "search-items" when it successfuly retry to search for %p',
        async searchType => {
          const entryQuery = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const retryQuery = mockSearchEntryQuerySuccessResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks: [...entryQuery, ...retryQuery],
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          expect(elements.searchItems(component).length).toEqual(0);
          act(() => {
            fireEvent.press(elements.topReloadButton(component)!);
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
        },
      );

      test.each(searchTypes)(
        'should show the "alert-error-message" when the "retry-response" returns "another error" for %p',
        async searchType => {
          const entryQuery = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const retryQuery = mockSearchEntryQueryErrorResponse({
            hasMore: false,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks: [...entryQuery, ...retryQuery],
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          act(() => {
            fireEvent.press(elements.topReloadButton(component)!);
          });
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component)!.children[0]).toEqual(
              searchTypeEntryErrorMapping[searchType],
            );
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
        },
      );
    });
  });

  describe('Pagination-query', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test.each(searchTypes)(
      'should show the "paginating-state" when it is querying for %p',
      async searchType => {
        const mocks = mockSearchPaginationQuerySuccessResponse({
          hasMore: true,
          type: searchType,
          query,
        });
        const navigate = jest.fn();
        const component = render(
          renderSearch({
            searchType,
            navigate,
            mocks,
          }),
        );
        act(() => {
          fireEvent(elements.searchInput(component), 'onChangeText', query);
        });
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.searchItems(component).length).toBeGreaterThan(0);
        });
        act(() => {
          fireEvent(elements.searchList(component)!, 'onEndReached');
        });
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).not.toBeNull();
        await waitFor(() => {});
      },
    );

    describe('When paginating successfuly', () => {
      test.each(searchTypes)(
        'should render correctly when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).toBeNull();
            expect(elements.loading(component)).toBeNull();
            expect(elements.topReloadButton(component)).toBeNull();
            expect(elements.paginationFooter(component)).toBeNull();
            expect(elements.searchList(component)).not.toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should render the "news-list" with the correct size when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component)!.length).toEqual(
              SEARCH_ITEMS_PER_PAGE * 2,
            );
          });
        },
      );

      test.each(searchTypes)(
        'should render the "news-list items" correctly when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component)!.length).toEqual(
              SEARCH_ITEMS_PER_PAGE * 2,
            );
          });
          for (let i = 0; i < SEARCH_ITEMS_PER_PAGE * 2; i++) {
            if (i < SEARCH_ITEMS_PER_PAGE) {
              expect(
                (
                  elements.searchItemsTitles(component)[i]!
                    .children[0] as string
                ).startsWith('page1'),
              ).toEqual(true);
            } else {
              expect(
                (
                  elements.searchItemsTitles(component)[i]!
                    .children[0] as string
                ).startsWith('page2'),
              ).toEqual(true);
            }
          }
        },
      );
    });

    describe('When paginating with errors', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      test.each(searchTypes)(
        'should show the "alert-message-error" correctly when it is querying for %p',
        async searchType => {
          const searchTypePaginationErrorMapping: Record<SearchType, string> = {
            [SearchType.FAMOUS]: Translations.SearchFamous.PAGINATION_ERROR,
            [SearchType.MOVIE]: Translations.TrendingFamous.PAGINATION_ERROR,
            [SearchType.TV]: Translations.TrendingFamous.PAGINATION_ERROR,
          };
          const mocks = mockSearchPaginationQueryErrorResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component)!.children[0]).toEqual(
              searchTypePaginationErrorMapping[searchType],
            );
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should "keep" the "items" received from the "entry-query" when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQueryErrorResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
        },
      );

      test.each(searchTypes)(
        'should show the "bottom-reload-pagination" when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQueryErrorResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.paginationReload(component)).not.toBeNull();
          });
        },
      );
    });

    describe('Retrying', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      test.each(searchTypes)(
        'should show the "pagination-state" when "retrying" to "paginate" when it is querying for %p',
        async searchType => {
          const mocks = mockSearchPaginationQueryErrorResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.paginationReload(component)).not.toBeNull();
          });
          act(() => {
            fireEvent.press(elements.paginationReload(component)!);
          });
          await waitFor(() => {
            expect(elements.paginationLoading(component)).not.toBeNull();
          });
        },
      );

      test.each(searchTypes)(
        'should show the "news-list-items" correctly when the "retry-response" returns "success" when it is querying for %p',
        async searchType => {
          const mocks = [
            ...mockSearchEntryQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
            ...mockSearchPaginationQueryErrorResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
            ...mockSearchPaginationQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
          ];
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.paginationReload(component)).not.toBeNull();
          });
          act(() => {
            fireEvent.press(elements.paginationReload(component)!);
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE * 2,
            );
          });
          for (let i = 0; i < SEARCH_ITEMS_PER_PAGE * 2; i++) {
            if (i < SEARCH_ITEMS_PER_PAGE) {
              expect(
                (
                  elements.searchItemsTitles(component)[i]!
                    .children[0] as string
                ).startsWith('page1'),
              ).toEqual(true);
            } else {
              expect(
                (
                  elements.searchItemsTitles(component)[i]!
                    .children[0] as string
                ).startsWith('page2'),
              ).toEqual(true);
            }
          }
        },
      );

      test.each(searchTypes)(
        'should show the "alert-error-message" when the "retry-response" returns "another error" and it is querying for %p',
        async searchType => {
          const searchTypePaginationErrorMapping: Record<SearchType, string> = {
            [SearchType.FAMOUS]: Translations.SearchFamous.PAGINATION_ERROR,
            [SearchType.MOVIE]: Translations.TrendingFamous.PAGINATION_ERROR,
            [SearchType.TV]: Translations.TrendingFamous.PAGINATION_ERROR,
          };
          const mocks = [
            ...mockSearchEntryQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
            ...mockSearchPaginationQueryErrorResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
            ...mockSearchPaginationQueryErrorResponse({
              hasMore: true,
              type: searchType,
              query,
            }),
          ];
          const navigate = jest.fn();
          const component = render(
            renderSearch({
              searchType,
              navigate,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toBeGreaterThan(0);
          });
          act(() => {
            fireEvent(elements.searchList(component)!, 'onEndReached');
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component)!.children[0]).toEqual(
              searchTypePaginationErrorMapping[searchType],
            );
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).toBeNull();
          });
          act(() => {
            fireEvent.press(elements.paginationReload(component)!);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component)!.children[0]).toEqual(
              searchTypePaginationErrorMapping[searchType],
            );
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
        },
      );
    });
  });

  describe('Recent searches', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test.each(searchTypes)(
      'should show "recent-searches" when has some "previously-searched-items" for %p',
      async searchType => {
        (utils.storage.get as jest.Mock).mockResolvedValueOnce([
          {
            title: 'PERSISTED_ITEM_TITLE',
            image: 'PERSISTED_ITEM_IMAGE',
            id: 10,
          },
        ]);
        const mocks = mockSearchEntryQuerySuccessResponse({
          hasMore: true,
          type: searchType,
          query: 'SOME_QUERY',
        });
        const navigate = jest.fn();
        const component = render(
          renderSearch({
            searchType,
            navigate,
            mocks,
          }),
        );
        await waitFor(() => {
          expect(elements.recentSearchesList(component)).not.toBeNull();
          expect(elements.searchList(component)).toBeNull();
        });
      },
    );

    test.each(searchTypes)(
      'should not show "recent-searches" when has no "previously-searched-items" for %p',
      async searchType => {
        const mocks = mockSearchEntryQuerySuccessResponse({
          hasMore: true,
          type: searchType,
          query: 'SOME_QUERY',
        });
        const navigate = jest.fn();
        const component = render(
          renderSearch({
            searchType,
            navigate,
            mocks,
          }),
        );
        await waitFor(() => {
          expect(elements.recentSearchesList(component).length).toEqual(0);
        });
      },
    );

    describe('Persisting items to "recent-searches-list"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      test.each(searchTypes)(
        'should persist the selected item into the "recent-searched-items" when "recent-searched-list" is empty for %p',
        async searchType => {
          const mocks = mockSearchEntryQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const component = render(
            renderSearch({
              searchType,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
          const indexItemSelected = randomPositiveNumber(
            elements.searchItems(component).length - 1,
          );
          expect(utils.storage.set).toBeCalledTimes(0);
          act(() => {
            fireEvent.press(elements.searchItems(component)[indexItemSelected]);
          });
          await waitFor(() => {
            expect(utils.storage.set).toBeCalledTimes(1);
            expect(utils.storage.set).toBeCalledWith(
              `${BASE_STORAGE_KEY}:${searchType}`,
              [
                {
                  image: searchItemsList()[indexItemSelected].image,
                  title: searchItemsList()[indexItemSelected].title,
                  id: searchItemsList()[indexItemSelected].id,
                },
              ],
            );
          });
        },
      );

      test.each(searchTypes)(
        'should persist a "selected-item" that was already "previously searched" correctly for %p',
        async searchType => {
          (utils.storage.get as jest.Mock).mockResolvedValue([
            searchItemsList()[0],
            searchItemsList()[1],
          ]);
          const mocks = mockSearchEntryQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const component = render(
            renderSearch({
              searchType,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
          act(() => {
            fireEvent.press(elements.searchItems(component)[1]);
          });
          await waitFor(() => {
            expect(utils.storage.set).toBeCalledTimes(1);
          });
          expect(utils.storage.set).lastCalledWith(
            `${BASE_STORAGE_KEY}:${searchType}`,
            [
              {
                image: searchItemsList()[1].image,
                title: searchItemsList()[1].title,
                id: searchItemsList()[1].id,
              },
              {
                image: searchItemsList()[0].image,
                title: searchItemsList()[0].title,
                id: searchItemsList()[0].id,
              },
            ],
          );
        },
      );

      test.each(searchTypes)(
        'should persist the selected item into the "recent-searched-items" when the item was never searched before is empty for %p',
        async searchType => {
          (utils.storage.get as jest.Mock).mockResolvedValue([
            searchItemsList()[0],
            searchItemsList()[1],
          ]);
          const mocks = mockSearchEntryQuerySuccessResponse({
            hasMore: true,
            type: searchType,
            query,
          });
          const component = render(
            renderSearch({
              searchType,
              mocks,
            }),
          );
          act(() => {
            fireEvent(elements.searchInput(component), 'onChangeText', query);
          });
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.searchItems(component).length).toEqual(
              SEARCH_ITEMS_PER_PAGE,
            );
          });
          act(() => {
            fireEvent.press(elements.searchItems(component)[2]);
          });
          await waitFor(() => {
            expect(utils.storage.set).toBeCalledTimes(1);
          });
          expect(utils.storage.set).lastCalledWith(
            `${BASE_STORAGE_KEY}:${searchType}`,
            [
              {
                image: searchItemsList()[2].image,
                title: searchItemsList()[2].title,
                id: searchItemsList()[2].id,
              },
              {
                image: searchItemsList()[0].image,
                title: searchItemsList()[0].title,
                id: searchItemsList()[0].id,
              },
              {
                image: searchItemsList()[1].image,
                title: searchItemsList()[1].title,
                id: searchItemsList()[1].id,
              },
            ],
          );
        },
      );
    });
  });

  describe('Navigating', () => {
    describe('To "details-screen"', () => {
      describe('From "recent-searches"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        test.each(searchTypes)(
          'should navigate to "details-screen" correctly when "search-type" is %p',
          async searchType => {
            const persistedItems = [
              {
                title: 'PERSISTED_ITEM_TITLE',
                image: 'PERSISTED_ITEM_IMAGE',
                id: 10,
              },
            ];
            (utils.storage.get as jest.Mock).mockResolvedValueOnce(
              persistedItems,
            );
            const mocks = mockSearchEntryQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query: 'SOME_QUERY',
            });
            const navigate = jest.fn();
            const component = render(
              renderSearch({
                searchType,
                navigate,
                mocks,
              }),
            );
            await waitFor(() => {
              expect(elements.recentSearchesList(component)).not.toBeNull();
            });
            expect(navigate).toBeCalledTimes(0);
            fireEvent.press(elements.recentSearches(component)[0]);
            const mockCallParams: Record<SearchType, any[]> = {
              [SearchType.FAMOUS]: [
                Routes.Famous.DETAILS,
                {
                  profilePath: persistedItems[0].image,
                  name: persistedItems[0].title,
                  id: persistedItems[0].id,
                },
              ],
              [SearchType.MOVIE]: [Routes.Home.MOVIE_DETAILS],
              [SearchType.TV]: [Routes.Home.TV_SHOW_DETAILS],
            };
            await waitFor(() => {
              expect(navigate).toBeCalledTimes(1);
              expect(navigate).toBeCalledWith(
                mockCallParams[searchType][0],
                mockCallParams[searchType][1],
              );
            });
          },
        );
      });

      describe('From the "search-list"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        test.each(searchTypes)(
          'should navigate to "details-screen" correctly when "search-type" is %p',
          async searchType => {
            const mocks = mockSearchEntryQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query,
            });
            const navigate = jest.fn();
            const component = render(
              renderSearch({
                searchType,
                navigate,
                mocks,
              }),
            );
            act(() => {
              fireEvent(elements.searchInput(component), 'onChangeText', query);
            });
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(elements.searchItems(component).length).toBeGreaterThan(0);
            });
            const indexItemSelected = randomPositiveNumber(
              elements.searchItems(component).length - 1,
            );
            expect(navigate).toBeCalledTimes(0);
            fireEvent.press(elements.searchItems(component)[indexItemSelected]);
            await waitFor(() => {
              expect(navigate).toBeCalledTimes(1);
            });
            const mockCallParams = searchTypeNavigationParamsMapping(
              searchType,
              indexItemSelected,
            );
            await waitFor(() => {
              expect(navigate).toBeCalledTimes(1);
              expect(navigate).toBeCalledWith(
                mockCallParams[0],
                mockCallParams[1],
              );
            });
          },
        );
      });
    });

    describe('Navigating back to the previous screen', () => {
      describe('When pressing the "header-icon-close"', () => {
        test.each(searchTypes)(
          'should call "goBack" correctly when "search-type" is %p',
          async searchType => {
            const mocks = mockSearchEntryQuerySuccessResponse({
              hasMore: true,
              type: searchType,
              query: 'SOME_QUERY',
            });
            const goBack = jest.fn();
            const component = render(
              renderSearch({
                searchType,
                goBack,
                mocks,
              }),
            );
            expect(goBack).toBeCalledTimes(0);
            fireEvent.press(elements.headerCloseButton(component));
            expect(goBack).toBeCalledTimes(1);
            await waitFor(() => {});
          },
        );
      });
    });
  });
});
