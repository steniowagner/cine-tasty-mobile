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
import * as mockMovieDetails from '@mocks/fixtures/movie';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {randomPositiveNumber} from '@mocks/utils';
import {formatCurrency, formatDate} from '@utils';
import {AlertMessageProvider} from '@providers';
import {InMemoryCache} from '@apollo/client';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {MovieDetail} from './MovieDetails';

const POSTER_PATH = 'POSTER_PATH';
const TITLE = 'TITLE';

jest.spyOn(Alert, 'alert');

const renderMovieDetails = ({
  navigate = jest.fn(),
  push = jest.fn(),
  goBack = jest.fn(),
  mockResolvers,
  voteAverage,
  voteCount,
  genreIds,
  id,
}: any) => {
  const MovieDetailsScreen = ({navigation}) => (
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
          <MovieDetail
            navigation={{...navigation, navigate, goBack, push}}
            route={{
              name: Routes.Movie.DETAILS,
              key: `${Routes.Movie.DETAILS}-key`,
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
  return <MockedNavigation component={MovieDetailsScreen} />;
};

describe('<MovieDetails />', () => {
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
    crew: (api: RenderAPI) => api.queryByTestId('people-list-crew'),
    images: (api: RenderAPI) => api.queryByTestId('images-list'),
    videos: (api: RenderAPI) => api.queryByTestId('videos-list'),
    productionCompanies: (api: RenderAPI) =>
      api.queryByTestId('production-network-companies'),
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
    crewItems: (api: RenderAPI) => api.queryAllByTestId('button-wrapper-crew'),
    imagesItem: (api: RenderAPI) =>
      api.queryAllByTestId('image-list-item-button'),
    videosItem: (api: RenderAPI) => api.queryAllByTestId('video-button'),
    viewAllReviews: (api: RenderAPI) =>
      api.queryByTestId('view-all-button-reviews'),
  };

  describe('Renders correctly', () => {
    describe('Default flow', () => {
      const id = '1';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render correctly when it receive all the data', async () => {
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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
        expect(elements.sections(component).length).toEqual(8);
        expect(elements.tagsWrapper(component)).not.toBeNull();
        expect(elements.overviewWrapper(component)).not.toBeNull();
        expect(elements.generalInfo(component)).not.toBeNull();
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
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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
        expect(elements.sectionsTitle(component).length).toEqual(9);
        expect(elements.sectionsTitle(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_OVERVIEW,
        );
        expect(elements.sectionsTitle(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_DETAILS,
        );
        expect(elements.sectionsTitle(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST,
        );
        expect(elements.sectionsTitle(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW,
        );
        expect(elements.sectionsTitle(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES,
        );
        expect(elements.sectionsTitle(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
        );
        expect(elements.sectionsTitle(component)[6].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
        );
        expect(elements.sectionsTitle(component)[7].children[0]).toEqual(
          `${Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW} (${queryResult.result.result.data.movie.reviews.length})`,
        );
        expect(elements.sectionsTitle(component)[8].children[0]).toEqual(
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
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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

      it('should render the "votes-average" correctly when the "route.params.voteAverage" is not set and "movie.voteAvera" is set', async () => {
        const voteAverage = randomPositiveNumber(10, 1);
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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

      it('should render the "votes-count" correctly when the "route.params.voteCount" is not set and "movie.Count" is set', async () => {
        const voteCount = randomPositiveNumber(10, 1);
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
          const queryResult = mockMovieDetails.movieDetailsResolvers({
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
            renderMovieDetails({
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
            mockMovieDetails.releaseDate.split('-')[0],
          );
          expect(elements.tagsTexts(component)[1].children[0]).toEqual(
            Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE,
          );
          await waitFor(() => {});
        });

        it('should render correctly "tags" content correctly', async () => {
          const queryResult = mockMovieDetails.movieDetailsResolvers({
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
            mockMovieDetails.releaseDate.split('-')[0],
            Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE,
          ];
          const component = render(
            renderMovieDetails({
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

      describe('When the "extra-tags" comes from the "movies.genres"', () => {
        const id = '3';

        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(cleanup);

        it('should render the extra-tags correctly', async () => {
          const queryResult = mockMovieDetails.movieDetailsResolvers({
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
            renderMovieDetails({
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
            mockMovieDetails.releaseDate.split('-')[0],
          );
          expect(elements.tagsTexts(component)[1].children[0]).toEqual(
            Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE,
          );
        });

        it('should render correctly "tags" content correctly', async () => {
          const queryResult = mockMovieDetails.movieDetailsResolvers({
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
            mockMovieDetails.releaseDate.split('-')[0],
            Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE,
          ];
          const component = render(
            renderMovieDetails({
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
          const queryResult = mockMovieDetails.movieDetailsResolvers({
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
            renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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
        const movie = queryResult.result.result.data.movie;
        expect(elements.generalInfoItems(component).length).toEqual(6);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          movie.originalTitle,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          formatDate(movie.releaseDate),
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          formatCurrency(movie.budget),
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          formatCurrency(movie.revenue),
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          movie.productionCountries.join(', '),
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          movie.spokenLanguages.join(', '),
        );
      });

      it('should render the "info-items" correctly when it has all the data except for "original-title"', async () => {
        const queryResult = mockMovieDetails.movieDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeOriginalTitle: true,
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
          renderMovieDetails({
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
        const movie = queryResult.result.result.data.movie;
        expect(elements.generalInfoItems(component).length).toEqual(6);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          formatDate(movie.releaseDate),
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          formatCurrency(movie.budget),
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          formatCurrency(movie.revenue),
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          movie.productionCountries.join(', '),
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          movie.spokenLanguages.join(', '),
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "production-countries" is empty', async () => {
        const queryResult = mockMovieDetails.movieDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeProductionCountries: true,
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
          renderMovieDetails({
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
        const movie = queryResult.result.result.data.movie;
        expect(elements.generalInfoItems(component).length).toEqual(6);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          movie.originalTitle,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          formatDate(movie.releaseDate),
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          formatCurrency(movie.budget),
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          formatCurrency(movie.revenue),
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          '-',
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
          movie.spokenLanguages.join(', '),
        );
      });

      it('should render the "info-items" correctly when it has all the data and the "spoken-languages" is empty', async () => {
        const queryResult = mockMovieDetails.movieDetailsResolvers(
          {
            withVoteAverage: false,
            withGenresIds: true,
            withVoteCount: true,
            language: 'EN',
            id: '1',
          },
          {
            removeSpokenLanguages: true,
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
          renderMovieDetails({
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
        const movie = queryResult.result.result.data.movie;
        expect(elements.generalInfoItems(component).length).toEqual(6);
        expect(elements.generalInfoTitles(component)[0].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        );
        expect(elements.generalInfoValues(component)[0].children[0]).toEqual(
          movie.originalTitle,
        );
        expect(elements.generalInfoTitles(component)[1].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
        );
        expect(elements.generalInfoValues(component)[1].children[0]).toEqual(
          formatDate(movie.releaseDate),
        );
        expect(elements.generalInfoTitles(component)[2].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET,
        );
        expect(elements.generalInfoValues(component)[2].children[0]).toEqual(
          formatCurrency(movie.budget),
        );
        expect(elements.generalInfoTitles(component)[3].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE,
        );
        expect(elements.generalInfoValues(component)[3].children[0]).toEqual(
          formatCurrency(movie.revenue),
        );
        expect(elements.generalInfoTitles(component)[4].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
        );
        expect(elements.generalInfoValues(component)[4].children[0]).toEqual(
          movie.productionCountries.join(', '),
        );
        expect(elements.generalInfoTitles(component)[5].children[0]).toEqual(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
        );
        expect(elements.generalInfoValues(component)[5].children[0]).toEqual(
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
        const queryResult = mockMovieDetails.movieDetailsResolvers({
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
        const queryResult = mockMovieDetails.movieDetailsResolvers(
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
          renderMovieDetails({
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
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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

  describe('Showing the "language-alert-message"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
    });

    afterEach(cleanup);

    it('should call the "Alert.alert" with the correct params when the "overview" is an empty string', async () => {
      const queryResult = mockMovieDetails.movieDetailsResolvers(
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
        renderMovieDetails({
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

    it('should call "navigation.push" correctly when the user press some item from the "cast-list"', async () => {
      const push = jest.fn();
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      const {movie} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(movie.cast.length - 1, 0);
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.castItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: movie.cast[indexItemSelected].profilePath,
        name: movie.cast[indexItemSelected].name,
        id: Number(movie.cast[indexItemSelected].id),
      });
    });

    it('should call "navigation.push" correctly when the user press some item from the "crew-list"', async () => {
      const push = jest.fn();
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      const {movie} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(movie.crew.length - 1, 0);
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.crewItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Famous.DETAILS, {
        profileImage: movie.crew[indexItemSelected].profilePath,
        name: movie.crew[indexItemSelected].name,
        id: Number(movie.crew[indexItemSelected].id),
      });
    });

    it('should call "navigation.navigate" correctly when the user press some item from the "reviews-list"', async () => {
      const navigate = jest.fn();
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      const {movie} = queryResult.result.result.data;
      expect(navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.viewAllReviews(component));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(Routes.MediaDetail.REVIEWS, {
        mediaTitle: movie.title,
        reviews: movie.reviews,
      });
    });

    it('should call "navigation.push" correctly when the user press some item from the "simila-list"', async () => {
      const push = jest.fn();
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      const {movie} = queryResult.result.result.data;
      const indexItemSelected = randomPositiveNumber(
        movie.similar.length - 1,
        0,
      );
      expect(push).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.similarItems(component)[indexItemSelected]);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
        voteAverage: movie.similar[indexItemSelected].voteAverage,
        posterPath: movie.similar[indexItemSelected].posterPath,
        voteCount: movie.similar[indexItemSelected].voteCount,
        title: movie.similar[indexItemSelected].title,
        id: movie.similar[indexItemSelected].id,
      });
    });
  });

  describe('Error-state', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should show the "Error-state" when some Network-error happens', async () => {
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      expect(elements.productionCompanies(component)).toBeNull();
      expect(elements.reviews(component)).toBeNull();
      expect(elements.similar(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should show the "Error-state" when some GraphQL-error happens', async () => {
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      expect(elements.productionCompanies(component)).toBeNull();
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
      const queryResult = mockMovieDetails.movieDetailsResolvers({
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
        renderMovieDetails({
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
      expect(elements.productionCompanies(component)).toBeNull();
      expect(elements.reviews(component)).toBeNull();
      expect(elements.similar(component)).toBeNull();
      await waitFor(() => {});
    });
  });
});
