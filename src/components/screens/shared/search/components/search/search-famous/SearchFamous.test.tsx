import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {DEFAULT_ANIMATION_DURATION} from '@components/common/popup-advice/PopupAdvice';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import * as mockSearchFamous from '@mocks/fixtures/searchFamous';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';
import {AlertMessageProvider} from '@providers';
import {InMemoryCache} from '@apollo/client';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {SEARCH_BY_QUERY_DELAY} from '../useSearchByQuery';

const mockNavigation = {
  navigate: jest.fn(),
};

const paginationError = Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR;
const searchByTextError = Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR;
const placeholder = Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER;
const searchType = SchemaTypes.SearchType.PERSON;
const SOME_FAMOUS_NAME = 'Stenio Wagner';
const queryId = 'search_famous';
const baseVariables = (page: number) => ({
  input: {language: 'EN', type: 'PERSON', query: SOME_FAMOUS_NAME, page},
});

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

jest.mock('react-native-status-bar-height', () => ({
  getStatusBarHeight: () => 10,
}));

import SearchFamous from '../Search';

const renderSearchFamous = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
  goBack = jest.fn(),
) => {
  const FamousScreen = ({navigation}) => (
    <MockedProvider
      mocks={mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <AlertMessageProvider>
        <TMDBImageQualityProvider>
          <SearchFamous
            navigation={{...navigation, navigate, goBack}}
            route={{
              params: {
                searchByTextError,
                paginationError,
                placeholder,
                searchType,
                queryId,
              },
              name: Routes.Search.SEARCH,
              key: Routes.Search.SEARCH,
            }}
            theme={theme}
          />
        </TMDBImageQualityProvider>
      </AlertMessageProvider>
    </MockedProvider>
  );

  return (
    <MockedNavigation
      extraScreens={[Routes.Famous.DETAILS]}
      component={FamousScreen}
    />
  );
};

describe('<Search /> [Famous]', () => {
  afterEach(cleanup);

  beforeEach(setupTimeTravel);

  const elements = {
    famousList: (api: RenderAPI) => api.queryByTestId('famous-list'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    paginationFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoading: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    famousLoadingList: (api: RenderAPI) =>
      api.queryByTestId('famous-loading-list'),
    famousListItem: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
    famousListItemNames: (api: RenderAPI) => api.queryAllByTestId('title-text'),
    famousListItems: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
    seachInput: (api: RenderAPI) => api.queryByTestId('search-input'),
    headerCloseButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-close'),
  };

  describe('Entry Query - Success', () => {
    it('should only show the famous-list with no elements on the first render', async () => {
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        mockSearchFamous.famousList(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      expect(elements.famousList(component)).not.toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.famousLoadingList(component)).toBeNull();
      expect(elements.famousListItems(component).length).toEqual(0);
    });

    it('should show the "Loading-state" when is loading the data', async () => {
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        mockSearchFamous.famousList(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      expect(elements.famousList(component)).toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.famousLoadingList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should show the "Famous-list" when the data is loaded', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(
          famousListLength,
        );
        expect(elements.topReloadButton(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.alertMessageWrapper(component)).toBeNull();
        expect(elements.famousLoadingList(component)).toBeNull();
      });
    });

    it('should refetch the data and show the "famous-list" correctly when the user presses the "top-reload-button" after a network-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const entryQuerySecondResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQuerySecondResult.request,
          ...entryQuerySecondResult.responseWithNetworkError,
        },
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      expect(elements.famousLoadingList(component)).not.toBeNull();
      act(async () => {
        await waitFor(() => {
          expect(elements.famousLoadingList(component)).toBeNull();
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(0);
          expect(elements.topReloadButton(component)).not.toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
        });
        await waitFor(() => {
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(
            famousList.length,
          );
        });
      });
    });

    it('should refetch the data and show the "famous-list" correctly when the user presses the "top-reload-button" after a graphql-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const entryQuerySecondResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQuerySecondResult.request,
          ...entryQuerySecondResult.responseWithGraphQLError,
        },
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      expect(elements.famousLoadingList(component)).not.toBeNull();
      act(async () => {
        await waitFor(() => {
          expect(elements.famousLoadingList(component)).toBeNull();
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(0);
          expect(elements.topReloadButton(component)).not.toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
        });
        await waitFor(() => {
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(
            famousList.length,
          );
        });
      });
    });
  });

  describe('Entry Query - Network Error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "entry-query-error-message" when the user receives some network-error during the entry-query', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithNetworkError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a network-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const entryQuerySecondResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithNetworkError,
        },
        {
          ...entryQuerySecondResult.request,
          ...entryQuerySecondResult.responseWithNetworkError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
      await act(async () => {
        expect(elements.famousLoadingList(component)).toBeNull();
        expect(elements.topReloadButton(component)).not.toBeNull();
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(0);
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.famousLoadingList(component)).toBeNull();
        expect(elements.topReloadButton(component)).not.toBeNull();
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(0);
      });
    });
  });

  describe('Entry Query - GraphQL Error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "entry-query-error-message" when the user receives some graphql-error during the entry-query', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a graphql-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const entryQuerySecondResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithGraphQLError,
        },
        {
          ...entryQuerySecondResult.request,
          ...entryQuerySecondResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
      await act(async () => {
        expect(elements.famousLoadingList(component)).toBeNull();
        expect(elements.topReloadButton(component)).not.toBeNull();
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(0);
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        );
        expect(elements.famousLoadingList(component)).toBeNull();
        expect(elements.topReloadButton(component)).not.toBeNull();
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(0);
      });
    });
  });

  describe('Pagination - Success', () => {
    beforeEach(setupTimeTravel);

    afterEach(cleanup);

    it('should show the "pagination-loading" when the user start to paginate the "famous-list"', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.famousListItems(component).length).toBeGreaterThan(0);
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.famousList(component), 'onEndReached');
      await waitFor(() => {
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
      });
    });

    it('should not show the "pagination-loading" when the pagination-process is finished', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength, 1);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.famousListItem(component).length).toBeGreaterThan(0);
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.famousList(component), 'onEndReached');
      await waitFor(() => {
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
      });
      await waitFor(() => {
        expect(elements.famousListItem(component).length).toBeGreaterThan(
          famousListLength,
        );
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
    });

    it('should paginate to the next page when the user reaches the bottom of the "famous-list" and "hasMore" is "true"', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await act(async () => {
        await waitFor(() => {
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(
            famousList.length,
          );
          for (let i = 0; i < famousListLength; i++) {
            expect(
              elements
                .famousListItemNames(component)
                .every(
                  famousListItemName =>
                    (famousListItemName.children[0] as string).split('-')[0] ===
                    'page1',
                ),
            ).toEqual(true);
          }
          fireEvent(elements.famousList(component), 'onEndReached');
        });
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(
          famousList.length * 2,
        );
        for (let i = famousListLength; i < famousListLength * 2; i++) {
          const famousName = elements.famousListItemNames(component)[i]
            .children[0] as string;
          expect(famousName.split('-')[0] === 'page2').toEqual(true);
        }
      });
    });

    it('should not paginate to the next page when the user reaches the bottom of the "news-list" and "hasMore" is false', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        false,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await act(async () => {
        await waitFor(() => {
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(
            famousList.length,
          );
          for (let i = 0; i < elements.famousListItem(component).length; i++) {
            expect(
              elements
                .famousListItemNames(component)
                .every(
                  famousListItemName =>
                    (famousListItemName.children[0] as string).split('-')[0] ===
                    'page1',
                ),
            ).toEqual(true);
          }
          fireEvent(elements.famousList(component), 'onEndReached');
        });
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
        expect(elements.famousListItem(component).length).toEqual(
          famousList.length,
        );
        for (let i = 0; i < elements.famousListItem(component).length; i++) {
          const famousName = elements.famousListItemNames(component)[i]
            .children[0] as string;
          expect(famousName.split('-')[0] === 'page1').toEqual(true);
        }
      });
    });
  });

  describe('Pagination - Network Error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "pagination-reload-button" and an "error-message" when the user paginate the "famous-list" and a networking-error occurs', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.responseWithNetworkError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageText(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
        fireEvent(elements.famousList(component), 'onEndReached');
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
    });

    it('should show the "pagination-loading-state" and then the "pagination-reload-button" and an "error-message" when the user press the "pagiantion-reload-button" and a networking-error occurs', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.responseWithNetworkError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageText(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
        fireEvent(elements.famousList(component), 'onEndReached');
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
      fireEvent.press(elements.paginationReloadButton(component));
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
    });
  });

  describe('Pagination - GraphQL Error', () => {
    it('should show the "pagination-reload-button" and an "error-message" when the user paginate the "famous-list" and a graphql-error occurs', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageText(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
        fireEvent(elements.famousList(component), 'onEndReached');
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
    });

    it('should show the "pagination-loading-state" and then the "pagination-reload-button" and an "error-message" when the user press the "pagiantion-reload-button" and a graphql-error occurs', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(famousListLength);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const paginationQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(2),
        mockSearchFamous.famousList(famousListLength, 2),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderSearchFamous(resolvers));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.alertMessageText(component)).toBeNull();
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
        expect(elements.paginationReloadButton(component)).toBeNull();
        fireEvent(elements.famousList(component), 'onEndReached');
      });
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
      fireEvent.press(elements.paginationReloadButton(component));
      act(() => {
        timeTravel(DEFAULT_ANIMATION_DURATION);
      });
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        );
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationReloadButton(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
      });
    });
  });

  describe('Press items', () => {
    it('should navigate to the "Famous-detail"-screen when the user press some item on the "famous-list"', async () => {
      const navigate = jest.fn();
      const numberOfItems = randomPositiveNumber(10, 1);
      const famousList = mockSearchFamous.famousList(numberOfItems);
      const indexItemSelected = randomPositiveNumber(numberOfItems - 1, 0);
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderSearchFamous(resolvers, navigate));
      fireEvent(
        elements.seachInput(component),
        'onChangeText',
        SOME_FAMOUS_NAME,
      );
      act(() => {
        timeTravel(SEARCH_BY_QUERY_DELAY);
      });
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
      });
      fireEvent.press(elements.famousListItems(component)[indexItemSelected]);
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        Routes.Famous.DETAILS,
        {
          profileImage: famousList[indexItemSelected].image,
          name: famousList[indexItemSelected].title,
          id: famousList[indexItemSelected].id,
        },
      );
    });

    it('should call the navigation.goBack when press the close-search button', () => {
      const goBack = jest.fn();
      const entryQueryResult = mockSearchFamous.searchFamousResolvers(
        baseVariables(1),
        [],
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(
        renderSearchFamous(resolvers, jest.fn(), goBack),
      );
      expect(goBack).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.headerCloseButton(component));
      expect(goBack).toHaveBeenCalledTimes(1);
    });
  });
});
