jest.unmock('react-native-reanimated');

import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  act,
  waitFor,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {flatListScrollEventData} from '@mocks/utils';
import * as mockNews from '@mocks/fixtures/news';
import {AlertMessageProvider} from '@providers';
import {HIDE_POPUP_DELAY} from '@providers';
import {Translations} from '@i18n/tags';

import {INITIAL_ITEMS_TO_RENDER} from './News';
import {News} from './News';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

type Elements = Record<string, any>;

type CheckHasItemsFromPageParams = {
  elements: Elements;
  component: RenderAPI;
  page: number;
};

const scrollToEndOfList = async (component: RenderAPI, elements: Elements) => {
  await waitFor(() => {
    expect(elements.newsList(component)).not.toBeNull();
    expect(elements.articlesListItems(component).length).toBeGreaterThan(0);
  });
  fireEvent(elements.newsList(component), 'onEndReached');
  await waitFor(() => {
    expect(elements.paginationFooter(component)).not.toBeNull();
    expect(elements.paginationReloadButton(component)).not.toBeNull();
  });
};

const checkHasItemsFromPage = (params: CheckHasItemsFromPageParams) =>
  params.elements
    .textNewsListItem(params.component)
    .some(
      textNewsListItem =>
        textNewsListItem.children[0].split('-')[0] === `page${params.page}`,
    );

const paginateToSecondPage = async (
  component: RenderAPI,
  elements: Elements,
) => {
  fireEvent.press(elements.paginationReloadButton(component));
  await waitFor(() => {
    expect(elements.paginationLoading(component)).toBeNull();
    expect(elements.paginationReloadButton(component)).toBeNull();
  });
  fireEvent.scroll(elements.newsList(component), flatListScrollEventData);
};

const renderNews = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
) => {
  const NewsComponent = ({navigation}) => (
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
        <News navigation={navigation} />
      </AlertMessageProvider>
    </MockedProvider>
  );
  return <MockedNavigation component={NewsComponent} />;
};

describe('<News />', () => {
  const elements = {
    newsList: (api: RenderAPI) => api.queryByTestId('news-list'),
    newsListItem: (api: RenderAPI) =>
      api.queryAllByTestId('news-list-item-wrapper'),
    textNewsListItem: (api: RenderAPI) => api.queryAllByTestId('news-text'),
    paginationFooter: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    paginationLoading: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
    headerIconButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-tune'),
    newsLoadingList: (api: RenderAPI) => api.queryByTestId('news-loading-list'),
    adviseWrapper: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    articlesListItems: (api: RenderAPI) =>
      api.queryAllByTestId('news-list-item-wrapper'),
    languagesList: (api: RenderAPI) => api.queryByTestId('languages-list'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    modalSheet: (api: RenderAPI) => api.queryByTestId('modal-sheet'),
    loadingItems: (api: RenderAPI) =>
      api.queryAllByTestId('news-loading-list-item'),
  };

  describe('When it is loading data', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should show the Loading-items list', () => {
      const component = render(
        renderNews(mockNews.makeEntryQuerySuccessResolvers()),
      );
      expect(elements.newsLoadingList(component)).not.toBeNull();
    });

    it('should show the correct number of loading-items', () => {
      const component = render(
        renderNews(mockNews.makeEntryQuerySuccessResolvers()),
      );
      expect(elements.loadingItems(component).length).toEqual(
        INITIAL_ITEMS_TO_RENDER + 1,
      );
    });

    it('should disable the "header-right-filter-button"-press while is loading', () => {
      const component = render(
        renderNews(mockNews.makeEntryQuerySuccessResolvers()),
      );
      expect(elements.headerIconButton(component)).not.toBeNull();
      fireEvent.press(elements.headerIconButton(component));
      expect(elements.modalSheet(component)).toBeNull();
      expect(elements.languagesList(component)).toBeNull();
    });
  });

  describe('Opening the Change-Language-Modal', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should open the language-filter modal when the user presses the "header-right-filter-button"', async () => {
      const component = render(
        renderNews(mockNews.makeEntryQuerySuccessResolvers()),
      );
      fireEvent.press(elements.headerIconButton(component));
      await waitFor(() => {
        expect(elements.modalSheet(component)).not.toBeNull();
      });
      expect(elements.languagesList(component)).not.toBeNull();
    });

    it('should be able to open the modal when the returned results are empty', async () => {
      const component = render(
        renderNews(mockNews.makeEntryQuerySuccessResolvers(0)),
      );
      await waitFor(() => {
        expect(elements.adviseWrapper(component)).not.toBeNull();
      });
      fireEvent.press(elements.headerIconButton(component));
      await waitFor(() => {
        expect(elements.modalSheet(component)).not.toBeNull();
      });
    });
  });

  describe('Entry Query', () => {
    describe('Success', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should render the "news-list" correctly when the user receives the articles', async () => {
        const component = render(
          renderNews(mockNews.makeEntryQuerySuccessResolvers()),
        );
        await waitFor(() => {
          expect(elements.newsList(component)).not.toBeNull();
          expect(elements.articlesListItems(component).length).toBeGreaterThan(
            0,
          );
        });
      });

      it('should only renders the "empty-list-state" when the query returns an empty array of articles', async () => {
        const component = render(
          renderNews(mockNews.makeEntryQuerySuccessResolvers(0)),
        );
        await waitFor(() => {
          expect(elements.adviseWrapper(component)).not.toBeNull();
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
      });
    });

    describe('Error', () => {
      describe('Network', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should show the "entry-query-error-message"', async () => {
          const component = render(
            renderNews(mockNews.makeEntryQueryErrorResolvers('network')),
          );
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });

      describe('GraphQL', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should show the "entry-query-error-message"', async () => {
          const component = render(
            renderNews(mockNews.makeEntryQueryErrorResolvers('graphql')),
          );
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });

      describe('Network-error > Refetch > Success', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(mockNews.makeEntryQueryErrorResolvers('network')),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(
              elements.articlesListItems(component).length,
            ).toBeGreaterThan(0);
          });
        });
      });

      describe('GraphQL-error > Refetch > Success', () => {
        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(mockNews.makeEntryQueryErrorResolvers('graphql')),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(
              elements.articlesListItems(component).length,
            ).toBeGreaterThan(0);
          });
        });
      });

      describe('Network-error > Refetch > Network-error', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('network', 'network'),
            ),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(elements.articlesListItems(component).length).toEqual(0);
          });
          act(() => {
            jest.runAllTimers();
          });
        });

        it('should show the error message correctly when the refetch-error happens', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('network', 'network'),
            ),
          );
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
          act(() => {
            jest.runOnlyPendingTimers();
          });
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });

      describe('Network-error > Refetch > GraphQL-error', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('network', 'graphql'),
            ),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(elements.articlesListItems(component).length).toEqual(0);
          });
        });

        it('should show the error message correctly when the refetch-error happens', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('network', 'graphql'),
            ),
          );
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
          act(() => {
            jest.runOnlyPendingTimers();
          });
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });

      describe('GraphQL-error > Refetch > Network-error', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('graphql', 'network'),
            ),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(elements.articlesListItems(component).length).toEqual(0);
          });
        });

        it('should show the error message correctly when the refetch-error happens', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('graphql', 'network'),
            ),
          );
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
          act(() => {
            jest.runOnlyPendingTimers();
          });
          expect(elements.alertMessageWrapper(component)).toBeNull();
          expect(elements.alertMessageText(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageWrapper(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });

      describe('GraphQL-error > Refetch > GraphQL-error', () => {
        beforeEach(() => {
          setupTimeTravel();
        });

        it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button"', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('graphql', 'graphql'),
            ),
          );
          await waitFor(() => {
            expect(elements.topReloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.newsList(component)).not.toBeNull();
            expect(elements.articlesListItems(component).length).toEqual(0);
          });
        });

        it('should show the error message correctly when the refetch-error happens', async () => {
          const component = render(
            renderNews(
              mockNews.makeEntryQueryWithRefetchError('graphql', 'graphql'),
            ),
          );
          expect(elements.alertMessageWrapper(component)).toBeNull();
          await waitFor(() => {
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
          act(() => {
            timeTravel(2 * HIDE_POPUP_DELAY);
          });
          expect(elements.alertMessageWrapper(component)).toBeNull();
          fireEvent.press(elements.topReloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
            );
          });
        });
      });
    });
  });

  describe('Pagination', () => {
    describe('Success', () => {
      it('should show the "pagination-loading" when the user start to paginate the "news-list"', async () => {
        const component = render(
          renderNews(mockNews.makePaginationSuccess(true)),
        );
        expect(elements.paginationFooter(component)).toBeNull();
        expect(elements.paginationLoading(component)).toBeNull();
        await waitFor(() => {
          expect(elements.newsList(component)).not.toBeNull();
        });
        fireEvent(elements.newsList(component), 'onEndReached');
        expect(elements.paginationFooter(component)).not.toBeNull();
        expect(elements.paginationLoading(component)).not.toBeNull();
      });

      it.only('should not show the "pagination-loading" when the pagination-process is finished', async () => {
        const component = render(
          renderNews(mockNews.makePaginationSuccess(true)),
        );
        await waitFor(() => {
          expect(elements.newsList(component)).not.toBeNull();
        });
        fireEvent(elements.newsList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
        });
      });

      it('should render all the items correctly after the pagination', async () => {
        const component = render(
          renderNews(mockNews.makePaginationSuccess(true)),
        );
        await waitFor(() => {
          expect(checkHasItemsFromPage({component, elements, page: 1})).toEqual(
            true,
          );
        });
        fireEvent(elements.newsList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
        });
        await waitFor(() => {
          expect(checkHasItemsFromPage({component, elements, page: 1})).toEqual(
            true,
          );
          expect(checkHasItemsFromPage({component, elements, page: 2})).toEqual(
            true,
          );
        });
      });

      it('should not paginate to the next page when the user reaches the bottom of the "news-list" and "hasMore" is "false"', async () => {
        const component = render(
          renderNews(mockNews.makePaginationSuccess(false)),
        );
        await waitFor(() => {
          expect(elements.newsList(component)).not.toBeNull();
        });
        fireEvent.scroll(elements.newsList(component), flatListScrollEventData);
        expect(elements.newsListItem(component).length).toEqual(
          mockNews.DATASET_LENGTH,
        );
        fireEvent(elements.newsList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
        });
        expect(elements.newsListItem(component).length).toEqual(
          mockNews.DATASET_LENGTH,
        );
      });

      it('should only show the items corresponding to the first page when the user reaches the bottom of the "news-list" and "hasMore" is "false"', async () => {
        const component = render(
          renderNews(mockNews.makePaginationSuccess(false)),
        );
        await waitFor(() => {
          expect(elements.newsList(component)).not.toBeNull();
        });
        fireEvent.scroll(elements.newsList(component), flatListScrollEventData);
        fireEvent(elements.newsList(component), 'onEndReached');
        await waitFor(() => {
          expect(elements.paginationFooter(component)).toBeNull();
          expect(elements.paginationLoading(component)).toBeNull();
        });
        expect(checkHasItemsFromPage({component, elements, page: 1})).toEqual(
          true,
        );
      });
    });

    describe('Error', () => {
      describe('Network', () => {
        describe('Scroll > Error', () => {
          it('should show the "pagination-reload-button" after the "pagination-error"', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationError('network')),
            );
            expect(elements.paginationFooter(component)).toBeNull();
            expect(elements.paginationLoading(component)).toBeNull();
            await waitFor(async () => scrollToEndOfList(component, elements));
            await waitFor(() => {
              expect(elements.paginationFooter(component)).not.toBeNull();
              expect(elements.paginationReloadButton(component)).not.toBeNull();
            });
          });

          it('should show the correct "error-message" after the "pagination-error"', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationError('network')),
            );
            await waitFor(async () => scrollToEndOfList(component, elements));
            await waitFor(() => {
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
          });
        });

        describe('Scroll > Error > Success', () => {
          it('should paginate to the next page after an error', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationErrorSuccess('network')),
            );
            await scrollToEndOfList(component, elements);
            await paginateToSecondPage(component, elements);
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
            expect(
              checkHasItemsFromPage({component, elements, page: 2}),
            ).toEqual(true);
          });
        });

        describe('Scroll > Network-error > Network-error', () => {
          it('should show the "error-message" when had a "Network-error" when tried to refetch for the first time and another "Network-error" when tried to refetch for the second time', async () => {
            const component = render(
              renderNews(
                mockNews.mockPaginationErrorAndError('network', 'network'),
              ),
            );
            await scrollToEndOfList(component, elements);
            fireEvent.press(elements.paginationReloadButton(component));
            await waitFor(() => {
              expect(elements.paginationReloadButton(component)).not.toBeNull();
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
            expect(
              checkHasItemsFromPage({component, elements, page: 2}),
            ).toEqual(false);
          });
        });

        describe('Scroll > Network-error > GraphQL-error', () => {
          it('should show the "error-message" when had a "Network-error" when tried to refetch for the first time and a "GraphQL-error" when tried to refetch for the second time', async () => {
            const component = render(
              renderNews(
                mockNews.mockPaginationErrorAndError('network', 'graphql'),
              ),
            );
            await scrollToEndOfList(component, elements);
            fireEvent.press(elements.paginationReloadButton(component));
            await waitFor(() => {
              expect(elements.paginationReloadButton(component)).not.toBeNull();
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
            expect(
              checkHasItemsFromPage({component, elements, page: 2}),
            ).toEqual(false);
          });
        });
      });

      describe('GraphQL', () => {
        describe('Scroll > Error', () => {
          it('should show the "pagination-reload-button" after the "pagination-error"', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationError('graphql')),
            );
            expect(elements.paginationFooter(component)).toBeNull();
            expect(elements.paginationLoading(component)).toBeNull();
            await scrollToEndOfList(component, elements);
            await waitFor(() => {
              expect(elements.paginationFooter(component)).not.toBeNull();
              expect(elements.paginationReloadButton(component)).not.toBeNull();
            });
          });

          it('should show the correct "error-message" after the "pagination-error"', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationError('graphql')),
            );
            await scrollToEndOfList(component, elements);
            await waitFor(() => {
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
          });
        });

        describe('Scroll > Error > Success', () => {
          it('should paginate to the next page after an error', async () => {
            const component = render(
              renderNews(mockNews.mockPaginationErrorSuccess('graphql')),
            );
            await scrollToEndOfList(component, elements);
            await paginateToSecondPage(component, elements);
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
            expect(
              checkHasItemsFromPage({component, elements, page: 2}),
            ).toEqual(true);
          });
        });

        describe('Scroll > GraphQL-error > GraphQL-error', () => {
          it('should show the "error-message" when had a "GraphQL-error" when tried to refetch for the first time and another "GraphQL-error" when tried to refetch for the second time', async () => {
            const component = render(
              renderNews(
                mockNews.mockPaginationErrorAndError('graphql', 'graphql'),
              ),
            );
            await scrollToEndOfList(component, elements);
            fireEvent.press(elements.paginationReloadButton(component));
            await waitFor(() => {
              expect(elements.paginationReloadButton(component)).not.toBeNull();
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
            expect(
              checkHasItemsFromPage({component, elements, page: 2}),
            ).toEqual(false);
          });
        });

        describe('Scroll > GraphQL-error > Network-error', () => {
          it('should show the "error-message" when had a "GraphQL-error" when tried to refetch for the first time and a "Network-error" when tried to refetch for the second time', async () => {
            const component = render(
              renderNews(
                mockNews.mockPaginationErrorAndError('graphql', 'network'),
              ),
            );
            await scrollToEndOfList(component, elements);
            fireEvent.press(elements.paginationReloadButton(component));
            await waitFor(() => {
              expect(elements.paginationReloadButton(component)).not.toBeNull();
              expect(elements.alertMessageWrapper(component)).not.toBeNull();
              expect(elements.alertMessageText(component)).not.toBeNull();
              expect(elements.alertMessageText(component).children[0]).toEqual(
                Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
              );
            });
            expect(
              checkHasItemsFromPage({component, elements, page: 1}),
            ).toEqual(true);
          });
        });
      });
    });
  });
});
