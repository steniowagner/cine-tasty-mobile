import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as TRANSLATIONS from '@i18n/tags';

import { SWITCH_ANIMATION_DURATION_MS } from './header/media-switcher/useMediaSwitcherAnimation';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import { TRANSITIONING_DURATION } from './hooks/useHome';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import Home from './Home';

const NUMBER_OF_SECTIONS = 4;

const trendingMoviesItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
    title: `title-${index}`,
    __typename: 'BaseMovie',
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingMovies = {
  nowPlaying: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  upcoming: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  __typename: 'TrendingMovies',
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

describe('Testing <Home /> - [Movies -- Extras]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show the movies-content after press the "Movies" when the "TVShows" is selected', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const { queryByTestId, getByTestId, getByText, queryByText, getAllByTestId } = render(
      renderHome({ mockResolvers }),
    );

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(getByTestId('top3-list')).not.toBeNull();

    expect(getAllByTestId('section-wrapper').length).toEqual(NUMBER_OF_SECTIONS);

    // now-playing-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
    ).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));
    act(() => {
      timeTravel(TRANSITIONING_DURATION + SWITCH_ANIMATION_DURATION_MS);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    // now-playing-section

    expect(queryByTestId(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING)).toBeNull();

    expect(
      queryByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    ).toBeNull();

    // top-rated-section

    expect(queryByText(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED)).toBeNull();

    expect(
      queryByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    ).toBeNull();

    // upcoming-section

    expect(queryByText(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING)).toBeNull();

    expect(
      queryByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    ).toBeNull();

    // popular-section

    expect(queryByText(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR)).toBeNull();

    expect(
      queryByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
    ).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_MOVIES}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION * 2);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    // now-playing-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
    ).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it('should show the trendings correctly after an error and the user press the reload-button', () => {
    const mockResolversError = {
      TrendingMovies: () => new Error(),
    };

    const mockResolversSuccess = {
      TrendingMovies: () => trendingMovies,
    };

    const { getAllByTestId, queryByTestId, getByTestId, getByText, rerender } = render(
      renderHome({ mockResolvers: mockResolversError }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('top-reload-button')).not.toBeNull();

    fireEvent.press(getByTestId('top-reload-button'));

    rerender(renderHome({ mockResolvers: mockResolversSuccess }));

    expect(queryByTestId('loading-home')).not.toBeNull();

    expect(queryByTestId('top-reload-button')).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(getByTestId('top3-list')).not.toBeNull();

    expect(getAllByTestId('section-wrapper').length).toEqual(NUMBER_OF_SECTIONS);

    // now-playing-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
    ).not.toBeNull();
  });
});
