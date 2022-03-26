import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
  waitFor,
} from '@testing-library/react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';

import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {flatListScrollEventData} from '@mocks/utils';
import * as mockNews from '@mocks/fixtures/news';
import {AlertMessageProvider} from '@providers';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {INITIAL_ITEMS_TO_RENDER, News} from './News';

const renderNews = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
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
        <News
          navigation={{...navigation, navigate}}
          route={{
            key: `${Routes.News.NEWS}-key`,
            name: Routes.News.NEWS,
          }}
        />
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
  };

  describe('Change Language', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should opens the language-filter modal when the user presses the "header-right-filter-button"', () => {
      const navigate = jest.fn();
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers, navigate));

      act(() => {
        jest.runAllTimers();
      });

      expect(elements.headerIconButton(component)).not.toBeNull();
      fireEvent.press(elements.headerIconButton(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate.mock.calls[0][0]).toEqual(
        Routes.CustomModal.CUSTOM_MODAL_STACK,
      );
      expect(navigate.mock.calls[0][1].headerText).toEqual(
        Translations.Tags.NEWS_FILTER_MESSAGE,
      );
      expect(navigate.mock.calls[0][1].type).toEqual(
        Types.CustomizedModalChildrenType.LANGUAGE,
      );
      expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual(
        'function',
      );
      expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(
        SchemaTypes.ArticleLanguage.EN,
      );
    });

    it('should disable the "header-right-filter-button"-press while is loading', () => {
      const navigate = jest.fn();
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers, navigate));
      expect(elements.headerIconButton(component)).not.toBeNull();
      fireEvent.press(elements.headerIconButton(component));
      expect(navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('Entry Query - success', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should only render a pre-defined number of "news-list-items" when the list receive the data on the "entry-query"', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsListItem(component).length).toEqual(
        INITIAL_ITEMS_TO_RENDER + 1,
      );
    });

    it('should only render the loading-state when the component mounts', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers));
      expect(elements.newsLoadingList(component)).not.toBeNull();
      expect(elements.newsList(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.alertMessageText(component)).toBeNull();
    });

    it('should render the "news-list" correctly when the user receives the articles', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toBeGreaterThan(0);
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.alertMessageText(component)).toBeNull();
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
    });

    it('should only renders the "empty-list-state" when the query returns an empty array of articles', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        [],
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.result,
        },
      ];
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.adviseWrapper(component)).not.toBeNull();
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_DESCRIPTION),
      ).not.toBeNull();
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_SUGGESTION),
      ).not.toBeNull();
      expect(
        component.getByText(Translations.Tags.NEWS_EMPTY_LIST_TITLE),
      ).not.toBeNull();
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.newsList(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.alertMessageText(component)).toBeNull();
    });

    it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button" after a network-error', async () => {
      const entryQueryFirstResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const entryQuerySecondResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
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
      const component = render(renderNews(resolvers));
      expect(elements.newsLoadingList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
      fireEvent.press(elements.topReloadButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toBeGreaterThan(0);
    });

    it('should refetch the data and show the "news-list" correctly when the user presses the "top-reload-button" after a graphql-error', async () => {
      const entryQueryFirstResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const entryQuerySecondResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
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
      const component = render(renderNews(resolvers));
      expect(elements.newsLoadingList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
      fireEvent.press(elements.topReloadButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.alertMessageWrapper(component)).toBeNull();
      expect(elements.alertMessageText(component)).toBeNull();
      expect(elements.topReloadButton(component)).toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toBeGreaterThan(0);
    });
  });

  describe('Entry Query - Network error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "entry-query-error-message" when the user receives some network-error during the entry-query', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.responseWithNetworkError,
        },
      ];
      const component = render(renderNews(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.topReloadButton(component)).not.toBeNull();
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a network-error', async () => {
      const entryQueryFirstResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const entryQuerySecondResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
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
      const component = render(renderNews(resolvers));
      expect(elements.newsLoadingList(component)).not.toBeNull();
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
      fireEvent.press(elements.topReloadButton(component));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
    });
  });

  describe('Entry Query - GraphQL error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "entry-query-error-message" when the user receives some GraphQL-error during the entry-query', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const resolvers = [
        {
          ...entryQueryResult.request,
          ...entryQueryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderNews(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.topReloadButton(component)).not.toBeNull();
    });

    it('should show the "entry-query-error-message" after the user presses the "top-reload-button" after a Graphql-error', async () => {
      const entryQueryFirstResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const entryQuerySecondResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
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
      const component = render(renderNews(resolvers));
      expect(elements.newsLoadingList(component)).not.toBeNull();
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
      fireEvent.press(elements.topReloadButton(component));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsLoadingList(component)).toBeNull();
      expect(elements.topReloadButton(component)).not.toBeNull();
      expect(elements.newsList(component)).not.toBeNull();
      expect(elements.articlesListItems(component).length).toEqual(0);
    });
  });

  describe('Pagination - success', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "pagination-loading" when the user start to paginate the "news-list"', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.newsList(component), 'onEndReached');
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      act(() => {
        jest.runAllTimers();
      });
    });

    it('should not show the "pagination-loading" when the pagination-process is finished', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.newsList(component), 'onEndReached');
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      component.rerender(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
    });

    it('should paginate to the next page when the user reaches the bottom of the "news-list" and "hasMore" is true', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent.scroll(elements.newsList(component), flatListScrollEventData);
      expect(elements.newsListItem(component).length).toEqual(
        mockNews.DATASET_LENGTH,
      );
      expect(
        elements
          .textNewsListItem(component)
          .every(
            textNewsListItem =>
              (textNewsListItem.children[0] as string).split('-')[0] ===
              'page1',
          ),
      ).toEqual(true);
      fireEvent(elements.newsList(component), 'onEndReached');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsListItem(component).length).toEqual(
        mockNews.DATASET_LENGTH * 2,
      );
      const textNewsListItems = elements.textNewsListItem(component);
      expect(
        textNewsListItems.reduce((previous, _, index) => {
          const expectedPage = index < mockNews.DATASET_LENGTH ? 1 : 2;
          const newsTextPagePreffix = (
            textNewsListItems[index].children[0] as string
          ).split('-')[0];
          return previous && newsTextPagePreffix === `page${expectedPage}`;
        }),
      ).toEqual(true);
    });

    it('should not paginate to the next page when the user reaches the bottom of the "news-list" and "hasMore" is false', () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        false,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent.scroll(elements.newsList(component), flatListScrollEventData);
      expect(elements.newsListItem(component).length).toEqual(
        mockNews.DATASET_LENGTH,
      );
      expect(
        elements
          .textNewsListItem(component)
          .every(
            textNewsListItem =>
              (textNewsListItem.children[0] as string).split('-')[0] ===
              'page1',
          ),
      ).toEqual(true);
      fireEvent(elements.newsList(component), 'onEndReached');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.newsListItem(component).length).toEqual(
        mockNews.DATASET_LENGTH,
      );
    });
  });

  describe('Pagination - Network error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "pagination-reload-button" and an "error-message" when the user paginate the "news-list" and a networking error occurs', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));

      act(() => {
        jest.runAllTimers();
      });
      expect(elements.alertMessageText(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.newsList(component), 'onEndReached');
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
    });

    it('should show the "pagination-loading-state" and then the "pagination-reload-button" and an "error-message" when the user press the "pagiantion-reload-button" and a networking error occurs', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.newsList(component), 'onEndReached');
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.press(elements.paginationReloadButton(component));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
    });
  });

  describe('Pagination - GraphQL error', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "pagination-reload-button" and an "error-message" when the user paginate the "news-list" and a GraphQL error occurs', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.alertMessageText(component)).toBeNull();
      expect(elements.paginationFooter(component)).toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
      expect(elements.paginationReloadButton(component)).toBeNull();
      fireEvent(elements.newsList(component), 'onEndReached');
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
    });

    it('should show the "pagination-loading-state" and then the "pagination-reload-button" and an "error-message" when the user press the "pagiantion-reload-button" and a GraphQL error occurs', async () => {
      const entryQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 1},
        mockNews.dataset(1),
        true,
      );
      const paginationQueryResult = mockNews.newsRresolvers(
        {language: 'EN', page: 2},
        mockNews.dataset(2),
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
        {
          ...paginationQueryResult.request,
          ...paginationQueryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderNews(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.newsList(component), 'onEndReached');
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.press(elements.paginationReloadButton(component));
      await waitFor(() => {
        expect(elements.alertMessageWrapper(component)).not.toBeNull();
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
        );
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.paginationFooter(component)).not.toBeNull();
      expect(elements.paginationReloadButton(component)).not.toBeNull();
      expect(elements.paginationLoading(component)).toBeNull();
    });
  });
});
