/* eslint-disable import/first */
import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { CustomizedModalChildrenType } from 'types';
import { ArticleLanguage } from 'types/schema';
import * as TRANSLATIONS from 'i18n/tags';
import theme from 'styles/theme';

import { PAGINATION_DELAY } from 'hooks/use-paginated-query/useQueryWithPagination';
import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';

import News from './News';

const news = Array(10)
  .fill({})
  .map((_, index) => ({
    publishedAt: `publishedAt-${index}`,
    content: `content-${index}`,
    source: `source-${index}`,
    author: `author-${index}`,
    title: `title-${index}`,
    image: `image-${index}`,
    url: `url-${index}`,
    id: `${index}`,
    __typename: 'Article',
  }));

const renderNews = (mockResolvers?: IMocks, navigate = jest.fn()) => {
  const NewsComponent = ({ navigation }) => (
    <ThemeProvider theme={theme}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <News navigation={{ ...navigation, navigate }} />
      </AutoMockProvider>
    </ThemeProvider>
  );

  return <MockedNavigation component={NewsComponent} />;
};

describe('Testing <News />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('it should call the "navigate" with the correct params when the user press the "filter-button"', () => {
    const navigate = jest.fn();

    const mockResolvers = {
      Articles: () => ({
        items: () => news,
      }),
    };

    const { getByTestId } = render(renderNews(mockResolvers, navigate));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('header-icon-button-wrapper-tune')).not.toBeNull();

    fireEvent.press(getByTestId('header-icon-button-wrapper-tune'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual('CUSTOM_MODAL');

    expect(navigate.mock.calls[0][1].headerText).toEqual(
      TRANSLATIONS.NEWS_FILTER_MESSAGE,
    );

    expect(navigate.mock.calls[0][1].type).toEqual(CustomizedModalChildrenType.LANGUAGE);

    expect(typeof navigate.mock.calls[0][1].extraData.onPressSelect).toEqual('function');

    expect(navigate.mock.calls[0][1].extraData.lastItemSelected).toEqual(
      ArticleLanguage.EN,
    );
  });

  it('it should render the loading-state when the component mounts', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => news,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    expect(queryByTestId('news-loading-list')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it('should show the empty-list-state when the query returns an empty array of articles', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => [],
      }),
    };

    const { queryByTestId, getByText } = render(renderNews(mockResolvers));

    expect(queryByTestId('news-loading-list')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    expect(getByText(TRANSLATIONS.NEWS_EMPTY_LIST_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.NEWS_EMPTY_LIST_SUGGESTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.NEWS_EMPTY_LIST_TITLE)).not.toBeNull();

    expect(queryByTestId('news-list')).toBeNull();
  });

  it('should paginate to the next page when the user reach the bottom of the news-list and the previous query return "hasMore" as "true"', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => news,
        hasMore: true,
      }),
    };

    const { queryByTestId, getByTestId } = render(renderNews(mockResolvers));

    expect(getByTestId('news-loading-list')).not.toBeNull();

    expect(queryByTestId('news-list')).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(news.length);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      timeTravel(PAGINATION_DELAY);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(news.length * 2);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });

  it('should not paginate to the next page when the user reach the bottom of the news-list and the previous query returned "hasMore" as "false"', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => news,
        hasMore: false,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    expect(queryByTestId('news-loading-list')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(news.length);

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(news.length);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });
});
