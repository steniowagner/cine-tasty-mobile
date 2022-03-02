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
import * as mockFamous from '@mocks/fixtures/famous';
import {randomPositiveNumber} from '@mocks/utils';
import {AlertMessageProvider} from '@providers';
import {InMemoryCache} from '@apollo/client';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

import Famous from './Famous';

const renderFamous = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
) => {
  const FamousScreen = ({navigation, route}) => (
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
          <Famous navigation={{...navigation, navigate}} route={route} />
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

describe('<Famous />', () => {
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
    headerIconButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-magnify'),
    famousLoadingList: (api: RenderAPI) =>
      api.queryByTestId('famous-loading-list'),
    famousListItem: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
    famousListItemNames: (api: RenderAPI) => api.queryAllByTestId('title-text'),
    famousListItems: (api: RenderAPI) =>
      api.queryAllByTestId('famous-list-item-button'),
  };

  describe('Entry Query - Success', () => {
    it('should show the "Loading-state" when is loading the data', async () => {
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        mockFamous.famousList(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderFamous(resolvers));
      expect(elements.famousList(component)).toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.headerIconButton(component)).not.toBeNull();
      expect(elements.famousLoadingList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should show the "Famous-list" when the data is loaded', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderFamous(resolvers));
      await act(async () => {
        await waitFor(() => {
          expect(elements.famousList(component)).not.toBeNull();
          expect(elements.famousListItem(component).length).toEqual(
            famousList.length,
          );
          expect(elements.topReloadButton(component)).toBeNull();
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.headerIconButton(component)).not.toBeNull();
          expect(elements.famousLoadingList(component)).toBeNull();
        });
      });
    });

    it.skip('should renders the "empty-list-state" when the query returns an empty array of famous', () => {
      const entryQueryResult = mockFamous.famousResolvers({page: 1}, [], true);
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderFamous(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_DESCRIPTION),
      ).not.toBeNull();
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_SUGGESTION),
      ).not.toBeNull();
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_TITLE),
      ).not.toBeNull();
      expect(elements.famousList(component)).toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.headerIconButton(component)).not.toBeNull();
      expect(elements.famousLoadingList(component)).toBeNull();
    });

    it('should refetch the data and show the "famous-list" correctly when the user presses the "top-reload-button" after a network-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const entryQuerySecondResult = mockFamous.famousResolvers(
        {page: 1},
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
      const component = render(renderFamous(resolvers));
      expect(elements.famousLoadingList(component)).not.toBeNull();
      expect(elements.headerIconButton(component)).not.toBeNull();
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const entryQuerySecondResult = mockFamous.famousResolvers(
        {page: 1},
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
      const component = render(renderFamous(resolvers));
      expect(elements.famousLoadingList(component)).not.toBeNull();
      expect(elements.headerIconButton(component)).not.toBeNull();
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithNetworkError,
        },
      ];
      const component = render(renderFamous(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a network-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const entryQuerySecondResult = mockFamous.famousResolvers(
        {page: 1},
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
      const component = render(renderFamous(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
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
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryFirstResult.request,
          ...entryQueryFirstResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderFamous(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
        );
        expect(elements.topReloadButton(component)).not.toBeNull();
      });
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a graphql-error', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryFirstResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const entryQuerySecondResult = mockFamous.famousResolvers(
        {page: 1},
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
      const component = render(renderFamous(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
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
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
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

    it('should show the "pagination-loading" when the user start to paginate the "news-list"', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
      await act(async () => {
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
          expect(elements.paginationReloadButton(component)).toBeNull();
          fireEvent(elements.famousList(component), 'onEndReached');
          expect(elements.paginationFooter(component)).not.toBeNull();
          expect(elements.paginationLoading(component)).not.toBeNull();
          expect(elements.paginationReloadButton(component)).toBeNull();
        });
      });
    });

    it('should not show the "pagination-loading" when the pagination-process is finished', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
      await act(async () => {
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
          expect(elements.paginationReloadButton(component)).toBeNull();
          fireEvent(elements.famousList(component), 'onEndReached');
          expect(elements.paginationFooter(component)).not.toBeNull();
          expect(elements.paginationLoading(component)).not.toBeNull();
          expect(elements.paginationReloadButton(component)).toBeNull();
        });
      });
      component.rerender(renderFamous(resolvers));
      await act(async () => {
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
          expect(elements.paginationReloadButton(component)).toBeNull();
        });
      });
    });

    it('should paginate to the next page when the user reaches the bottom of the "famous-list" and "hasMore" is "true"', async () => {
      const famousListLength = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        false,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
      const famousList = mockFamous.famousList(famousListLength);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const paginationQueryResult = mockFamous.famousResolvers(
        {page: 2},
        mockFamous.famousList(famousListLength, 2),
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
      const component = render(renderFamous(resolvers));
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
    it('should navigate to the "Search"-screen when the user press the "magnify-icon-button"', () => {
      const navigate = jest.fn();
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        mockFamous.famousList(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderFamous(resolvers, navigate));
      expect(elements.headerIconButton(component)).not.toBeNull();
      fireEvent.press(elements.headerIconButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Search.SEARCH_STACK, {
        i18nQueryByPaginationErrorRef:
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        i18nSearchBarPlaceholderRef:
          Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER,
        i18nQueryByTextErrorRef: Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        searchType: SchemaTypes.SearchType.PERSON,
        queryId: 'search_famous',
      });
    });

    it('should navigate to the "Famous-detail"-screen when the user press some item on the "famous-list"', async () => {
      const navigate = jest.fn();
      const numberOfItems = randomPositiveNumber(10, 1);
      const famousList = mockFamous.famousList(numberOfItems);
      const indexItemSelected = randomPositiveNumber(numberOfItems - 1, 0);
      const entryQueryResult = mockFamous.famousResolvers(
        {page: 1},
        famousList,
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderFamous(resolvers, navigate));
      await waitFor(() => {
        expect(elements.famousList(component)).not.toBeNull();
      });
      fireEvent.press(elements.famousListItems(component)[indexItemSelected]);
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        Routes.Famous.DETAILS,
        {
          profileImage: famousList[indexItemSelected].profilePath,
          name: famousList[indexItemSelected].name,
          id: famousList[indexItemSelected].id,
        },
      );
    });
  });
});
