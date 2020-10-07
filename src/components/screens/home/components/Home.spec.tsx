import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { SEARCH_MOVIES } from 'components/screens/shared/search/queries';
import { SearchType } from 'types/schema';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { SCREEN_ID } from './media-section-view-all/MediaSectionViewAll';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { TRANSITIONING_DURATION } from './hooks/useHome';
import {
  NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF as MOVIES_NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF,
  NOW_PLAYING_SECTION_TITLE_i18N_REF as MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF,
  TOP_RATED_VIEW_ALL_TITLE_i18N_REF as MOVIES_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
  UPCOMING_VIEW_ALL_TITLE_i18N_REF as MOVIES_UPCOMING_VIEW_ALL_TITLE_i18N_REF,
  TOP_RATED_SECTION_TITLE_i18N_REF as MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF,
  UPCOMING_SECTION_TITLE_i18N_REF as MOVIES_UPCOMING_SECTION_TITLE_i18N_REF,
  POPULAR_VIEW_ALL_TITLE_i18N_REF as MOVIES_POPULAR_VIEW_ALL_TITLE_i18N_REF,
  POPULAR_SECTION_TITLE_i18N_REF as MOVIES_POPULAR_SECTION_TITLE_i18N_REF,
} from './hooks/trendings/useTrendingMovies';
import {
  ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF,
  TOP_RATED_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
  ON_THE_AIR_SECTION_TITLE_i18N_REF as TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF,
  TOP_RATED_SECTION_TITLE_i18N_REF as TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF,
  POPULAR_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_POPULAR_VIEW_ALL_TITLE_i18N_REF,
  POPULAR_SECTION_TITLE_i18N_REF as TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF,
} from './hooks/trendings/useTrendingTVShows';
import {
  SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
  SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
} from './hooks/usePressMapping';
import Home from './Home';

type RenderHomeProps = {
  isMovieSelectedInitially?: boolean;
  navigate?: jest.FunctionLike;
  mockResolvers?: IMocks;
};

const renderHome = ({
  isMovieSelectedInitially = true,
  navigate = jest.fn,
  mockResolvers,
}: RenderHomeProps) => {
  const HomeScreen = ({ navigation }) => {
    return (
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home
          navigation={{ ...navigation, navigate }}
          isMovieSelectedInitially={isMovieSelectedInitially}
        />
      </AutoMockProvider>
    );
  };

  return <MockedNavigation component={HomeScreen} />;
};

describe('Testing <Home />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderHome({}));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it("should render the content properly when the query-result isnt' null", () => {
    const mockResolvers = {
      TrendingMoviesQueryResult: () => ({
        items: () => new MockList(1),
      }),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome({ mockResolvers }));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).not.toBeNull();

    expect(queryAllByTestId('section-wrapper').length).toEqual(4);

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it('should render popup-message with an error when the query-result has an error', () => {
    const mockResolvers = {
      TrendingMovies: () => new Error(),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome({ mockResolvers }));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);
  });

  it('should render the section-title correctly when the user select the "Movies" section', () => {
    const { getAllByTestId } = render(renderHome({}));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getAllByTestId('section-title')[0].children[0]).toEqual(
      MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF,
    );

    expect(getAllByTestId('section-title')[1].children[0]).toEqual(
      MOVIES_POPULAR_SECTION_TITLE_i18N_REF,
    );

    expect(getAllByTestId('section-title')[2].children[0]).toEqual(
      MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF,
    );

    expect(getAllByTestId('section-title')[3].children[0]).toEqual(
      MOVIES_UPCOMING_SECTION_TITLE_i18N_REF,
    );
  });

  it('should call correct params when press "View All" button on the "Now Playing section" and the "Movies" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 0;

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('nowPlaying');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Popular section" and the "Movies" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 1;

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_POPULAR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('popular');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Top Rated section" and the "Movies" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 2;

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('topRated');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Upcoming section" and the "Movies" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 3;

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_UPCOMING_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('upcoming');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should render the section-title correctly when the user select the "TV Shows" section', () => {
    const { getAllByTestId, queryByTestId } = render(
      renderHome({ isMovieSelectedInitially: false }),
    );

    act(() => {
      timeTravel(TRANSITIONING_DURATION + 500);
    });

    fireEvent.press(queryByTestId('media-switcher-movies-button'));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getAllByTestId('section-title')[0].children[0]).toEqual(
      TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF,
    );

    expect(getAllByTestId('section-title')[1].children[0]).toEqual(
      TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF,
    );

    expect(getAllByTestId('section-title')[2].children[0]).toEqual(
      TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF,
    );
  });

  it('should call correct params when press "View All" button on the "On the Air section" and the "TV-Shows" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 0;

    const navigate = jest.fn();

    const { getAllByTestId } = render(
      renderHome({ isMovieSelectedInitially: false, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('onTheAir');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });

  it('should call correct params when press "View All" button on the "Popular section" and the "TV-Shows" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 1;

    const navigate = jest.fn();

    const { getAllByTestId } = render(
      renderHome({ isMovieSelectedInitially: false, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_POPULAR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('popular');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });

  it('should call correct params when press "View All" button on the "Top Rated section" and the "TV-Shows" is selected', () => {
    const INDEX_VIEW_ALL_SECTION_SELECTED = 2;

    const navigate = jest.fn();

    const { getAllByTestId } = render(
      renderHome({ isMovieSelectedInitially: false, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('view-all-button')[INDEX_VIEW_ALL_SECTION_SELECTED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('topRated');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });
});
