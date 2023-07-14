jest.unmock('react-native-reanimated');
import React from 'react';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';
import possibleTypes from '@graphql/possibleTypes.json';
import {
  fireEvent,
  cleanup,
  render,
  RenderAPI,
  within,
  waitFor,
} from '@testing-library/react-native';

import {AlertMessageProvider, TMDBImageQualitiesProvider} from '@providers';
import * as trendingMoviesFixtures from '@mocks/fixtures/home-trending-movies';
import MockedNavigation from '@mocks/MockedNavigator';
import {Routes} from '@routes/routes';
import {Translations} from '@i18n/tags';

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

describe('<Home /> # Movies/errors test cases', () => {
  const elements = {
    loading: (api: RenderAPI) => api.queryByTestId('loading-home'),
    top3LearnMoreButtons: (api: RenderAPI) =>
      api.queryAllByTestId('rounded-button'),
    top3Titles: (api: RenderAPI) => api.queryAllByTestId('top3-title'),
    sections: (api: RenderAPI) => api.queryAllByTestId('section-wrapper'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
    reloadButton: (api: RenderAPI) => api.queryByTestId('top-reload-button'),
  };

  describe('When a "GraphQL error" happens', () => {
    beforeEach(cleanup);

    it('should show the "Error message" correctly', async () => {
      const resolvers =
        trendingMoviesFixtures.makeQueryWithGraphQLErrorResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
        );
      });
    });

    it('should show the "Reload button"', async () => {
      const resolvers =
        trendingMoviesFixtures.makeQueryWithGraphQLErrorResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.reloadButton(component)).not.toBeNull();
      });
    });

    describe('When pressing the "Reload button"', () => {
      beforeEach(cleanup);

      it('should show the "Loading state"', async () => {
        const resolvers =
          trendingMoviesFixtures.makeQueryWithGraphQLErrorResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.reloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.reloadButton(component));
        await waitFor(() => {
          expect(elements.loading(component)).not.toBeNull();
        });
      });

      describe('When another "GraphQL error" happens during the refetch', () => {
        beforeEach(cleanup);

        it('should show the "Error message" correctly', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithGraphQLErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
            );
          });
        });

        it('should show the "Reload button"', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithGraphQLErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
        });
      });

      describe('When a "Network error" happens during the refetch', () => {
        beforeEach(cleanup);

        it('should show the "Error message" correctly', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithNetworkErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
            );
          });
        });

        it('should show the "Reload button"', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithNetworkErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
        });
      });

      describe('When successfully refetches the data', () => {
        beforeEach(cleanup);

        it('should only show "Movies" in the "Top3" items', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(
              elements.top3LearnMoreButtons(component).length,
            ).toBeGreaterThan(0);
          });
          const top3Titles = elements
            .top3Titles(component)
            .map(top3Title => top3Title.children[0]);
          top3Titles.forEach(top3Title => {
            expect(top3Title.startsWith('MOVIE')).toEqual(true);
          });
        });

        describe('When the section selected is "Now playing"', () => {
          it('should only show "Movies" in the "Trendings" items', async () => {
            const resolvers =
              trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const nowPlayingItems =
              resolvers[1].result.data.trendingMovies.nowPlaying.items;
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
            const resolvers =
              trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const popularItems =
              resolvers[1].result.data.trendingMovies.popular.items;
            const popularTitles = within(
              component.queryAllByTestId(
                Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
              )[0],
            ).queryAllByTestId('simplified-media-list-title');
            popularTitles.forEach((popularTitle, index) => {
              expect(popularTitle.children[0]).toEqual(
                popularItems[index].title,
              );
            });
          });
        });

        describe('When the section selected is "Top rated"', () => {
          it('should only show "Movies" in the "Trendings" items', async () => {
            const resolvers =
              trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const topRatedItems =
              resolvers[1].result.data.trendingMovies.topRated.items;
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
            const resolvers =
              trendingMoviesFixtures.makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const upcomingItems =
              resolvers[1].result.data.trendingMovies.upcoming.items;
            const upcomingTitles = within(
              component.queryAllByTestId(
                Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
              )[0],
            ).queryAllByTestId('simplified-media-list-title');
            upcomingTitles.forEach((upcomingTitle, index) => {
              expect(upcomingTitle.children[0]).toEqual(
                upcomingItems[index].title,
              );
            });
          });
        });
      });
    });
  });

  describe('When a "Network error" happens', () => {
    beforeEach(cleanup);

    it('should show the "Error message" correctly', async () => {
      const resolvers =
        trendingMoviesFixtures.makeQueryWithNetworkErrorResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.alertMessageText(component)).not.toBeNull();
        expect(elements.alertMessageText(component).children[0]).toEqual(
          Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
        );
      });
    });

    it('should show the "Reload button"', async () => {
      const resolvers =
        trendingMoviesFixtures.makeQueryWithNetworkErrorResolver();
      const component = render(renderHome(resolvers));
      await waitFor(() => {
        expect(elements.reloadButton(component)).not.toBeNull();
      });
    });

    describe('When pressing the "Reload button"', () => {
      beforeEach(cleanup);

      it('should show the "Loading state"', async () => {
        const resolvers =
          trendingMoviesFixtures.makeQueryWithNetworkErrorResolver();
        const component = render(renderHome(resolvers));
        await waitFor(() => {
          expect(elements.reloadButton(component)).not.toBeNull();
        });
        fireEvent.press(elements.reloadButton(component));
        await waitFor(() => {
          expect(elements.loading(component)).not.toBeNull();
        });
      });

      describe('When another "Network error" happens during the refetch', () => {
        beforeEach(cleanup);

        it('should show the "Error message" correctly', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithNetworkErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
            );
          });
        });

        it('should show the "Reload button"', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithNetworkErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
        });
      });

      describe('When a "GraphQL" happens during the refetch', () => {
        beforeEach(cleanup);

        it('should show the "Error message" correctly', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithGraphQLErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.alertMessageText(component)).not.toBeNull();
            expect(elements.alertMessageText(component).children[0]).toEqual(
              Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
            );
          });
        });

        it('should show the "Reload button"', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithGraphQLErrorResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
        });
      });

      describe('When successfully refetches the data', () => {
        beforeEach(cleanup);

        it('should only show "Movies" in the "Top3" items', async () => {
          const resolvers =
            trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithSuccessResolver();
          const component = render(renderHome(resolvers));
          await waitFor(() => {
            expect(elements.reloadButton(component)).not.toBeNull();
          });
          fireEvent.press(elements.reloadButton(component));
          await waitFor(() => {
            expect(
              elements.top3LearnMoreButtons(component).length,
            ).toBeGreaterThan(0);
          });
          const top3Titles = elements
            .top3Titles(component)
            .map(top3Title => top3Title.children[0]);
          top3Titles.forEach(top3Title => {
            expect(top3Title.startsWith('MOVIE')).toEqual(true);
          });
        });

        describe('When the section selected is "Now playing"', () => {
          it('should only show "Movies" in the "Trendings" items', async () => {
            const resolvers =
              trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const nowPlayingItems =
              resolvers[1].result.data.trendingMovies.nowPlaying.items;
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
            const resolvers =
              trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const popularItems =
              resolvers[1].result.data.trendingMovies.popular.items;
            const popularTitles = within(
              component.queryAllByTestId(
                Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
              )[0],
            ).queryAllByTestId('simplified-media-list-title');
            popularTitles.forEach((popularTitle, index) => {
              expect(popularTitle.children[0]).toEqual(
                popularItems[index].title,
              );
            });
          });
        });

        describe('When the section selected is "Top rated"', () => {
          it('should only show "Movies" in the "Trendings" items', async () => {
            const resolvers =
              trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const topRatedItems =
              resolvers[1].result.data.trendingMovies.topRated.items;
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
            const resolvers =
              trendingMoviesFixtures.makeQueryWithNetworkErrorAndRefetchWithSuccessResolver();
            const component = render(renderHome(resolvers));
            await waitFor(() => {
              expect(elements.reloadButton(component)).not.toBeNull();
            });
            fireEvent.press(elements.reloadButton(component));
            await waitFor(() => {
              expect(elements.loading(component)).toBeNull();
              expect(elements.sections(component)).not.toBeNull();
            });
            const upcomingItems =
              resolvers[1].result.data.trendingMovies.upcoming.items;
            const upcomingTitles = within(
              component.queryAllByTestId(
                Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
              )[0],
            ).queryAllByTestId('simplified-media-list-title');
            upcomingTitles.forEach((upcomingTitle, index) => {
              expect(upcomingTitle.children[0]).toEqual(
                upcomingItems[index].title,
              );
            });
          });
        });
      });
    });
  });
});