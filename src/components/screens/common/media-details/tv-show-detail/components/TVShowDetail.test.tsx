jest.unmock('react-native-reanimated');
import React from 'react';
import {Alert} from 'react-native';
import {
  cleanup,
  render,
  act,
  waitFor,
  RenderAPI,
  fireEvent,
} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as mockTVShowDetails from '@mocks/fixtures/tv-shows';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {AlertMessageProvider} from '@providers';
import {InMemoryCache} from '@apollo/client';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {TVShowDetail} from './TVShowDetail';

const POSTER_PATH = 'POSTER_PATH';
const TITLE = 'TITLE';
const ID = '1';

jest.spyOn(Alert, 'alert');

type RenderTVShowDetailsProps = {
  route?: Routes.Home.TV_SHOW_DETAILS | Routes.Famous.TV_SHOW_DETAILS;
  navigate?: jest.Mock;
  push?: jest.Mock;
  goBack?: jest.Mock;
  mockResolvers: any;
  voteAverage?: number;
  voteCount?: number;
  genreIds?: string[];
  id: string;
};

const getRandomRoute = () =>
  randomPositiveNumber(10, 1) % 2 === 0
    ? Routes.Home.TV_SHOW_DETAILS
    : Routes.Famous.TV_SHOW_DETAILS;

const renderTVShowDetails = (params: RenderTVShowDetailsProps) => {
  const routeName = params.route || getRandomRoute();

  const TvShowDetailsScreen = ({navigation}) => (
    <MockedProvider
      mocks={params.mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <TMDBImageQualitiesProvider>
        <AlertMessageProvider>
          <TVShowDetail
            navigation={{
              ...navigation,
              navigate: params.navigate,
              goBack: params.goBack,
              push: params.push,
              getState: () => ({
                routes: [{name: routeName}],
              }),
            }}
            route={{
              name: routeName,
              key: `${routeName}-key`,
              params: {
                posterPath: POSTER_PATH,
                title: TITLE,
                voteAverage: params.voteAverage,
                voteCount: params.voteCount,
                genreIds: params.genreIds,
                id: Number(params.id),
              },
            }}
          />
        </AlertMessageProvider>
      </TMDBImageQualitiesProvider>
    </MockedProvider>
  );
  return <MockedNavigation component={TvShowDetailsScreen} />;
};

describe('<TVShowDetails />', () => {
  const elements = {
    backButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-arrow-back'),
    headerInfo: (api: RenderAPI) => api.queryByTestId('header-info-wrapper'),
    tagsWrapper: (api: RenderAPI) => api.queryAllByTestId('tags'),
    tagsTexts: (api: RenderAPI) => api.queryAllByTestId('tag-text'),
    sectionsTitle: (api: RenderAPI) => api.queryAllByTestId('section-title'),
    overviewWrapper: (api: RenderAPI) =>
      api.queryByTestId('media-item-description-wrapper'),
    generalInfo: (api: RenderAPI) => api.queryByTestId('general-info-wrapper'),
    cast: (api: RenderAPI) => api.queryByTestId('people-list-cast'),
    creator: (api: RenderAPI) => api.queryByTestId('creator'),
    crew: (api: RenderAPI) => api.queryByTestId('people-list-crew'),
    images: (api: RenderAPI) => api.queryByTestId('images-list'),
    videos: (api: RenderAPI) => api.queryByTestId('videos-list'),
    productionCompanies: (api: RenderAPI) =>
      api.queryAllByTestId('production-network-companies'),
    reviews: (api: RenderAPI) => api.queryByTestId('reviews-content-wrapper'),
    similar: (api: RenderAPI) => api.queryByTestId('similar-list'),
    sections: (api: RenderAPI) => api.queryAllByTestId('section-wrapper'),
    voteAverage: (api: RenderAPI) => api.queryByTestId('votes-text'),
    voteCount: (api: RenderAPI) => api.queryByTestId('vote-count'),
    generalInfoItems: (api: RenderAPI) =>
      api.queryAllByTestId(/general-info-wrapper-/),
    generalInfoTitles: (api: RenderAPI) =>
      api.queryAllByTestId(/general-info-title-/),
    generalInfoValues: (api: RenderAPI) =>
      api.queryAllByTestId(/general-info-value-/),
    similarItems: (api: RenderAPI) =>
      api.queryAllByTestId('simplified-media-list-button'),
    castItems: (api: RenderAPI) => api.queryAllByTestId('button-wrapper-cast'),
    creatorsItems: (api: RenderAPI) =>
      api.queryAllByTestId('button-wrapper-creator'),
    crewItems: (api: RenderAPI) => api.queryAllByTestId('button-wrapper-crew'),
    imagesItem: (api: RenderAPI) =>
      api.queryAllByTestId('image-list-item-button'),
    videosItem: (api: RenderAPI) => api.queryAllByTestId('video-button'),
    viewAllReviews: (api: RenderAPI) =>
      api.queryByTestId('view-all-button-reviews'),
    seasons: (api: RenderAPI) => api.queryByTestId('rounded-button'),
    loading: (api: RenderAPI) => api.queryByTestId('media-details-loading'),
    backgroundImage: (api: RenderAPI) => api.queryByTestId('background-image'),
    contentWrapper: (api: RenderAPI) =>
      api.queryByTestId('tv-show-details-content'),
    adviseDescription: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    adviseSuggestion: (api: RenderAPI) =>
      api.queryByTestId('advise-suggestion'),
    adviseTitle: (api: RenderAPI) => api.queryByTestId('advise-title'),
    adviseWrapper: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
  };

  describe('Rendering the components', () => {
    describe('Default flow', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render correctly when it receive all the data', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.backButton(component)).not.toBeNull();
        expect(elements.headerInfo(component)).not.toBeNull();
        expect(elements.sections(component).length).toEqual(10);
        expect(elements.tagsWrapper(component)).not.toBeNull();
        expect(elements.overviewWrapper(component)).not.toBeNull();
        expect(elements.generalInfo(component)).not.toBeNull();
        expect(elements.seasons(component)).not.toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
        expect(elements.productionCompanies(component)).not.toBeNull();
        expect(elements.reviews(component)).not.toBeNull();
        expect(elements.similar(component)).not.toBeNull();
        expect(elements.adviseWrapper(component)).toBeNull();
      });

      it('should render the sections titles correctly', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.sectionsTitle(component).length).toEqual(11);
        expect(elements.sectionsTitle(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_OVERVIEW,
        );
        expect(elements.sectionsTitle(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_DETAILS,
        );
        expect(elements.sectionsTitle(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREATED_BY,
        );
        expect(elements.sectionsTitle(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST,
        );
        expect(elements.sectionsTitle(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW,
        );
        expect(elements.sectionsTitle(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES,
        );
        expect(elements.sectionsTitle(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
        );
        expect(elements.sectionsTitle(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NETWORKS,
        );
        expect(elements.sectionsTitle(component)[8].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
        );
        expect(elements.sectionsTitle(component)[9].children[0]).toEqual(
          `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (${resolvers[0].result.data.tvShow.reviews.length})`,
        );
        expect(elements.sectionsTitle(component)[10].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
        );
      });
    });

    describe('Rendering the Header-info/votes-average', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "votes-average" correctly when the "route.params.voteAverage" is set', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: false,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.voteAverage(component).children[0]).toEqual(
          `${voteAverage.toFixed(1)} `,
        );
        await waitFor(() => {});
      });

      it('should render the "votes-average" correctly when the "route.params.voteAverage" is not set and "tvShow.voteAvera" is set', async () => {
        const voteAverage = randomPositiveNumber(10, 1);
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            voteAverage,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.voteAverage(component).children[0]).toEqual(
          `${voteAverage.toFixed(1)} `,
        );
        await waitFor(() => {});
      });
    });

    describe('Rendering the Header-info/votes-count', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "votes-count" correctly when the "route.params.voteCount" is set', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: false,
          language: 'EN',
          id: ID,
        });
        const voteCount = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteCount,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.voteCount(component).children[0]).toEqual(
          ` (${voteCount})`,
        );
        await waitFor(() => {});
      });

      it('should render the "votes-count" correctly when the "route.params.voteCount" is not set and "tvShow.Count" is set', async () => {
        const voteCount = randomPositiveNumber(10, 1);
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            voteCount,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.voteCount(component).children[0]).toEqual(
          ` (${voteCount})`,
        );
        await waitFor(() => {});
      });
    });

    describe('Extra-tags', () => {
      describe('When the "extra-tags" comes from the "route.params"', () => {
        const id = '2';

        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the extra-tags correctly', async () => {
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: false,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const genreIds = Array(randomPositiveNumber(10, 1))
            .fill('')
            .map((_, index) => `ROUTE_PARAMS_GENRE_${index}`);
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              genreIds,
              id,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.tagsTexts(component).length).toBeGreaterThan(0);
          });
          expect(elements.tagsTexts(component)[0].children[0]).toEqual(
            mockTVShowDetails.firstAirDate.split('-')[0],
          );
          expect(elements.tagsTexts(component)[1].children[0]).toEqual(
            Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
          );
          await waitFor(() => {});
        });

        it('should render correctly "tags" content correctly', async () => {
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: false,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const genreIds = Array(randomPositiveNumber(10, 1))
            .fill('')
            .map((_, index) => `ROUTE_PARAMS_GENRE_${index}`);
          const extraTags = [
            mockTVShowDetails.firstAirDate.split('-')[0],
            Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
          ];
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              genreIds,
              id,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.tagsTexts(component).length).toBeGreaterThan(0);
          });
          for (let i = 0; i < genreIds.length + 2; i++) {
            if (i < 2) {
              expect(elements.tagsTexts(component)[i].children[0]).toEqual(
                extraTags[i],
              );
            } else {
              expect(elements.tagsTexts(component)[i].children[0]).toEqual(
                genreIds[i - 2],
              );
            }
          }
          await waitFor(() => {});
        });
      });

      describe('When the "extra-tags" comes from the "tvShows.genres"', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the extra-tags correctly', async () => {
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              id: ID,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.tagsTexts(component).length).toBeGreaterThan(0);
          });
          expect(elements.tagsTexts(component)[0].children[0]).toEqual(
            mockTVShowDetails.firstAirDate.split('-')[0],
          );
          expect(elements.tagsTexts(component)[1].children[0]).toEqual(
            Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
          );
        });

        it('should render correctly "tags" content correctly', async () => {
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const extraTags = [
            mockTVShowDetails.firstAirDate.split('-')[0],
            Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
          ];
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              id: ID,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.tagsTexts(component).length).toBeGreaterThan(0);
          });
          for (let i = 0; i < elements.tagsTexts(component).length; i++) {
            if (i < 2) {
              expect(elements.tagsTexts(component)[i].children[0]).toEqual(
                extraTags[i],
              );
            } else {
              expect(elements.tagsTexts(component)[i].children[0]).toEqual(
                `GENRE_${i - 2}`,
              );
            }
          }
        });
      });
    });

    describe('General-info', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "info-items" correctly when it has all the data', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: false,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime[0]}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data except for "original-name"', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeName: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime[0]}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "original-language" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            removeOriginalLanguage: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime[0]}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "number-of-episodes" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            removeNumberOfEpisodes: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime[0]}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "number-of-seasons" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            removeNumberOfSeasons: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime[0]}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "episode-runtime" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeEpisodeRuntime: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "original-country" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            removeOriginalCountry: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "first-air-date" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeFirstAirDate: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "last-air-date" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            removeLastAirDate: true,
          },
        );
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const tvShow = resolvers[0].result.data.tvShow;
        expect(elements.generalInfoItems(component).length).toEqual(8);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          tvShow.name,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          `${tvShow.numberOfSeasons}`,
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          `${tvShow.episodeRunTime}min`,
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry[0],
        );
        expect(elements.generalInfoTitles(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        expect(elements.generalInfoTitles(component)[7].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
        );
        expect(elements.generalInfoValues(component)[7].children[0]).toEqual(
          '-',
        );
      });
    });

    describe('List-sections', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the sections correctly', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
        expect(elements.similar(component)).not.toBeNull();
      });

      it('should render the sections correctly when "cast" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            castLength: 0,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.cast(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the "similar-section" correctly when it has some data to show', async () => {
        const similarLength = randomPositiveNumber(10, 1);
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            similarLength,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.similarItems(component).length).toEqual(similarLength);
      });

      it('should render the "similar-section" correctly when it is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            similarLength: 0,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.similarItems(component).length).toEqual(0);
      });

      it('should render the sections correctly when "crew" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            crewLenth: 0,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.crew(component)).toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the sections correctly when "images" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            imagesLength: 0,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.images(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the sections correctly when "videos" is empty', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          },
          {
            videosLength: 0,
          },
        );
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.videos(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
      });
    });
  });

  describe('Showing the "language-alert-message"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should call the "Alert.alert" correctly when the "overview" is an "empty string"', async () => {
      const resolvers = mockTVShowDetails.makeQuerySuccessResolver(
        {
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        },
        {
          removeOverview: true,
        },
      );
      render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: ID,
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledTimes(1);
      });
      expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
        Translations.Tags.LANGUAGE_WARNING_MEDIA_TITLE,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
        Translations.Tags.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
        Translations.Tags.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
        false,
      );
    });
  });

  describe(`When the current "route" is ${Routes.Home.TV_SHOW_DETAILS}`, () => {
    const route = Routes.Home.TV_SHOW_DETAILS;

    describe('Pressing the "seasons-button"', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call the "navigation.navigate" correctly', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const navigate = jest.fn();
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            route,
            navigate,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const {tvShow} = resolvers[0].result.data;
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.seasons(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Home.TV_SHOW_SEASONS, {
          numberOfSeasons: tvShow.numberOfSeasons,
          title: tvShow.name,
          id: tvShow.id,
        });
      });
    });

    describe('Pressing the some of the lists-items', () => {
      describe('When pressing some of the "cast" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correclty', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.cast(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.cast.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.castItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Home.FAMOUS_DETAILS, {
            profileImage: tvShow.cast[indexItemSelected].profilePath,
            name: tvShow.cast[indexItemSelected].name,
            id: Number(tvShow.cast[indexItemSelected].id),
          });
        });
      });

      describe('When pressing some of the "crew" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correctly', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.crew(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.crew.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.crewItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Home.FAMOUS_DETAILS, {
            profileImage: tvShow.crew[indexItemSelected].profilePath,
            name: tvShow.crew[indexItemSelected].name,
            id: Number(tvShow.crew[indexItemSelected].id),
          });
        });
      });

      describe('When pressing some of the "reviews" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.navigate" correctly"', async () => {
          const navigate = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              navigate,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.reviews(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.viewAllReviews(component));
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Home.MEDIA_REVIEWS, {
            mediaTitle: tvShow.name,
            reviews: tvShow.reviews,
          });
        });
      });

      describe('When pressing some of the "similar" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correctly', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.similar(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.similar.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.similarItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Home.TV_SHOW_DETAILS, {
            voteAverage: tvShow.similar[indexItemSelected].voteAverage,
            posterPath: tvShow.similar[indexItemSelected].posterPath,
            voteCount: tvShow.similar[indexItemSelected].voteCount,
            title: tvShow.similar[indexItemSelected].name,
            id: tvShow.similar[indexItemSelected].id,
          });
        });
      });
    });
  });

  describe(`When the current "route" is ${Routes.Famous.TV_SHOW_DETAILS}`, () => {
    const route = Routes.Famous.TV_SHOW_DETAILS;

    describe('Pressing the "seasons-button"', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call the "navigation.navigate" correctly', async () => {
        const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const navigate = jest.fn();
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            route,
            navigate,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        const {tvShow} = resolvers[0].result.data;
        expect(navigate).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.seasons(component));
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(Routes.Famous.TV_SHOW_SEASONS, {
          numberOfSeasons: tvShow.numberOfSeasons,
          title: tvShow.name,
          id: tvShow.id,
        });
      });
    });

    describe('Pressing the some of the lists-items', () => {
      describe('When pressing some of the "cast" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correclty', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.cast(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.cast.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.castItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
            profileImage: tvShow.cast[indexItemSelected].profilePath,
            name: tvShow.cast[indexItemSelected].name,
            id: Number(tvShow.cast[indexItemSelected].id),
          });
        });
      });

      describe('When pressing some of the "crew" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correctly', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.crew(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.crew.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.crewItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
            profileImage: tvShow.crew[indexItemSelected].profilePath,
            name: tvShow.crew[indexItemSelected].name,
            id: Number(tvShow.crew[indexItemSelected].id),
          });
        });
      });

      describe('When pressing some of the "reviews" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.navigate" correctly"', async () => {
          const navigate = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              navigate,
              id: ID,
            }),
          );
          await waitFor(() => {
            expect(elements.reviews(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          expect(navigate).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.viewAllReviews(component));
          expect(navigate).toHaveBeenCalledTimes(1);
          expect(navigate).toHaveBeenCalledWith(Routes.Famous.MEDIA_REVIEWS, {
            mediaTitle: tvShow.name,
            reviews: tvShow.reviews,
          });
        });
      });

      describe('When pressing some of the "similar" items', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should call "navigation.push" correctly', async () => {
          const push = jest.fn();
          const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: ID,
          });
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              route,
              push,
              id: ID,
            }),
          );
          act(() => {
            jest.runAllTimers();
          });
          await waitFor(() => {
            expect(elements.similar(component)).not.toBeNull();
          });
          const {tvShow} = resolvers[0].result.data;
          const indexItemSelected = randomPositiveNumber(
            tvShow.similar.length - 1,
            0,
          );
          expect(push).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.similarItems(component)[indexItemSelected]);
          expect(push).toHaveBeenCalledTimes(1);
          expect(push).toHaveBeenCalledWith(Routes.Famous.TV_SHOW_DETAILS, {
            voteAverage: tvShow.similar[indexItemSelected].voteAverage,
            posterPath: tvShow.similar[indexItemSelected].posterPath,
            voteCount: tvShow.similar[indexItemSelected].voteCount,
            title: tvShow.similar[indexItemSelected].name,
            id: tvShow.similar[indexItemSelected].id,
          });
        });
      });
    });
  });

  describe('When some "error" happens', () => {
    describe('When a "Network-error" happens', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should should render correctly', async () => {
        const resolvers = mockTVShowDetails.makeQueryNetworkErrorResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.loading(component)).toBeNull();
        expect(elements.backgroundImage(component)).toBeNull();
        expect(elements.contentWrapper(component)).toBeNull();
        expect(elements.headerInfo(component)).toBeNull();
        expect(elements.adviseWrapper(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "Advise" correctly', async () => {
        const resolvers = mockTVShowDetails.makeQueryNetworkErrorResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: ID,
          }),
        );
        await waitFor(() => {
          expect(elements.adviseWrapper(component)).not.toBeNull();
        });
        expect(elements.adviseTitle(component)).not.toBeNull();
        expect(elements.adviseTitle(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_TITLE,
        );
        expect(elements.adviseDescription(component)).not.toBeNull();
        expect(elements.adviseDescription(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_DESCRIPTION,
        );
        expect(elements.adviseSuggestion(component)).not.toBeNull();
        expect(elements.adviseSuggestion(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_SUGGESTION,
        );
      });
    });

    describe('When a "GraphQL-error" happens', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should should render correctly', async () => {
        const resolvers = mockTVShowDetails.makeQueryGraphQLErrorResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '1',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.loading(component)).toBeNull();
        expect(elements.backgroundImage(component)).toBeNull();
        expect(elements.contentWrapper(component)).toBeNull();
        expect(elements.headerInfo(component)).toBeNull();
        expect(elements.adviseWrapper(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "Advise" correctly', async () => {
        const resolvers = mockTVShowDetails.makeQueryGraphQLErrorResolver({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: ID,
        });
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '1',
          }),
        );
        await waitFor(() => {
          expect(elements.adviseWrapper(component)).not.toBeNull();
        });
        expect(elements.adviseTitle(component)).not.toBeNull();
        expect(elements.adviseTitle(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_TITLE,
        );
        expect(elements.adviseDescription(component)).not.toBeNull();
        expect(elements.adviseDescription(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_DESCRIPTION,
        );
        expect(elements.adviseSuggestion(component)).not.toBeNull();
        expect(elements.adviseSuggestion(component).children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_ERROR_SUGGESTION,
        );
      });
    });
  });

  describe('When the data is "loading"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', async () => {
      const resolvers = mockTVShowDetails.makeQuerySuccessResolver({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: ID,
      });
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: ID,
        }),
      );
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).toBeNull();
      expect(elements.contentWrapper(component)).toBeNull();
      expect(elements.headerInfo(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      await waitFor(() => {});
    });
  });
});
