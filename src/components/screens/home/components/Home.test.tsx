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

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {AlertMessageProvider} from '@providers';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {InMemoryCache} from '@apollo/client';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import {
  homeTrendingMoviesResolvers,
  homeTrendingTVShowsResolvers,
  trendingMovies,
  trendingTvShows,
} from '@mocks/fixtures';

import {TRANSITIONING_DURATION} from './useHome';
import {Home} from './Home';

const renderHome = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
) => {
  const HomeScreen = ({navigation, route}) => (
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
          <Home navigation={{...navigation, navigate}} route={route} />
        </TMDBImageQualityProvider>
      </AlertMessageProvider>
    </MockedProvider>
  );

  return (
    <MockedNavigation
      extraScreens={[Routes.Famous.DETAILS]}
      component={HomeScreen}
    />
  );
};

describe('<Home />', () => {
  const elements = {
    // CONTENT
    content: (api: RenderAPI) => api.queryByTestId('scrollview-content'),
    // LOADING
    loading: (api: RenderAPI) => api.queryByTestId('loading-home'),
    // ERROR
    topReloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    reload: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    // HEADER
    headerWrapper: (api: RenderAPI) => api.getByTestId('header-wrapper'),
    settings: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-settings'),
    search: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-magnify'),
    wrapper: (api: RenderAPI) => api.getByTestId('media-switcher-wrapper'),
    moviesButton: (api: RenderAPI) =>
      api.getByTestId(`${Translations.Tags.HOME_MOVIES}-button`),
    tvShowsButton: (api: RenderAPI) =>
      api.getByTestId(`${Translations.Tags.HOME_TV_SHOWS}-button`),
    // TOP3 # LEARN_MORE
    learnMoreButtons: (api: RenderAPI) => api.getAllByTestId('rounded-button'),
    // TOP3 # items-wrapper
    top3Wrapper: (api: RenderAPI) => api.getAllByTestId('top3-wrapper'),
    // TOP3 # top3-title
    top3Texts: (api: RenderAPI) => api.getAllByTestId('top3-title'),
    // MOVIES # NOW_PLAYING
    moviesNowPlayingViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-MOVIES-${Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING}`,
      ),
    moviesNowPlayingItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING),
    // MOVIES # POPULAR
    moviesPopularViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-MOVIES-${Translations.Tags.HOME_TRENDING_MOVIES_POPULAR}`,
      ),
    moviesPopularItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_POPULAR),
    // MOVIES # TOP_RATED
    moviesTopRatedViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-MOVIES-${Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED}`,
      ),
    moviesTopRatedItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED),
    // MOVIES # UPCOMING
    moviesUpcomingViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-MOVIES-${Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING}`,
      ),
    moviesUpcomingItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING),
    // TV_SHOWS # NOW_PLAYING
    tvShowsOnTheAirViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-TV_SHOWS-${Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR}`,
      ),
    tvShowsOnTheAirItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR),
    // TV_SHOWS # AIRING_TODAY
    tvShowsAiringTodayViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-TV_SHOWS-${Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY}`,
      ),
    tvShowsAiringTodayItems: (api: RenderAPI) =>
      api.queryAllByTestId(
        Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
      ),
    // TV_SHOWS # POPULAR
    tvShowsPopularViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-TV_SHOWS-${Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR}`,
      ),
    tvShowsPopularItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR),
    // TV_SHOWS # TOP_RATED
    tvShowsTopRatedViewAll: (api: RenderAPI) =>
      api.queryByTestId(
        `view-all-button-TV_SHOWS-${Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED}`,
      ),
    tvShowsTopRatedItems: (api: RenderAPI) =>
      api.queryAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED),
  };

  describe('UI', () => {
    describe('When successfully fetched the data', () => {
      it('should show the loading-state by default', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const component = render(renderHome(resolvers));
        expect(elements.content(component)).toBeNull();
        expect(elements.loading(component)).not.toBeNull();
        await waitFor(() => {});
      });

      describe('Transitioning the media-context', () => {
        beforeEach(setupTimeTravel);

        afterEach(cleanup);

        it('should render the transition from "Movies" to "TV Shows" correctly', async () => {
          const trendingMoviesQuery = homeTrendingMoviesResolvers();
          const trendingTVShowsQuery = homeTrendingTVShowsResolvers();
          const resolvers = [
            {
              ...trendingMoviesQuery.request,
              ...trendingMoviesQuery.result,
            },
            {
              ...trendingTVShowsQuery.request,
              ...trendingTVShowsQuery.result,
            },
          ];
          // Initial render
          const component = render(renderHome(resolvers));
          // Initial-loading
          expect(elements.content(component)).toBeNull();
          expect(elements.loading(component)).not.toBeNull();
          // Loading Movies-data
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Selected the TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          // Loading TV-Shows-data
          expect(elements.content(component)).toBeNull();
          expect(elements.loading(component)).not.toBeNull();
          await waitFor(() => {
            // Loaded TV-Shows-data
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          await waitFor(() => {});
        });

        it('should render the transition from "TV Shows" to "Movies" correctly', async () => {
          const trendingMoviesQuery = homeTrendingMoviesResolvers();
          const trendingTVShowsQuery = homeTrendingTVShowsResolvers();
          const resolvers = [
            {
              ...trendingMoviesQuery.request,
              ...trendingMoviesQuery.result,
            },
            {
              ...trendingTVShowsQuery.request,
              ...trendingTVShowsQuery.result,
            },
          ];
          // Initial render
          const component = render(renderHome(resolvers));
          // Initial-loading
          expect(elements.content(component)).toBeNull();
          expect(elements.loading(component)).not.toBeNull();
          // Loading Movies-data
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Selected the TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          // Loading TV-Shows-data
          expect(elements.content(component)).toBeNull();
          expect(elements.loading(component)).not.toBeNull();
          await waitFor(() => {
            // Loaded TV-Shows-data
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Selected the Movies
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          // Transitioning to Movies
          expect(elements.content(component)).toBeNull();
          expect(elements.loading(component)).not.toBeNull();
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
          await waitFor(() => {});
        });
      });

      describe('When "Movies" is selected', () => {
        beforeEach(() => {
          jest.useFakeTimers();
          jest.clearAllMocks();
        });

        afterEach(cleanup);

        it('should render the content correctly', async () => {
          const entryQueryResult = homeTrendingMoviesResolvers();
          const resolvers = [
            {
              ...entryQueryResult.request,
              ...entryQueryResult.result,
            },
          ];
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
            expect(elements.headerWrapper(component)).not.toBeNull();
            expect(elements.top3Wrapper(component).length).toEqual(3);
          });
          // Movies # Now-playing section
          expect(elements.moviesNowPlayingViewAll(component)).not.toBeNull();
          expect(
            elements.moviesNowPlayingItems(component).length,
          ).toBeGreaterThan(0);
          // Movies # Popular section
          expect(elements.moviesPopularViewAll(component)).not.toBeNull();
          expect(elements.moviesPopularItems(component).length).toBeGreaterThan(
            0,
          );
          // Movies # Top-Rated section
          expect(elements.moviesTopRatedViewAll(component)).not.toBeNull();
          expect(
            elements.moviesTopRatedItems(component).length,
          ).toBeGreaterThan(0);
          // Movies # Upcoming section
          expect(elements.moviesUpcomingViewAll(component)).not.toBeNull();
          expect(
            elements.moviesUpcomingItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # On-the-Air section
          expect(elements.tvShowsOnTheAirViewAll(component)).toBeNull();
          expect(elements.tvShowsOnTheAirItems(component).length).toEqual(0);
          // TV-Shows # Airing-Today section
          expect(elements.tvShowsAiringTodayViewAll(component)).toBeNull();
          expect(elements.tvShowsAiringTodayItems(component).length).toEqual(0);
          // TV-Shows # Popular section
          expect(elements.tvShowsPopularViewAll(component)).toBeNull();
          expect(elements.tvShowsPopularItems(component).length).toEqual(0);
          // TV-Shows # Top-Rated section
          expect(elements.tvShowsTopRatedViewAll(component)).toBeNull();
          expect(elements.tvShowsTopRatedItems(component).length).toEqual(0);
        });

        it('should render the previously movies-fetched when the user select the "TV-Shows" and select the "Movies"', async () => {
          const entryQueryResult = homeTrendingMoviesResolvers();
          const resolvers = [
            {
              ...entryQueryResult.request,
              ...entryQueryResult.result,
            },
          ];
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to Movies
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.headerWrapper(component)).not.toBeNull();
          expect(elements.top3Wrapper(component).length).toEqual(3);
          // Movies # Now-playing section
          expect(elements.moviesNowPlayingViewAll(component)).not.toBeNull();
          expect(
            elements.moviesNowPlayingItems(component).length,
          ).toBeGreaterThan(0);
          // Movies # Popular section
          expect(elements.moviesPopularViewAll(component)).not.toBeNull();
          expect(elements.moviesPopularItems(component).length).toBeGreaterThan(
            0,
          );
          // Movies # Top-Rated section
          expect(elements.moviesTopRatedViewAll(component)).not.toBeNull();
          expect(
            elements.moviesTopRatedItems(component).length,
          ).toBeGreaterThan(0);
          // Movies # Upcoming section
          expect(elements.moviesUpcomingViewAll(component)).not.toBeNull();
          expect(
            elements.moviesUpcomingItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # On-the-Air section
          expect(elements.tvShowsOnTheAirViewAll(component)).toBeNull();
          expect(elements.tvShowsOnTheAirItems(component).length).toEqual(0);
          // TV-Shows # Airing-Today section
          expect(elements.tvShowsAiringTodayViewAll(component)).toBeNull();
          expect(elements.tvShowsAiringTodayItems(component).length).toEqual(0);
          // TV-Shows # Popular section
          expect(elements.tvShowsPopularViewAll(component)).toBeNull();
          expect(elements.tvShowsPopularItems(component).length).toEqual(0);
          // TV-Shows # Top-Rated section
          expect(elements.tvShowsTopRatedViewAll(component)).toBeNull();
          expect(elements.tvShowsTopRatedItems(component).length).toEqual(0);
          // Selecting the Movies
        });
      });

      describe('When "TV-Shows" is selected', () => {
        beforeEach(() => {
          jest.useFakeTimers();
          jest.clearAllMocks();
        });

        afterEach(cleanup);

        it('should render the content correctly', async () => {
          const moviesQueryResult = homeTrendingMoviesResolvers();
          const tvShowsQueryResult = homeTrendingTVShowsResolvers();
          const resolvers = [
            {
              ...moviesQueryResult.request,
              ...moviesQueryResult.result,
            },
            {
              ...tvShowsQueryResult.request,
              ...tvShowsQueryResult.result,
            },
          ];
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            // Loaded Movies-data
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          // Loading TV-Shows-data
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.headerWrapper(component)).not.toBeNull();
          expect(elements.top3Wrapper(component).length).toEqual(3);
          // Movies # Now-playing section
          expect(elements.moviesNowPlayingViewAll(component)).toBeNull();
          expect(elements.moviesNowPlayingItems(component).length).toEqual(0);
          // Movies # Popular section
          expect(elements.moviesPopularViewAll(component)).toBeNull();
          expect(elements.moviesPopularItems(component).length).toEqual(0);
          // Movies # Top-Rated section
          expect(elements.moviesTopRatedViewAll(component)).toBeNull();
          expect(elements.moviesTopRatedItems(component).length).toEqual(0);
          // Movies # Upcoming section
          expect(elements.moviesUpcomingViewAll(component)).toBeNull();
          expect(elements.moviesUpcomingItems(component).length).toEqual(0);
          // TV-Shows # On-the-Air section
          expect(elements.tvShowsOnTheAirViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsOnTheAirItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Airing-Today section
          expect(elements.tvShowsAiringTodayViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsAiringTodayItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Popular section
          expect(elements.tvShowsPopularViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsPopularItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Top-Rated section
          expect(elements.tvShowsTopRatedViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsTopRatedItems(component).length,
          ).toBeGreaterThan(0);
        });

        it('should render the content correctly when the user selects the "TV-Shows", and then selects the "Movies" and then "TV-Shows" again', async () => {
          const moviesQueryResult = homeTrendingMoviesResolvers();
          const tvShowsQueryResult = homeTrendingTVShowsResolvers();
          const resolvers = [
            {
              ...moviesQueryResult.request,
              ...moviesQueryResult.result,
            },
            {
              ...tvShowsQueryResult.request,
              ...tvShowsQueryResult.result,
            },
          ];
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            // Loaded Movies-data
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to Movies
          fireEvent.press(elements.moviesButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          // Switching to TV-Shows
          fireEvent.press(elements.tvShowsButton(component));
          act(() => {
            timeTravel(TRANSITIONING_DURATION);
          });
          await waitFor(() => {
            expect(elements.content(component)).not.toBeNull();
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.headerWrapper(component)).not.toBeNull();
          expect(elements.top3Wrapper(component).length).toEqual(3);
          // Movies # Now-playing section
          expect(elements.moviesNowPlayingViewAll(component)).toBeNull();
          expect(elements.moviesNowPlayingItems(component).length).toEqual(0);
          // Movies # Popular section
          expect(elements.moviesPopularViewAll(component)).toBeNull();
          expect(elements.moviesPopularItems(component).length).toEqual(0);
          // Movies # Top-Rated section
          expect(elements.moviesTopRatedViewAll(component)).toBeNull();
          expect(elements.moviesTopRatedItems(component).length).toEqual(0);
          // Movies # Upcoming section
          expect(elements.moviesUpcomingViewAll(component)).toBeNull();
          expect(elements.moviesUpcomingItems(component).length).toEqual(0);
          // TV-Shows # On-the-Air section
          expect(elements.tvShowsOnTheAirViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsOnTheAirItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Airing-Today section
          expect(elements.tvShowsAiringTodayViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsAiringTodayItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Popular section
          expect(elements.tvShowsPopularViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsPopularItems(component).length,
          ).toBeGreaterThan(0);
          // TV-Shows # Top-Rated section
          expect(elements.tvShowsTopRatedViewAll(component)).not.toBeNull();
          expect(
            elements.tvShowsTopRatedItems(component).length,
          ).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Pressing the items', () => {
    describe('When "Movies" is selected', () => {
      beforeEach(() => {
        jest.useFakeTimers();

        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should call "navigate" correctly when the user press a "top3"-item', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const indexTop3Selected = randomPositiveNumber(2, 0);
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.top3Wrapper(component)[indexTop3Selected]);
        const titleMovieSelected = elements.top3Texts(component)[
          indexTop3Selected
        ].children[0] as string;
        const indexMovieSelected = titleMovieSelected.split('-')[1];
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
          ...trendingMovies.nowPlaying.items[indexMovieSelected],
          genreIds:
            trendingMovies.nowPlaying.items[indexMovieSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Now-Playing-View-All" button', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.moviesNowPlayingViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesNowPlayingViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
            initialDataset: trendingMovies.nowPlaying.items,
            sectionKey: 'nowPlaying',
            isMovie: true,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Now-Playing" section', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        const indexItemSelected = randomPositiveNumber(
          trendingMovies.nowPlaying.items.length - 1,
          0,
        );
        await waitFor(() => {
          expect(elements.moviesNowPlayingViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.moviesNowPlayingItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
          ...trendingMovies.nowPlaying.items[indexItemSelected],
          genreIds:
            trendingMovies.nowPlaying.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Popular-View-All" button', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.moviesPopularViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesPopularViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
            initialDataset: trendingMovies.popular.items,
            sectionKey: 'popular',
            isMovie: true,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Popular" section', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        const indexItemSelected = randomPositiveNumber(
          trendingMovies.popular.items.length - 1,
          0,
        );
        await waitFor(() => {
          expect(elements.moviesPopularViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.moviesPopularItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
          ...trendingMovies.popular.items[indexItemSelected],
          genreIds:
            trendingMovies.popular.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Top-Rated-All" button', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.moviesTopRatedViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesTopRatedViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
            initialDataset: trendingMovies.topRated.items,
            sectionKey: 'topRated',
            isMovie: true,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Top-Rated" section', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        const indexItemSelected = randomPositiveNumber(
          trendingMovies.topRated.items.length - 1,
          0,
        );
        await waitFor(() => {
          expect(elements.moviesTopRatedViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.moviesTopRatedItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
          ...trendingMovies.topRated.items[indexItemSelected],
          genreIds:
            trendingMovies.topRated.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Upcoming-All" button', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.moviesUpcomingViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.moviesUpcomingViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
            initialDataset: trendingMovies.upcoming.items,
            sectionKey: 'upcoming',
            isMovie: true,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Upcoming" section', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        const indexItemSelected = randomPositiveNumber(
          trendingMovies.upcoming.items.length - 1,
          0,
        );
        await waitFor(() => {
          expect(elements.moviesTopRatedViewAll(component)).not.toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.moviesUpcomingItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
          ...trendingMovies.upcoming.items[indexItemSelected],
          genreIds:
            trendingMovies.upcoming.items[indexItemSelected].genreIds || [],
        });
      });
    });

    describe('When "TV-Shows" is selected', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
      });

      it('should call "navigate" correctly when the user press a "top3"-item', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const indexTop3Selected = randomPositiveNumber(2, 0);
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.top3Wrapper(component)[indexTop3Selected]);
        const titleMovieSelected = elements.top3Texts(component)[
          indexTop3Selected
        ].children[0] as string;
        const indexMovieSelected = titleMovieSelected.split('-')[1];
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
          ...trendingTvShows.onTheAir.items[indexMovieSelected],
          genreIds:
            trendingTvShows.onTheAir.items[indexMovieSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "On-The-Air-View-All" button', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsOnTheAirViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
            initialDataset: trendingTvShows.onTheAir.items,
            sectionKey: 'onTheAir',
            isMovie: false,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "On-The-Air" section', async () => {
        const indexItemSelected = randomPositiveNumber(
          trendingTvShows.onTheAir.items.length - 1,
          0,
        );
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.tvShowsOnTheAirItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
          ...trendingTvShows.onTheAir.items[indexItemSelected],
          genreIds:
            trendingTvShows.onTheAir.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Airing-Today-View-All" button', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsAiringTodayViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL,
            initialDataset: trendingTvShows.airingToday.items,
            sectionKey: 'airingToday',
            isMovie: false,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Airing-Today" section', async () => {
        const indexItemSelected = randomPositiveNumber(
          trendingTvShows.onTheAir.items.length - 1,
          0,
        );
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.tvShowsAiringTodayItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
          ...trendingTvShows.airingToday.items[indexItemSelected],
          genreIds:
            trendingTvShows.airingToday.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Popular-View-All" button', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsPopularViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
            initialDataset: trendingTvShows.popular.items,
            sectionKey: 'popular',
            isMovie: false,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Popular" section', async () => {
        const indexItemSelected = randomPositiveNumber(
          trendingTvShows.onTheAir.items.length - 1,
          0,
        );
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.tvShowsPopularItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
          ...trendingTvShows.popular.items[indexItemSelected],
          genreIds:
            trendingTvShows.popular.items[indexItemSelected].genreIds || [],
        });
      });

      it('should call "navigate" correctly when the user press the "Top-Rated-View-All" button', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.tvShowsTopRatedViewAll(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.MEDIA_DETAILS_VIEW_ALL,
          {
            headerTitle:
              Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
            initialDataset: trendingTvShows.topRated.items,
            sectionKey: 'topRated',
            isMovie: false,
          },
        );
      });

      it('should call "navigate" correctly when the user press some item of the "Top-Rated" section', async () => {
        const indexItemSelected = randomPositiveNumber(
          trendingTvShows.onTheAir.items.length - 1,
          0,
        );
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.result,
          },
        ];
        const navigate = jest.fn();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements.tvShowsTopRatedItems(component)[indexItemSelected],
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
          ...trendingTvShows.topRated.items[indexItemSelected],
          genreIds:
            trendingTvShows.topRated.items[indexItemSelected].genreIds || [],
        });
      });
    });
  });

  describe('When some error happens', () => {
    describe('When "Movies" is selected', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should show the "error-state" when a "GraphQL" error happens', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.responseWithGraphQLError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });

      it('should show the "error-state" when a "Network" error happens', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.responseWithNetworkError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });

      it('should be ablet o refetch the data after a "GraphQL" error', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.responseWithGraphQLError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.content(component)).toBeNull();
        // Loading Movies-data
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });

      it('should be able to refetch the data after a "Network" error', async () => {
        const entryQueryResult = homeTrendingMoviesResolvers();
        const resolvers = [
          {
            ...entryQueryResult.request,
            ...entryQueryResult.responseWithNetworkError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.content(component)).toBeNull();
        // Loading Movies-data
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });
    });

    describe('When "TV-Shows" is selected', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should show the "error-state" when a "GraphQL" error happens', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.responseWithGraphQLError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });

      it('should show the "error-state" when a "Network" error happens', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.responseWithNetworkError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
      });

      it('should be ablet o refetch the data after a "GraphQL" error', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.responseWithGraphQLError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.content(component)).toBeNull();
        // Loading TV-Shows-data
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });

      it('should be able to refetch the data after a "Network" error', async () => {
        const moviesQueryResult = homeTrendingMoviesResolvers();
        const tvShowsQueryResult = homeTrendingTVShowsResolvers();
        const resolvers = [
          {
            ...moviesQueryResult.request,
            ...moviesQueryResult.result,
          },
          {
            ...tvShowsQueryResult.request,
            ...tvShowsQueryResult.responseWithNetworkError,
          },
        ];
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
        fireEvent.press(elements.tvShowsButton(component));
        act(() => {
          timeTravel(TRANSITIONING_DURATION);
        });
        await waitFor(() => {
          expect(elements.alertMessageWrapper(component)).not.toBeNull();
          expect(elements.alertMessageText(component)).not.toBeNull();
          expect(elements.alertMessageText(component).children[0]).toEqual(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
          );
          expect(elements.topReloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.topReloadButton(component));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.content(component)).toBeNull();
        // Loading TV-Shows-data
        await waitFor(() => {
          expect(elements.content(component)).not.toBeNull();
          expect(elements.loading(component)).toBeNull();
        });
      });
    });
  });
});
