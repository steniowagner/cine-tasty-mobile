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

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
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

jest.spyOn(Alert, 'alert');

const renderTVShowDetails = ({
  navigate = jest.fn(),
  push = jest.fn(),
  goBack = jest.fn(),
  mockResolvers,
  voteAverage,
  voteCount,
  genreIds,
  id,
}: any) => {
  const tvShowDetailsScreen = ({navigation}) => (
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
      <TMDBImageQualityProvider>
        <AlertMessageProvider>
          <TVShowDetail
            navigation={{...navigation, navigate, goBack, push}}
            route={{
              name: Routes.TVShow.DETAILS,
              key: `${Routes.TVShow.DETAILS}-key`,
              params: {
                posterPath: POSTER_PATH,
                title: TITLE,
                voteAverage,
                voteCount,
                genreIds,
                id: Number(id),
              },
            }}
          />
        </AlertMessageProvider>
      </TMDBImageQualityProvider>
    </MockedProvider>
  );
  return <MockedNavigation component={tvShowDetailsScreen} />;
};

describe('<TVShowDetails />', () => {
  const elements = {
    backButton: (api: RenderAPI) => api.queryByTestId('header-back-button'),
    advise: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
    headerInfo: (api: RenderAPI) => api.queryByTestId('header-info-wrapper'),
    tagsWrapper: (api: RenderAPI) => api.queryAllByTestId('tags'),
    tagsTexts: (api: RenderAPI) => api.queryAllByTestId('tag-text'),
    tagsLoading: (api: RenderAPI) => api.queryByTestId('tags-loading'),
    sectionsTitle: (api: RenderAPI) => api.queryAllByTestId('section-title'),
    loadingOverview: (api: RenderAPI) =>
      api.queryAllByTestId('loading-overview'),
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
    voteAverage: (api: RenderAPI) => api.queryByTestId('media-votes-average'),
    voteCount: (api: RenderAPI) => api.queryByTestId('media-votes-count'),
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
  };

  describe('Renders correctly', () => {
    describe('Default flow', () => {
      const id = '1';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render correctly when it receive all the data', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id,
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
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
        expect(elements.advise(component)).toBeNull();
      });

      it('should render the sections titles correctly', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id,
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
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
          `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (${queryResult.result.result.data.tvShow.reviews.length})`,
        );
        expect(elements.sectionsTitle(component)[10].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
        );
      });
    });

    describe('Rendering the Header-info/votes-average', () => {
      const id = '4';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "votes-average" correctly when the "route.params.voteAverage" is set', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: false,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id,
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const voteAverage = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteAverage,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.voteAverage(component).children[0]).toEqual(
          `${voteAverage.toFixed(1)}`,
        );
        await waitFor(() => {});
      });

      it('should render the "votes-average" correctly when the "route.params.voteAverage" is not set and "tvShow.voteAvera" is set', async () => {
        const voteAverage = randomPositiveNumber(10, 1);
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id,
          },
          {
            voteAverage,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.voteAverage(component).children[0]).toEqual(
          `${voteAverage.toFixed(1)}`,
        );
        await waitFor(() => {});
      });
    });

    describe('Rendering the Header-info/votes-count', () => {
      const id = '5';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "votes-count" correctly when the "route.params.voteCount" is set', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: false,
          language: 'EN',
          id,
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const voteCount = randomPositiveNumber(10, 1);
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            voteCount,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.voteCount(component).children[0]).toEqual(
          `${voteCount}`,
        );
        await waitFor(() => {});
      });

      it('should render the "votes-count" correctly when the "route.params.voteCount" is not set and "tvShow.Count" is set', async () => {
        const voteCount = randomPositiveNumber(10, 1);
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id,
          },
          {
            voteCount,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.voteCount(component).children[0]).toEqual(
          `${voteCount}`,
        );
        await waitFor(() => {});
      });
    });

    describe('Rendering the Extra-tags', () => {
      describe('When the "extra-tags" comes from the "route.params"', () => {
        const id = '2';

        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the extra-tags correctly', async () => {
          const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
            withVoteAverage: true,
            withGenresIds: false,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const resolvers = [
            {
              ...queryResult.request,
              ...queryResult.result,
            },
          ];
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
          const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
            withVoteAverage: true,
            withGenresIds: false,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const resolvers = [
            {
              ...queryResult.request,
              ...queryResult.result,
            },
          ];
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
        const id = '3';

        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the extra-tags correctly', async () => {
          const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const resolvers = [
            {
              ...queryResult.request,
              ...queryResult.result,
            },
          ];
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
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
        });

        it('should render correctly "tags" content correctly', async () => {
          const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const resolvers = [
            {
              ...queryResult.request,
              ...queryResult.result,
            },
          ];
          const extraTags = [
            mockTVShowDetails.firstAirDate.split('-')[0],
            Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
          ];
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              id,
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

      describe('Loading state', () => {
        const id = '4';

        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the "loading-tags" correctly when the "genre-ids" is undefined and "isLoading" is "true"', async () => {
          const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id,
          });
          const resolvers = [
            {
              ...queryResult.request,
              ...queryResult.result,
            },
          ];
          const component = render(
            renderTVShowDetails({
              mockResolvers: resolvers,
              id,
            }),
          );
          expect(elements.tagsLoading(component)).not.toBeNull();
          await waitFor(() => {});
        });
      });
    });

    describe('Rendering the General-info', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render the "info-items" correctly when it has all the data', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: false,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: '1',
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
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
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeOriginalLanguage: true,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeNumberOfEpisodes: true,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeNumberOfSeasons: true,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
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
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeOriginalCountry: true,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
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
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeLastAirDate: true,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        const tvShow = queryResult.result.result.data.tvShow;
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
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: '1',
        });
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
        expect(elements.similar(component)).not.toBeNull();
      });

      it('should render the sections correctly when "cast" is empty', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '2',
          },
          {
            castLength: 0,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '2',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.cast(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the "similar-section" correctly when it has some data to show', async () => {
        const similarLength = randomPositiveNumber(10, 1);
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '2',
          },
          {
            similarLength,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '2',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.similarItems(component).length).toEqual(similarLength);
      });

      it('should render the "similar-section" correctly when it is empty', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '2',
          },
          {
            similarLength: 0,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderTVShowDetails({
            mockResolvers: resolvers,
            id: '2',
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.similarItems(component).length).toEqual(0);
      });

      it('should render the sections correctly when "crew" is empty', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            crewLenth: 0,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.crew(component)).toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the sections correctly when "images" is empty', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            imagesLength: 0,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.images(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.videos(component)).not.toBeNull();
      });

      it('should render the sections correctly when "videos" is empty', async () => {
        const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
          {
            withVoteAverage: true,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            videosLength: 0,
          },
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
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
          expect(elements.loadingOverview(component)).toEqual([]);
        });
        expect(elements.videos(component)).toBeNull();
        expect(elements.crew(component)).not.toBeNull();
        expect(elements.cast(component)).not.toBeNull();
        expect(elements.images(component)).not.toBeNull();
      });
    });
  });

  describe('Pressing the "back-button"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should call the "navigation.goBack" when the user press the "back-button"', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const goBack = jest.fn();
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          goBack,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      expect(goBack).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.backButton(component));
      expect(goBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Pressing the "seasons-button"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should call the "navigation.navigate" when the user press the "sesons-button"', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const navigate = jest.fn();
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          navigate,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.seasons(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.TVShow.SEASONS, {
        numberOfSeasons: tvShow.numberOfSeasons,
        title: tvShow.name,
        id: tvShow.id,
      });
    });
  });

  describe('Showing the "language-alert-message"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
    });

    afterEach(cleanup);

    it('should call the "Alert.alert" with the correct params when the "overview" is an empty string', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers(
        {
          withVoteAverage: true,
          withGenresIds: true,
          withVoteCount: true,
          language: 'EN',
          id: '1',
        },
        {
          removeOverview: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: '1',
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

  describe('Pressing the lists-items', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
    });

    afterEach(cleanup);

    it('should call "navigation.push" correctly when the user press some item from the "creators-list"', async () => {
      const push = jest.fn();
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          push,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(
        tvShow.createdBy.length - 1,
        0,
      );
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.creatorsItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: tvShow.createdBy[indexItemSelected].profilePath,
        name: tvShow.createdBy[indexItemSelected].name,
        id: Number(tvShow.createdBy[indexItemSelected].id),
      });
    });

    it('should call "navigation.push" correctly when the user press some item from the "cast-list"', async () => {
      const push = jest.fn();
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          push,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(tvShow.cast.length - 1, 0);
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.castItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: tvShow.cast[indexItemSelected].profilePath,
        name: tvShow.cast[indexItemSelected].name,
        id: Number(tvShow.cast[indexItemSelected].id),
      });
    });

    it('should call "navigation.push" correctly when the user press some item from the "crew-list"', async () => {
      const push = jest.fn();
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          push,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(tvShow.crew.length - 1, 0);
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.crewItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: tvShow.crew[indexItemSelected].profilePath,
        name: tvShow.crew[indexItemSelected].name,
        id: Number(tvShow.crew[indexItemSelected].id),
      });
    });

    it('should call "navigation.navigate" correctly when the user press some item from the "reviews-list"', async () => {
      const navigate = jest.fn();
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          navigate,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.viewAllReviews(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.MediaDetail.REVIEWS, {
        mediaTitle: tvShow.name,
        reviews: tvShow.reviews,
      });
    });

    it('should call "navigation.push" correctly when the user press some item from the "simila-list"', async () => {
      const push = jest.fn();
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          push,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.loadingOverview(component)).toEqual([]);
      });
      const {tvShow} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(
        tvShow.similar.length - 1,
        0,
      );
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.similarItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
        voteAverage: tvShow.similar[indexItemSelected].voteAverage,
        posterPath: tvShow.similar[indexItemSelected].posterPath,
        voteCount: tvShow.similar[indexItemSelected].voteCount,
        title: tvShow.similar[indexItemSelected].name,
        id: tvShow.similar[indexItemSelected].id,
      });
    });
  });

  describe('Error-state', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "Error-state" when some Network-error happens', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithNetworkError,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.advise(component)).not.toBeNull();
      expect(elements.backButton(component)).not.toBeNull();
      expect(elements.headerInfo(component)).toBeNull();
      expect(elements.sections(component).length).toEqual(0);
      expect(elements.tagsWrapper(component)).toEqual([]);
      expect(elements.overviewWrapper(component)).toBeNull();
      expect(elements.generalInfo(component)).toBeNull();
      expect(elements.cast(component)).toBeNull();
      expect(elements.crew(component)).toBeNull();
      expect(elements.images(component)).toBeNull();
      expect(elements.videos(component)).toBeNull();
      expect(elements.productionCompanies(component)).toEqual([]);
      expect(elements.reviews(component)).toBeNull();
      expect(elements.similar(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should show the "Error-state" when some GraphQL-error happens', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithGraphQLError,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: '1',
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.advise(component)).not.toBeNull();
      expect(elements.backButton(component)).not.toBeNull();
      expect(elements.headerInfo(component)).toBeNull();
      expect(elements.sections(component).length).toEqual(0);
      expect(elements.tagsWrapper(component)).toEqual([]);
      expect(elements.overviewWrapper(component)).toBeNull();
      expect(elements.generalInfo(component)).toBeNull();
      expect(elements.cast(component)).toBeNull();
      expect(elements.crew(component)).toBeNull();
      expect(elements.images(component)).toBeNull();
      expect(elements.videos(component)).toBeNull();
      expect(elements.productionCompanies(component)).toEqual([]);
      expect(elements.reviews(component)).toBeNull();
      expect(elements.similar(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Loading-state', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render the "loading-state" correctly when the "isLoading" is true', async () => {
      const queryResult = mockTVShowDetails.tvShowsDetailsResolvers({
        withVoteAverage: true,
        withGenresIds: true,
        withVoteCount: true,
        language: 'EN',
        id: '1',
      });
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithNetworkError,
        },
      ];
      const component = render(
        renderTVShowDetails({
          mockResolvers: resolvers,
          id: '1',
        }),
      );
      expect(elements.advise(component)).toBeNull();
      expect(elements.backButton(component)).not.toBeNull();
      expect(elements.loadingOverview(component)).not.toBeNull();
      expect(elements.tagsLoading(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.sections(component).length).toEqual(1);
      expect(elements.tagsWrapper(component)).toEqual([]);
      expect(elements.overviewWrapper(component)).toBeNull();
      expect(elements.generalInfo(component)).toBeNull();
      expect(elements.cast(component)).toBeNull();
      expect(elements.crew(component)).toBeNull();
      expect(elements.images(component)).toBeNull();
      expect(elements.videos(component)).toBeNull();
      expect(elements.productionCompanies(component)).toEqual([]);
      expect(elements.reviews(component)).toBeNull();
      expect(elements.similar(component)).toBeNull();
      expect(elements.creator(component)).toBeNull();
      await waitFor(() => {});
    });
  });
});
