import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import {
  NOW_PLAYING_SECTION_TITLE_i18N_REF as MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF,
  TOP_RATED_SECTION_TITLE_i18N_REF as MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF,
  UPCOMING_SECTION_TITLE_i18N_REF as MOVIES_UPCOMING_SECTION_TITLE_i18N_REF,
} from './hooks/trendings/useTrendingMovies';

import Home from './Home';
import { TRANSITIONING_DURATION } from './hooks/useHome';

const NUMBER_OF_SECTIONS = 4;

const trendingMoviesItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `posterPath-${index}`,
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

  return <MockedNavigation component={HomeScreen} />;
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

    expect(getByText(MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    // now-playing-section

    expect(queryByTestId(MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF)).toBeNull();

    expect(
      queryByTestId(`home-section-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`),
    ).toBeNull();

    // top-rated-section

    expect(queryByText(MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF)).toBeNull();

    expect(
      queryByTestId(`home-section-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    ).toBeNull();

    // upcoming-section

    expect(queryByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).toBeNull();

    expect(
      queryByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).toBeNull();

    // popular-section

    expect(queryByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).toBeNull();

    expect(
      queryByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-movies-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION * 2);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    // now-playing-section

    expect(getByText(MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });
});
