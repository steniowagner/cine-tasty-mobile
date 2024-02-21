import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { RenderAPI, render, waitFor } from '@testing-library/react-native';

import { Routes } from '@/navigation';
import { Translations } from '@/i18n/tags';

import { ParticipantListItem } from '../../common/participants-list/participants-list-item/ParticipantsListItem';
import { MockedNavigator } from '../../../../../../../__mocks__/MockedNavigator';
import { MovieDetailsProps } from '../routes/route-params-types';
import { MovieDetails } from './MovieDetails';
import {
  mockQueryMovieDetailsSuccess,
  mockQueryMovieDetailsError,
  randomPositiveNumber,
  movie,
} from '../../../../../../../__mocks__';
import { formatCurrency } from '@/utils';

const DEFAULT_ROUTE_PARAMS = {
  title: 'DEFAULT_ROUTE_PARAMS_TITLE',
  id: 1,
};

type RenderMovieDetailsProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
  genres?: string[];
  voteAverage?: number;
  voteCount?: number;
  push?: jest.Mock;
};

const renderMovieDetails = (
  renderMovieDetailsProps: RenderMovieDetailsProps,
) => {
  const MovieDetailsComponent = (
    movieDetailsComponentProps: MovieDetailsProps,
  ) => (
    <MockedProvider
      mocks={renderMovieDetailsProps.mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <MovieDetails
        navigation={{
          ...movieDetailsComponentProps.navigation,
          push: renderMovieDetailsProps.push || jest.fn(),
        }}
        route={{
          name: Routes.Famous.MOVIE_DETAILS,
          key: `${Routes.Famous.MOVIE_DETAILS}-key`,
          params: {
            ...DEFAULT_ROUTE_PARAMS,
            genres: renderMovieDetailsProps.genres,
            voteAverage: renderMovieDetailsProps.voteAverage,
            voteCount: renderMovieDetailsProps.voteCount,
            image: 'SOME_IMAGE',
          },
        }}
      />
    </MockedProvider>
  );
  return <MockedNavigator component={MovieDetailsComponent} />;
};

describe('Common-screens/MovieDetails', () => {
  const elements = {
    backgroundImage: (component: RenderAPI) =>
      component.queryByTestId('background-animated-view'),
    advice: (component: RenderAPI) => component.queryByTestId('advice-wrapper'),
    adviceIcon: (component: RenderAPI) =>
      component.queryByTestId('icon-alert-box'),
    adviceTitle: (component: RenderAPI) =>
      component.queryByTestId('advice-title'),
    adviceDescription: (component: RenderAPI) =>
      component.queryByTestId('advice-description'),
    adviceSuggestion: (component: RenderAPI) =>
      component.queryByTestId('advice-suggestion'),
    loading: (component: RenderAPI) =>
      component.queryByTestId('media-details-loading'),
    header: (component: RenderAPI) =>
      component.queryByTestId('header-info-wrapper'),
    details: (component: RenderAPI) => component.queryByTestId('movie-details'),
    voteCount: (component: RenderAPI) => component.queryByTestId('vote-count'),
    votes: (component: RenderAPI) => component.queryByTestId('votes-text'),
    genres: (component: RenderAPI) => component.queryByTestId('genres'),
    overview: (component: RenderAPI) =>
      component.queryByTestId('description-text'),
    mediaInfoTitles: (component: RenderAPI) =>
      component.queryAllByTestId(/media-info-title-/),
    mediaInfoValues: (component: RenderAPI) =>
      component.queryAllByTestId(/media-info-value-/),
    images: (component: RenderAPI) =>
      component.queryAllByTestId('image-list-item-button'),
    imagesList: (component: RenderAPI) =>
      component.queryByTestId('images-list'),
    sectionWrappers: (component: RenderAPI) =>
      component.queryAllByTestId('section-wrapper'),
    sectionTitles: (component: RenderAPI) =>
      component.queryAllByTestId('section-title'),
    participantName: (component: RenderAPI) =>
      component.queryAllByTestId('participant-name'),
    participantSubtext: (component: RenderAPI) =>
      component.queryAllByTestId('participant-subtext'),
    seasonTitles: (component: RenderAPI) =>
      component.queryAllByTestId('season-title'),
    videos: (component: RenderAPI) =>
      component.queryAllByTestId('video-button'),
    similarItems: (component: RenderAPI) =>
      component.queryAllByTestId('media-list-item'),
  };

  describe('Rendering', () => {
    it('should show the "loading-state" by default', async () => {
      const mocks = mockQueryMovieDetailsSuccess({
        includeVoteAverage: true,
        includeGenres: true,
        includeVoteCount: true,
        id: DEFAULT_ROUTE_PARAMS.id,
      });
      const component = render(
        renderMovieDetails({
          mocks,
        }),
      );
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).toBeNull();
      expect(elements.advice(component)).toBeNull();
      expect(elements.header(component)).toBeNull();
      expect(elements.details(component)).toBeNull();
    });

    describe('Header', () => {
      describe('Vote-count', () => {
        it('should render correctly when "vote-count" is provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: false,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const voteCount = randomPositiveNumber(10, 1);
          const component = render(
            renderMovieDetails({
              voteCount,
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.voteCount(component)!.children[0]).toEqual(
            `(${voteCount})`,
          );
        });

        it('should render correctly when "vote-count" is not provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderMovieDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.voteCount(component)!.children[0]).toEqual(
            `(${movie.voteCount})`,
          );
        });
      });

      describe('Vote-average', () => {
        it('should render correctly when "votes" is provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: false,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const voteAverage = randomPositiveNumber(10, 1);
          const component = render(
            renderMovieDetails({
              voteAverage,
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.votes(component)!.children[0]).toEqual(
            `${voteAverage.toFixed(1)}`,
          );
        });

        it('should render correctly when "vote-count" is not provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderMovieDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.votes(component)!.children[0]).toEqual(
            `${movie.voteAverage.toFixed(1)}`,
          );
        });
      });

      describe('Genres', () => {
        it('should render correctly when "genres" is provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: false,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const genres = Array(randomPositiveNumber(10, 1))
            .fill('')
            .map((_, index) => `GENRE_${index + 1}`);
          const component = render(
            renderMovieDetails({
              genres,
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.genres(component)!.children[0]).toEqual(
            [Translations.MovieDetails.MOVIE, ...genres].join(' \u2022 '),
          );
        });

        it('should render correctly when "genres" is not provided', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderMovieDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.genres(component)!.children[0]).toEqual(
            `${[Translations.MovieDetails.MOVIE, ...movie.genres].join(
              ' \u2022 ',
            )}`,
          );
        });
      });
    });

    describe('Sections', () => {
      it('should render the "overview-section" correctly', async () => {
        const mocks = mockQueryMovieDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderMovieDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.overview(component)?.children[0]).toEqual(
          movie.overview,
        );
      });

      it('should render the "media-info-section" correctly', async () => {
        const mocks = mockQueryMovieDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderMovieDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        // original-title
        expect(elements.mediaInfoTitles(component)[0].children[0]).toEqual(
          Translations.MovieDetails.ORIGINAL_TITLE,
        );
        expect(elements.mediaInfoValues(component)[0].children[0]).toEqual(
          movie.originalTitle,
        );
        // release-date
        expect(elements.mediaInfoTitles(component)[1].children[0]).toEqual(
          Translations.MovieDetails.RELEASE_DATE,
        );
        expect(elements.mediaInfoValues(component)[1].children[0]).toEqual(
          movie.releaseDate,
        );
        // budget
        expect(elements.mediaInfoTitles(component)[2].children[0]).toEqual(
          Translations.MovieDetails.BUDGET,
        );
        expect(elements.mediaInfoValues(component)[2].children[0]).toEqual(
          formatCurrency(movie.budget),
        );
        // revenue
        expect(elements.mediaInfoTitles(component)[3].children[0]).toEqual(
          Translations.MovieDetails.REVENUE,
        );
        expect(elements.mediaInfoValues(component)[3].children[0]).toEqual(
          formatCurrency(movie.revenue),
        );
        // production-countries
        expect(elements.mediaInfoTitles(component)[4].children[0]).toEqual(
          Translations.MovieDetails.PRODUCTION_COUNTRIES,
        );
        expect(elements.mediaInfoValues(component)[4].children[0]).toEqual(
          movie.productionCountries.join(', '),
        );
        // spoken-languages
        expect(elements.mediaInfoTitles(component)[5].children[0]).toEqual(
          Translations.MovieDetails.SPOKEN_LANGUAGES,
        );
        expect(elements.mediaInfoValues(component)[5].children[0]).toEqual(
          movie.spokenLanguages.join(', '),
        );
      });

      describe('Cast-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[0].children[0]).toEqual(
            Translations.MovieDetails.CAST,
          );
        });

        it('should render the "crew-list" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const castList = elements
            .sectionWrappers(component)[0]
            .findAllByType(ParticipantListItem);
          expect(castList.length).toEqual(movie.cast.length);
        });

        it('should render the "cast-list-items" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          for (let i = 0; i < movie.cast.length; i++) {
            expect(elements.participantName(component)[i]!.children[0]).toEqual(
              movie.cast[i].name,
            );
            expect(
              elements.participantSubtext(component)[i]!.children[0],
            ).toEqual(movie.cast[i].subText);
          }
        });
      });

      describe('Crew-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[1].children[0]).toEqual(
            Translations.MovieDetails.CREW,
          );
        });

        it('should render the "crew-list" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const crewList = elements
            .sectionWrappers(component)[1]
            .findAllByType(ParticipantListItem);
          expect(crewList.length).toEqual(movie.crew.length);
        });

        it('should render the "crew-list-items" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          for (let i = 0; i < movie.crew.length; i++) {
            expect(
              elements.participantName(component)[i + movie.cast.length]
                .children[0],
            ).toEqual(movie.crew[i].name);
            expect(
              elements.participantSubtext(component)[i].children[0],
            ).toEqual(movie.cast[i].subText);
          }
        });
      });

      it('should render the "images-list-section" correctly', async () => {
        const mocks = mockQueryMovieDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderMovieDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.imagesList(component)).not.toBeNull();
        expect(elements.images(component).length).toEqual(movie.images.length);
      });

      describe('Videos-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[2].children[0]).toEqual(
            Translations.Miscellaneous.VIDEOS,
          );
        });

        it('should render the correct "number-of-videos"', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.videos(component).length).toEqual(
            movie.videos.length,
          );
        });
      });

      describe('Similar-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[3].children[0]).toEqual(
            Translations.Miscellaneous.SIMILAR,
          );
        });

        it('should render the correct "number-of-similar"', async () => {
          const mocks = mockQueryMovieDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderMovieDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.similarItems(component).length).toEqual(
            movie.similar.length,
          );
        });
      });
    });

    describe('When querying with "error"', () => {
      it('should show the "error-state" correctly', async () => {
        const mocks = mockQueryMovieDetailsError(DEFAULT_ROUTE_PARAMS.id);
        const component = render(
          renderMovieDetails({
            mocks,
          }),
        );
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.backgroundImage(component)).toBeNull();
        expect(elements.header(component)).toBeNull();
        expect(elements.details(component)).toBeNull();
        expect(elements.advice(component)).not.toBeNull();
        expect(elements.adviceIcon(component)).not.toBeNull();
        expect(elements.adviceTitle(component)!.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_TITLE,
        );
        expect(elements.adviceDescription(component)!.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_DESCRIPTION,
        );
        expect(elements.adviceSuggestion(component)!.children[0]).toEqual(
          Translations.Error.ERROR_ADVICE_SUGGESTION,
        );
      });
    });
  });
});
