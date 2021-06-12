import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import * as fixtures from '@mocks/fixtures';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { TRANSITIONING_DURATION } from './hooks/useHome';
import Home from './Home';

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
      TrendingTVShows: () => fixtures.trendingTVShows,
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

    expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
      voteAverage: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].voteAverage,
      posterPath: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].posterPath,
      voteCount: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].voteCount,
      genreIds: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].genreIds,
      title: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].title,
      id: fixtures.trendingTVShowsWithTitle.onTheAir.items[id].id,
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
      (Math.random() * (fixtures.trendingTVShowsItemsWithTitle.length - 1 - 0 + 1)) << 0;
    const SECTION_SELECTED_INDEX = (Math.random() * (sections.length - 1 - 0 + 1)) << 0;

    const mockResolvers = {
      TrendingTVShows: () => fixtures.trendingTVShows,
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

    expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
      voteAverage:
        fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteAverage,
      posterPath:
        fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].posterPath,
      voteCount:
        fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteCount,
      genreIds:
        fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].genreIds,
      title: fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].title,
      id: fixtures.trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].id,
    });
  });
});
