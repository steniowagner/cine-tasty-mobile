import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import * as TRANSLATIONS from 'i18n/tags';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { TRANSITIONING_DURATION } from './hooks/useHome';
import Home from './Home';

const trendingTVShowsItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
    __typename: 'BaseTVShow',
    name: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingTVShowsItemsWithTitle = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
    __typename: 'BaseTVShow',
    title: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingTVShowsWithTitle = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};

const trendingTVShows = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};

type RenderHomeProps = {
  navigate?: jest.FunctionLike;
  mockResolvers?: IMocks;
};

const renderHome = ({ navigate = jest.fn, mockResolvers }: RenderHomeProps) => {
  const HomeScreen = ({ navigation }) => {
    return (
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home navigation={{ ...navigation, navigate }} />
      </AutoMockProvider>
    );
  };

  return (
    <TMDBImageQualityProvider>
      <MockedNavigation component={HomeScreen} />
    </TMDBImageQualityProvider>
  );
};

describe('Testing <Home /> - [TVShows -- Extras]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should navigate to TVShow-detail screen when the user select some top3-item', () => {
    const TOP3_ITEM_SELECTED_INDEX = 0;

    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderHome({ mockResolvers, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('rounded-button')[TOP3_ITEM_SELECTED_INDEX]);

    expect(navigate).toHaveBeenCalledTimes(1);

    const { id } = navigate.mock.calls[0][1];

    expect(navigate).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      voteAverage: trendingTVShowsWithTitle.onTheAir.items[id].voteAverage,
      posterPath: trendingTVShowsWithTitle.onTheAir.items[id].posterPath,
      voteCount: trendingTVShowsWithTitle.onTheAir.items[id].voteCount,
      genreIds: trendingTVShowsWithTitle.onTheAir.items[id].genreIds,
      title: trendingTVShowsWithTitle.onTheAir.items[id].title,
      id: trendingTVShowsWithTitle.onTheAir.items[id].id,
    });
  });

  it('should navigate to TVShow-detail screen when the user select some section-item', () => {
    const sections = [
      `home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_AIRING_TODAY}`,
    ];

    const SECTION_ITEM_INDEX_SELECTED =
      (Math.random() * (trendingTVShowsItemsWithTitle.length - 1 - 0 + 1)) << 0;
    const SECTION_SELECTED_INDEX = (Math.random() * (sections.length - 1 - 0 + 1)) << 0;

    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderHome({ mockResolvers, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getAllByTestId('simplified-media-list-button')[
        SECTION_SELECTED_INDEX * 10 + SECTION_ITEM_INDEX_SELECTED
      ],
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      voteAverage: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteAverage,
      posterPath: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].posterPath,
      voteCount: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteCount,
      genreIds: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].genreIds,
      title: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].title,
      id: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].id,
    });
  });
});
