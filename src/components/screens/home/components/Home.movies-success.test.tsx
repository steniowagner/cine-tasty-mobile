jest.unmock('react-native-reanimated');
import React from 'react';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';
import possibleTypes from '@graphql/possibleTypes.json';
import {
  fireEvent,
  render,
  RenderAPI,
  within,
  waitFor,
} from '@testing-library/react-native';

import {AlertMessageProvider, TMDBImageQualitiesProvider} from '@providers';
import * as trendingMoviesFixtures from '@mocks/fixtures/home-trending-movies';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {Routes} from '@routes/routes';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

import {settingsModalOptions} from './settings-modal/options';
import {Home} from './Home';
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

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
        <TMDBImageQualitiesProvider>
          <Home navigation={{...navigation, navigate}} route={route} />
        </TMDBImageQualitiesProvider>
      </AlertMessageProvider>
    </MockedProvider>
  );
  return (
    <MockedNavigation
      extraScreens={[Routes.Home.HOME]}
      component={HomeScreen}
    />
  );
};

describe('<Home /> # Movies/success test cases', () => {
  const elements = {
    modalSheet: (api: RenderAPI) => api.queryByTestId('modal-sheet'),
    settingsOptionsButtons: (api: RenderAPI) =>
      api.queryAllByTestId('settings-modal-option-button'),
    settingsOptionsTexts: (api: RenderAPI) =>
      api.queryAllByTestId('settings-modal-option-text'),
    settingsButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-settings'),
    // searchButton: (api: RenderAPI) =>
    //   api.queryByTestId('header-icon-button-wrapper-magnify'),
    loading: (api: RenderAPI) => api.queryByTestId('loading-home'),
    top3LearnMoreButtons: (api: RenderAPI) =>
      api.queryAllByTestId('rounded-button'),
    top3Titles: (api: RenderAPI) => api.queryAllByTestId('top3-title'),
    viewAllButtons: (api: RenderAPI) => api.queryAllByTestId(/view-all-button/),
    sections: (api: RenderAPI) => api.queryAllByTestId('section-wrapper'),
  };

  describe('Settings flow', () => {
    it('should open the "Settings Modal" when the user presses the "Settings" button', async () => {
      const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      expect(elements.modalSheet(component).props.visible).toEqual(false);
      fireEvent.press(elements.settingsButton(component));
      expect(elements.modalSheet(component).props.visible).toEqual(true);
    });

    it('should show the elements correctly', async () => {
      const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      fireEvent.press(elements.settingsButton(component));
      const icons = within(elements.modalSheet(component)).queryAllByTestId(
        /icon-/,
      );
      elements
        .settingsOptionsTexts(component)
        .forEach((settingsOptionsText, index) => {
          expect(settingsOptionsText.children[0]).toEqual(
            settingsModalOptions[index].titleTag,
          );
          expect(icons[index].props.testID).toEqual(
            `icon-${settingsModalOptions[index].icon}`,
          );
        });
    });
  });

  describe('Pressing items', () => {
    const getTop3ItemSelected = (items: any[], titleItemSelected: string) => {
      const [, id] = titleItemSelected.split('-');
      return items[Number(id)];
    };

    // it('should navigate to the "Search" correctly when the user presses the "Search" button', () => {});

    it('should navigate to the "MovieDetails" correctly when the user presses the "Top3/Learn More" button', async () => {
      const navigate = jest.fn();
      const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers, navigate));
      const top3IndexSelected = randomPositiveNumber(2);
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      fireEvent.press(
        elements.top3LearnMoreButtons(component)[top3IndexSelected],
      );
      const top3TitleSelected =
        elements.top3Titles(component)[top3IndexSelected].children[0];
      const nowPlayingMovies = resolvers[0].result.data.trendingMovies
        .nowPlaying
        .items as SchemaTypes.TrendingNowPlayingMovies_trendingMovies_nowPlaying_items[];
      const movieSelected = getTop3ItemSelected(
        nowPlayingMovies,
        top3TitleSelected,
      );
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
        ...movieSelected,
        genreIds: movieSelected.genreIds || [],
      });
    });

    describe('Pressing the "View all" button', () => {
      describe('When the section selected is "Now playing"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          fireEvent.press(elements.viewAllButtons(component)[0]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingMovies.nowPlaying.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
              sectionKey: 'nowPlaying',
              isMovie: true,
            },
          );
        });
      });

      describe('When the section selected is "Popular"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          fireEvent.press(elements.viewAllButtons(component)[1]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingMovies.popular.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
              sectionKey: 'popular',
              isMovie: true,
            },
          );
        });
      });

      describe('When the section selected is "Top rated"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          fireEvent.press(elements.viewAllButtons(component)[2]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingMovies.topRated.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
              sectionKey: 'topRated',
              isMovie: true,
            },
          );
        });
      });

      describe('When the section selected is "Upcoming"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          fireEvent.press(elements.viewAllButtons(component)[3]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingMovies.topRated.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
              sectionKey: 'upcoming',
              isMovie: true,
            },
          );
        });
      });
    });

    describe('Pressing the secion-items', () => {
      describe('When the section selected is "Now playing"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          const nowPlayingItems =
            resolvers[0].result.data.trendingMovies.nowPlaying.items;
          const indexItemSelected = randomPositiveNumber(
            nowPlayingItems.length - 1,
          );
          const nowPlayingItemSelected = nowPlayingItems[indexItemSelected];
          const nowPlayingSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[0],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING);
          fireEvent.press(nowPlayingSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
            ...nowPlayingItemSelected,
            genreIds: nowPlayingItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Popular"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const popularItems =
            resolvers[0].result.data.trendingMovies.popular.items;
          const indexItemSelected = randomPositiveNumber(
            popularItems.length - 1,
          );
          const popularItemSelected = popularItems[indexItemSelected];
          const popularSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[1],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_POPULAR);
          fireEvent.press(popularSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
            ...popularItemSelected,
            genreIds: popularItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Top rated"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          const topRatedItems =
            resolvers[0].result.data.trendingMovies.topRated.items;
          const indexItemSelected = randomPositiveNumber(
            topRatedItems.length - 1,
          );
          const topRatedItemSelected = topRatedItems[indexItemSelected];
          const topRatedSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[2],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED);
          fireEvent.press(topRatedSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
            ...topRatedItemSelected,
            genreIds: topRatedItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Upcoming"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
            expect(elements.sections(component)).not.toBeNull();
          });
          const upcomingItems =
            resolvers[0].result.data.trendingMovies.upcoming.items;
          const indexItemSelected = randomPositiveNumber(
            upcomingItems.length - 1,
          );
          const upcomingItemSelected = upcomingItems[indexItemSelected];
          const upcomingSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[3],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING);
          fireEvent.press(upcomingSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MOVIE_DETAILS, {
            ...upcomingItemSelected,
            genreIds: upcomingItemSelected.genreIds || [],
          });
        });
      });
    });
  });

  describe('When fetches data successfully', () => {
    it('should only show "Movies" in the "Top3" items', async () => {
      const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      const top3Titles = elements
        .top3Titles(component)
        .map(top3Title => top3Title.children[0]);
      top3Titles.forEach(top3Title => {
        expect(top3Title.startsWith('MOVIE')).toEqual(true);
      });
    });

    it('should not show "TV-Shows" in the "Trendings" items', async () => {
      const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      const titles = component.queryAllByTestId('simplified-media-list-title');
      titles.forEach(title => {
        expect((title.children[0] as string).includes('TV_SHOW')).toEqual(
          false,
        );
      });
    });

    describe('When the section selected is "Now playing"', () => {
      it('should only show "Movies" in the "Trendings" items', async () => {
        const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(
            component.queryAllByTestId(
              Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING,
            ).length,
          ).toBeGreaterThan(0);
        });
        const nowPlayingItems =
          resolvers[0].result.data.trendingMovies.nowPlaying.items;
        const nowPlayingTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        nowPlayingTitles.forEach((nowPlayingTitle, index) => {
          expect(nowPlayingTitle.children[0]).toEqual(
            nowPlayingItems[index].title,
          );
        });
      });
    });

    describe('When the section selected is "Popular"', () => {
      it('should only show "Movies" in the "Trendings" items', async () => {
        const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(
            component.queryAllByTestId(
              Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
            ).length,
          ).toBeGreaterThan(0);
        });
        const popularItems =
          resolvers[0].result.data.trendingMovies.popular.items;
        const popularTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        popularTitles.forEach((popularTitle, index) => {
          expect(popularTitle.children[0]).toEqual(popularItems[index].title);
        });
      });
    });

    describe('When the section selected is "Top rated"', () => {
      it('should only show "Movies" in the "Trendings" items', async () => {
        const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(
            component.queryAllByTestId(
              Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
            ).length,
          ).toBeGreaterThan(0);
        });
        const topRatedItems =
          resolvers[0].result.data.trendingMovies.topRated.items;
        const topRatedTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        topRatedTitles.forEach((topRated, index) => {
          expect(topRated.children[0]).toEqual(topRatedItems[index].title);
        });
      });
    });

    describe('When the section selected is "Upcoming"', () => {
      it('should only show "Movies" in the "Trendings" items', async () => {
        const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(
            component.queryAllByTestId(
              Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
            ).length,
          ).toBeGreaterThan(0);
        });
        const upcomingItems =
          resolvers[0].result.data.trendingMovies.upcoming.items;
        const upcomingTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        upcomingTitles.forEach((upcomingTitle, index) => {
          expect(upcomingTitle.children[0]).toEqual(upcomingItems[index].title);
        });
      });
    });
  });
});
