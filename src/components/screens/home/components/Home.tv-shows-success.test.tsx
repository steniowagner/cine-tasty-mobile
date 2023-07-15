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
  cleanup,
} from '@testing-library/react-native';

import {AlertMessageProvider, TMDBImageQualitiesProvider} from '@providers';
import * as trendingTVShowsFixtures from '@mocks/fixtures/home-trending-tv-shows';
import * as trendingMoviesFixtures from '@mocks/fixtures/home-trending-movies';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {Routes} from '@routes/routes';
import {Translations} from '@i18n/tags';

import {settingsModalOptions} from './settings/settings-modal/options';
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

describe('<Home /> # TV-Shows/success test cases', () => {
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
    tvShowsSwitcher: (api: RenderAPI) =>
      api.queryByTestId(`${Translations.Tags.HOME_TV_SHOWS}-button`),
    moviessSwitcher: (api: RenderAPI) =>
      api.queryByTestId(`${Translations.Tags.HOME_MOVIES}-button`),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    reloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
  };

  const navigateToTVShows = async (component: any) => {
    await waitFor(() => {
      expect(elements.loading(component)).toBeNull();
      expect(elements.sections(component)).not.toBeNull();
    });
    fireEvent.press(elements.tvShowsSwitcher(component));
    await waitFor(() => {
      expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
        0,
      );
    });
  };

  describe('Settings flow', () => {
    it('should open the "Settings Modal" when the user presses the "Settings" button', async () => {
      const resolvers = [
        ...trendingMoviesFixtures.makeQuerySuccessResolver(),
        ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
      ];
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      fireEvent.press(elements.tvShowsSwitcher(component));
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
      const resolvers = [
        ...trendingMoviesFixtures.makeQuerySuccessResolver(),
        ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
      ];
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      fireEvent.press(elements.tvShowsSwitcher(component));
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

    describe('Navigating to the settings-options screens', () => {
      it('should navigate to the "Settings/Images Quality" screen when the user presses the "Images Quality" option', async () => {
        const navigate = jest.fn();
        const resolvers = [
          ...trendingMoviesFixtures.makeQuerySuccessResolver(),
          ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
        ];
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.tvShowsSwitcher(component));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.settingsButton(component));
        expect(navigate).toBeCalledTimes(0);
        fireEvent.press(elements.settingsOptionsButtons(component)[0]);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(
          Routes.Home.SETTINGS_IMAGES_QUALITY,
        );
      });

      it('should navigate to the "Settings/Language" screen when the user presses the "Language" option', async () => {
        const navigate = jest.fn();
        const resolvers = [
          ...trendingMoviesFixtures.makeQuerySuccessResolver(),
          ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
        ];
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.tvShowsSwitcher(component));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.settingsButton(component));
        expect(navigate).toBeCalledTimes(0);
        fireEvent.press(elements.settingsOptionsButtons(component)[1]);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Home.SETTINGS_LANGUAGE);
      });

      it('should navigate to the "Settings/Theme" screen when the user presses the "Theme" option', async () => {
        const navigate = jest.fn();
        const resolvers = [
          ...trendingMoviesFixtures.makeQuerySuccessResolver(),
          ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
        ];
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.tvShowsSwitcher(component));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.settingsButton(component));
        expect(navigate).toBeCalledTimes(0);
        fireEvent.press(elements.settingsOptionsButtons(component)[2]);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Home.SETTINGS_THEME);
      });

      it('should navigate to the "Settings/Open-source" screen when the user presses the "Open-source" option', async () => {
        const navigate = jest.fn();
        const resolvers = [
          ...trendingMoviesFixtures.makeQuerySuccessResolver(),
          ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
        ];
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.tvShowsSwitcher(component));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.settingsButton(component));
        expect(navigate).toBeCalledTimes(0);
        fireEvent.press(elements.settingsOptionsButtons(component)[3]);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Home.SETTINGS_OPEN_SOURCE);
      });

      it('should navigate to the "Settings/About" screen when the user presses the "About" option', async () => {
        const navigate = jest.fn();
        const resolvers = trendingMoviesFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers, navigate));
        await waitFor(() => {
          expect(
            elements.top3LearnMoreButtons(component).length,
          ).toBeGreaterThan(0);
        });
        fireEvent.press(elements.settingsButton(component));
        expect(navigate).toBeCalledTimes(0);
        fireEvent.press(elements.settingsOptionsButtons(component)[4]);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Home.SETTINGS_ABOUT);
      });
    });
  });

  describe('Pressing items', () => {
    beforeEach(cleanup);

    const getTop3ItemSelected = (items: any[], titleItemSelected: string) => {
      const [, id] = titleItemSelected.split('-');
      return items[Number(id)];
    };

    // it('should navigate to the "Search" correctly when the user presses the "Search" button', () => {});

    it('should navigate to the "MediaDetails" correctly when the user presses the "Top3/Learn More" button', async () => {
      const navigate = jest.fn();
      const resolvers = [
        ...trendingMoviesFixtures.makeQuerySuccessResolver(),
        ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
      ];
      const component = render(renderHome(resolvers, navigate));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      fireEvent.press(elements.tvShowsSwitcher(component));
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      const top3IndexSelected = randomPositiveNumber(2);
      fireEvent.press(
        elements.top3LearnMoreButtons(component)[top3IndexSelected],
      );
      const top3TitleSelected =
        elements.top3Titles(component)[top3IndexSelected].children[0];
      const airingTodayTVShows =
        resolvers[1].result.data.trendingTvShows.airingToday.items;
      const tvShowSelected = getTop3ItemSelected(
        airingTodayTVShows,
        top3TitleSelected,
      );
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
        ...tvShowSelected,
        genreIds: tvShowSelected.genreIds || [],
      });
    });

    describe('Pressing the "View all" button', () => {
      describe('When the section selected is "On the air"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await navigateToTVShows(component);
          fireEvent.press(elements.viewAllButtons(component)[0]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingTvShows.onTheAir.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
              sectionKey: 'onTheAir',
              isMovie: false,
            },
          );
        });
      });

      describe('When the section selected is "Airing today"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await navigateToTVShows(component);
          fireEvent.press(elements.viewAllButtons(component)[1]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingTvShows.airingToday.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL,
              sectionKey: 'airingToday',
              isMovie: false,
            },
          );
        });
      });

      describe('When the section selected is "Popular"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await navigateToTVShows(component);
          fireEvent.press(elements.viewAllButtons(component)[2]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingTvShows.popular.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
              sectionKey: 'popular',
              isMovie: false,
            },
          );
        });
      });

      describe('When the section selected is "Top rated"', () => {
        it('should navigate to the "ViewAllList" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
          const component = render(renderHome(resolvers, navigate));
          await navigateToTVShows(component);
          fireEvent.press(elements.viewAllButtons(component)[3]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(
            Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            {
              initialDataset:
                resolvers[0].result.data.trendingTvShows.topRated.items,
              headerTitle:
                Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
              sectionKey: 'topRated',
              isMovie: false,
            },
          );
        });
      });
    });

    describe('Pressing the secion-items', () => {
      describe('When the section selected is "On the air"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = [
            ...trendingMoviesFixtures.makeQuerySuccessResolver(),
            ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
          ];
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.sections(component)).not.toBeNull();
          });
          await navigateToTVShows(component);
          const onTheAirItems =
            resolvers[1].result.data.trendingTvShows.onTheAir.items;
          const indexItemSelected = randomPositiveNumber(
            onTheAirItems.length - 1,
          );
          const onTheAirItemSelected = onTheAirItems[indexItemSelected];
          const onTheAirSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[0],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR);
          fireEvent.press(onTheAirSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            ...onTheAirItemSelected,
            genreIds: onTheAirItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Airing today"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = [
            ...trendingMoviesFixtures.makeQuerySuccessResolver(),
            ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
          ];
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.sections(component)).not.toBeNull();
          });
          await navigateToTVShows(component);
          const airingTodayItems =
            resolvers[1].result.data.trendingTvShows.airingToday.items;
          const indexItemSelected = randomPositiveNumber(
            airingTodayItems.length - 1,
          );
          const airingTodayItemSelected = airingTodayItems[indexItemSelected];
          const airingTodaySectionNodes = within(
            component.queryAllByTestId('section-wrapper')[1],
          ).getAllByTestId(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
          );
          fireEvent.press(airingTodaySectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            ...airingTodayItemSelected,
            genreIds: airingTodayItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Popular"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = [
            ...trendingMoviesFixtures.makeQuerySuccessResolver(),
            ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
          ];
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.sections(component)).not.toBeNull();
          });
          await navigateToTVShows(component);
          const popularItems =
            resolvers[1].result.data.trendingTvShows.popular.items;
          const indexItemSelected = randomPositiveNumber(
            popularItems.length - 1,
          );
          const popularItemSelected = popularItems[indexItemSelected];
          const popularSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[2],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR);
          fireEvent.press(popularSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            ...popularItemSelected,
            genreIds: popularItemSelected.genreIds || [],
          });
        });
      });

      describe('When the section selected is "Top rated"', () => {
        it('should navigate to the "MediaDetails" correctly', async () => {
          const navigate = jest.fn();
          const resolvers = [
            ...trendingMoviesFixtures.makeQuerySuccessResolver(),
            ...trendingTVShowsFixtures.makeQuerySuccessResolver(),
          ];
          const component = render(renderHome(resolvers, navigate));
          await waitFor(() => {
            expect(elements.sections(component)).not.toBeNull();
          });
          await navigateToTVShows(component);
          const topRatedItems =
            resolvers[1].result.data.trendingTvShows.topRated.items;
          const indexItemSelected = randomPositiveNumber(
            topRatedItems.length - 1,
          );
          const topRatedItemSelected = topRatedItems[indexItemSelected];
          const topRatedSectionNodes = within(
            component.queryAllByTestId('section-wrapper')[3],
          ).getAllByTestId(Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED);
          fireEvent.press(topRatedSectionNodes[indexItemSelected]);
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            ...topRatedItemSelected,
            genreIds: topRatedItemSelected.genreIds || [],
          });
        });
      });
    });
  });

  describe('When fetches data successfully', () => {
    it('should only show "TV-Shows" in the "Top3" items', async () => {
      const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await navigateToTVShows(component);
      await waitFor(() => {
        expect(elements.top3LearnMoreButtons(component).length).toBeGreaterThan(
          0,
        );
      });
      const top3Titles = elements
        .top3Titles(component)
        .map(top3Title => top3Title.children[0]);
      top3Titles.forEach(top3Title => {
        expect(top3Title.startsWith('TV_SHOW')).toEqual(true);
      });
    });

    it('should not show "Movies" in the "Trendings" items', async () => {
      const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
      const component = render(renderHome(resolvers));
      await navigateToTVShows(component);
      const titles = component.queryAllByTestId('simplified-media-list-title');
      titles.forEach(title => {
        expect((title.children[0] as string).includes('MOVIE')).toEqual(false);
      });
    });

    describe('When the section selected is "On the air"', () => {
      it('should only show "TV Shows" in the "Trendings" items', async () => {
        const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await navigateToTVShows(component);
        const onTheAirItems =
          resolvers[0].result.data.trendingTvShows.onTheAir.items;
        const onTheAirTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        onTheAirTitles.forEach((onTheAirTitle, index) => {
          expect(onTheAirTitle.children[0]).toEqual(onTheAirItems[index].title);
        });
      });
    });

    describe('When the section selected is "Airing today"', () => {
      it('should only show "TV Shows" in the "Trendings" items', async () => {
        const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await navigateToTVShows(component);
        const airingTodayItems =
          resolvers[0].result.data.trendingTvShows.airingToday.items;
        const airingTodayTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        airingTodayTitles.forEach((airingTodayTitle, index) => {
          expect(airingTodayTitle.children[0]).toEqual(
            airingTodayItems[index].title,
          );
        });
      });
    });

    describe('When the section selected is "Popular"', () => {
      it('should only show "TV Shows" in the "Trendings" items', async () => {
        const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await navigateToTVShows(component);
        const popularItems =
          resolvers[0].result.data.trendingTvShows.popular.items;
        const popularTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        popularTitles.forEach((popularTitle, index) => {
          expect(popularTitle.children[0]).toEqual(popularItems[index].title);
        });
      });
    });

    describe('When the section selected is "Top rated"', () => {
      it('should only show "TV Shows" in the "Trendings" items', async () => {
        const resolvers = trendingTVShowsFixtures.makeQuerySuccessResolver();
        const component = render(renderHome(resolvers));
        await navigateToTVShows(component);
        const topRatedItems =
          resolvers[0].result.data.trendingTvShows.topRated.items;
        const topRatedTitles = within(
          component.queryAllByTestId(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED,
          )[0],
        ).queryAllByTestId('simplified-media-list-title');
        topRatedTitles.forEach((topRated, index) => {
          expect(topRated.children[0]).toEqual(topRatedItems[index].title);
        });
      });
    });
  });
});
