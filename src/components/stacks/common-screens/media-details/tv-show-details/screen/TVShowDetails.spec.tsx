import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import { RenderAPI, render, waitFor } from '@testing-library/react-native';

import { AlertMessageProvider } from '@/providers';
import { Translations } from '@/i18n/tags';
import { Routes } from '@/navigation';

import {
  MockedNavigator,
  randomPositiveNumber,
  mockQueryTVShowDetailsSuccess,
  mockQueryTVShowDetailsError,
  tvShow,
} from '../../../../../../../__mocks__';
import { TVShowDetailsProps } from '../routes/route-params-types';
import { TVShowDetails } from './TVShowDetails';
import { Section, Typography } from '@/components/common';
import { ParticipantListItem } from '../../common/participants-list/participants-list-item/ParticipantsListItem';

const DEFAULT_ROUTE_PARAMS = {
  title: 'DEFAULT_ROUTE_PARAMS_TITLE',
  id: 1,
};

type RenderTVShowDetailsProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
  genres?: string[];
  voteAverage?: number;
  voteCount?: number;
  push?: jest.Mock;
};

const renderTVShowDetails = (
  renderTVShowDetailsProps: RenderTVShowDetailsProps,
) => {
  const TVShowDetailsComponent = (
    tvShowDetailsComponentProps: TVShowDetailsProps,
  ) => (
    <MockedProvider
      mocks={renderTVShowDetailsProps.mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <AlertMessageProvider>
        <TVShowDetails
          navigation={{
            ...tvShowDetailsComponentProps.navigation,
            push: renderTVShowDetailsProps.push || jest.fn(),
          }}
          route={{
            name: Routes.Famous.TV_SHOW_DETAILS,
            key: `${Routes.Famous.TV_SHOW_DETAILS}-key`,
            params: {
              ...DEFAULT_ROUTE_PARAMS,
              genres: renderTVShowDetailsProps.genres,
              voteAverage: renderTVShowDetailsProps.voteAverage,
              voteCount: renderTVShowDetailsProps.voteCount,
              image: 'SOME_IMAGE',
            },
          }}
        />
      </AlertMessageProvider>
    </MockedProvider>
  );
  return <MockedNavigator component={TVShowDetailsComponent} />;
};

describe('Common-screens/FamousDetails', () => {
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
    details: (component: RenderAPI) =>
      component.queryByTestId('tvshow-details'),
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
      const mocks = mockQueryTVShowDetailsSuccess({
        includeVoteAverage: true,
        includeGenres: true,
        includeVoteCount: true,
        id: DEFAULT_ROUTE_PARAMS.id,
      });
      const component = render(
        renderTVShowDetails({
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
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: false,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const voteCount = randomPositiveNumber(10, 1);
          const component = render(
            renderTVShowDetails({
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
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderTVShowDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.voteCount(component)!.children[0]).toEqual(
            `(${tvShow.voteCount})`,
          );
        });
      });

      describe('Vote-average', () => {
        it('should render correctly when "votes" is provided', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: false,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const voteAverage = randomPositiveNumber(10, 1);
          const component = render(
            renderTVShowDetails({
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
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderTVShowDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.votes(component)!.children[0]).toEqual(
            `${tvShow.voteAverage.toFixed(1)}`,
          );
        });
      });

      describe('Genres', () => {
        it('should render correctly when "genres" is provided', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: false,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const genres = Array(randomPositiveNumber(10, 1))
            .fill('')
            .map((_, index) => `GENRE_${index + 1}`);
          const component = render(
            renderTVShowDetails({
              genres,
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.genres(component)!.children[0]).toEqual(
            [Translations.TVShowDetails.TV_SHOW, ...genres].join(' \u2022 '),
          );
        });

        it('should render correctly when "genres" is not provided', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(
            renderTVShowDetails({
              mocks,
            }),
          );
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.genres(component)!.children[0]).toEqual(
            `${[Translations.TVShowDetails.TV_SHOW, ...tvShow.genres].join(
              ' \u2022 ',
            )}`,
          );
        });
      });
    });

    describe('Sections', () => {
      it('should render the "overview-section" correctly', async () => {
        const mocks = mockQueryTVShowDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderTVShowDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.overview(component)?.children[0]).toEqual(
          tvShow.overview,
        );
      });

      it('should render the "media-info-section" correctly', async () => {
        const mocks = mockQueryTVShowDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderTVShowDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        // original-title
        expect(elements.mediaInfoTitles(component)[0].children[0]).toEqual(
          Translations.TVShowDetails.ORIGINAL_TITLE,
        );
        expect(elements.mediaInfoValues(component)[0].children[0]).toEqual(
          tvShow.originalName,
        );
        // original-language
        expect(elements.mediaInfoTitles(component)[1].children[0]).toEqual(
          Translations.TVShowDetails.ORIGINAL_LANGUAGE,
        );
        expect(elements.mediaInfoValues(component)[1].children[0]).toEqual(
          tvShow.originalLanguage,
        );
        // number-of-episodes
        expect(elements.mediaInfoTitles(component)[2].children[0]).toEqual(
          Translations.TVShowDetails.NUMBER_OF_EPISODES,
        );
        expect(elements.mediaInfoValues(component)[2].children[0]).toEqual(
          `${tvShow.numberOfEpisodes}`,
        );
        // seasons
        expect(elements.mediaInfoTitles(component)[3].children[0]).toEqual(
          Translations.TVShowDetails.NUMBER_OF_SEASONS,
        );
        expect(elements.mediaInfoValues(component)[3].children[0]).toEqual(
          String(tvShow.numberOfSeasons),
        );
        // episode-length
        expect(elements.mediaInfoTitles(component)[4].children[0]).toEqual(
          Translations.TVShowDetails.EPISODE_RUNTIME,
        );
        expect(elements.mediaInfoValues(component)[4].children[0]).toEqual(
          tvShow.episodeRunTime.join(', ').concat('min'),
        );
        // original-country
        expect(elements.mediaInfoTitles(component)[5].children[0]).toEqual(
          Translations.TVShowDetails.ORIGINAL_COUNTRY,
        );
        expect(elements.mediaInfoValues(component)[5].children[0]).toEqual(
          tvShow.originCountry.join(', '),
        );
        // first-air
        expect(elements.mediaInfoTitles(component)[6].children[0]).toEqual(
          Translations.TVShowDetails.FIRST_AIR_DATE,
        );
        expect(elements.mediaInfoValues(component)[6].children[0]).toEqual(
          tvShow.firstAirDate,
        );
        // last-air
        expect(elements.mediaInfoTitles(component)[7].children[0]).toEqual(
          Translations.TVShowDetails.LAST_AIR_DATE,
        );
        expect(elements.mediaInfoValues(component)[7].children[0]).toEqual(
          tvShow.lastAirDate,
        );
      });

      describe('Cast-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[0].children[0]).toEqual(
            Translations.TVShowDetails.CAST,
          );
        });

        it('should render the "crew-list" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const castList = elements
            .sectionWrappers(component)[0]
            .findAllByType(ParticipantListItem);
          expect(castList.length).toEqual(tvShow.cast.length);
        });

        it('should render the "cast-list-items" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          for (let i = 0; i < tvShow.cast.length; i++) {
            expect(elements.participantName(component)[i]!.children[0]).toEqual(
              tvShow.cast[i].name,
            );
            expect(
              elements.participantSubtext(component)[i]!.children[0],
            ).toEqual(tvShow.cast[i].subText);
          }
        });
      });

      describe('Crew-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[1].children[0]).toEqual(
            Translations.TVShowDetails.CREW,
          );
        });

        it('should render the "crew-list" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const crewList = elements
            .sectionWrappers(component)[1]
            .findAllByType(ParticipantListItem);
          expect(crewList.length).toEqual(
            tvShow.crew.length + tvShow.createdBy.length,
          );
        });

        it('should render the "crew-list-items" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          const crew = [...tvShow.createdBy, ...tvShow.crew];
          for (let i = 0; i < crew.length; i++) {
            expect(
              elements.participantName(component)[i + tvShow.cast.length]!
                .children[0],
            ).toEqual(crew[i].name);
            const subtext =
              i < tvShow.createdBy.length
                ? Translations.TVShowDetails.CREATOR
                : tvShow.crew[i - tvShow.createdBy.length].subText;
            expect(
              elements.participantSubtext(component)[i + tvShow.cast.length]!
                .children[0],
            ).toEqual(subtext);
          }
        });
      });

      it('should render the "images-list-section" correctly', async () => {
        const mocks = mockQueryTVShowDetailsSuccess({
          includeVoteAverage: true,
          includeGenres: true,
          includeVoteCount: true,
          id: DEFAULT_ROUTE_PARAMS.id,
        });
        const component = render(renderTVShowDetails({ mocks }));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.imagesList(component)).not.toBeNull();
        expect(elements.images(component).length).toEqual(tvShow.images.length);
      });

      describe('Seasons-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[2].children[0]).toEqual(
            Translations.TVShowDetails.SEASONS,
          );
        });

        it('should render the correct "number-of-sections"', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.seasonTitles(component).length).toEqual(
            tvShow.numberOfSeasons,
          );
        });
      });

      describe('Videos-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[3].children[0]).toEqual(
            Translations.Miscellaneous.VIDEOS,
          );
        });

        it('should render the correct "number-of-videos"', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.videos(component).length).toEqual(
            tvShow.videos.length,
          );
        });
      });

      describe('Similar-section', () => {
        it('should render the "section-title" correclty', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.sectionTitles(component)[4].children[0]).toEqual(
            Translations.Miscellaneous.SIMILAR,
          );
        });

        it('should render the correct "number-of-similar"', async () => {
          const mocks = mockQueryTVShowDetailsSuccess({
            includeVoteAverage: true,
            includeGenres: true,
            includeVoteCount: true,
            id: DEFAULT_ROUTE_PARAMS.id,
          });
          const component = render(renderTVShowDetails({ mocks }));
          await waitFor(() => {
            expect(elements.loading(component)).toBeNull();
          });
          expect(elements.similarItems(component).length).toEqual(
            tvShow.similar.length,
          );
        });
      });
    });

    describe('When querying with "error"', () => {
      it('should show the "error-state" correctly', async () => {
        const mocks = mockQueryTVShowDetailsError(DEFAULT_ROUTE_PARAMS.id);
        const component = render(
          renderTVShowDetails({
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
