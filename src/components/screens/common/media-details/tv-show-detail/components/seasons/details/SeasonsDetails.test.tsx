import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {render, act, RenderAPI} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import {InMemoryCache} from '@apollo/client';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as tvShowsDetailsResolvers from '@mocks/fixtures/tv-show-season';
import possibleTypes from '@graphql/possibleTypes.json';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {SeasonsDetails} from './SeasonsDetails';

const ID = '123';

jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...actualNavigation,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

const renderSeasonsDetails = (mockResolvers: any, season: number) => (
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
    <ThemeProvider theme={theme}>
      <TMDBImageQualityProvider>
        <SeasonsDetails season={season} id={ID} />
      </TMDBImageQualityProvider>
    </ThemeProvider>
  </MockedProvider>
);

describe('<SeasonsDetails />', () => {
  const elements = {
    loading: (api: RenderAPI) => api.queryByTestId('loading-content-indicator'),
    advise: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
    adviseTitle: (api: RenderAPI) => api.queryByTestId('advise-title'),
    adviseDescription: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    adviseSuggestion: (api: RenderAPI) =>
      api.queryByTestId('advise-suggestion'),
    season: (api: RenderAPI) => api.queryByTestId('season-detail'),
    episodes: (api: RenderAPI) => api.queryAllByTestId('episode-list-item'),
    overview: (api: RenderAPI) => api.queryByTestId('overview-text'),
  };

  describe('When get the season-data correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly when all the data is returned', () => {
      const season = randomPositiveNumber(10, 1);
      const numberEpisodes = randomPositiveNumber(10, 1);
      const queryResult = tvShowsDetailsResolvers.tvShowsDetailsResolvers(
        {
          language: 'EN',
          season,
          id: ID,
        },
        numberEpisodes,
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderSeasonsDetails(resolvers, season));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.advise(component)).toBeNull();
      expect(elements.season(component)).not.toBeNull();
      expect(elements.episodes(component)).not.toBeNull();
      expect(elements.episodes(component).length).toEqual(numberEpisodes);
      expect(elements.overview(component)).not.toBeNull();
      expect(elements.overview(component).children[0]).toEqual('OVERVIEW');
    });
  });

  describe('Loading-state', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly when the data is loading', () => {
      const season = randomPositiveNumber(10, 1);
      const numberEpisodes = randomPositiveNumber(10, 1);
      const queryResult = tvShowsDetailsResolvers.tvShowsDetailsResolvers(
        {
          language: 'EN',
          season,
          id: ID,
        },
        numberEpisodes,
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderSeasonsDetails(resolvers, season));
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.advise(component)).toBeNull();
      expect(elements.season(component)).toBeNull();
      expect(elements.episodes(component)).toEqual([]);
      expect(elements.overview(component)).toBeNull();
    });
  });

  describe('When some error happens', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should show the "Adise" correctly when a "Network-error" happened', () => {
      const season = randomPositiveNumber(10, 1);
      const numberEpisodes = randomPositiveNumber(10, 1);
      const queryResult = tvShowsDetailsResolvers.tvShowsDetailsResolvers(
        {
          language: 'EN',
          season,
          id: ID,
        },
        numberEpisodes,
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithNetworkError,
        },
      ];
      const component = render(renderSeasonsDetails(resolvers, season));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.advise(component)).not.toBeNull();
      expect(elements.adviseTitle(component)).not.toBeNull();
      expect(elements.adviseTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE,
      );
      expect(elements.adviseDescription(component)).not.toBeNull();
      expect(elements.adviseDescription(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION,
      );
      expect(elements.adviseSuggestion(component)).not.toBeNull();
      expect(elements.adviseSuggestion(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION,
      );
      expect(elements.season(component)).toBeNull();
      expect(elements.episodes(component)).toEqual([]);
      expect(elements.overview(component)).toBeNull();
    });

    it('should show the "Adise" correctly when a "GraphQL-error" happened', () => {
      const season = randomPositiveNumber(10, 1);
      const numberEpisodes = randomPositiveNumber(10, 1);
      const queryResult = tvShowsDetailsResolvers.tvShowsDetailsResolvers(
        {
          language: 'EN',
          season,
          id: ID,
        },
        numberEpisodes,
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderSeasonsDetails(resolvers, season));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.advise(component)).not.toBeNull();
      expect(elements.adviseTitle(component)).not.toBeNull();
      expect(elements.adviseTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE,
      );
      expect(elements.adviseDescription(component)).not.toBeNull();
      expect(elements.adviseDescription(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION,
      );
      expect(elements.adviseSuggestion(component)).not.toBeNull();
      expect(elements.adviseSuggestion(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION,
      );
      expect(elements.season(component)).toBeNull();
      expect(elements.episodes(component)).toEqual([]);
      expect(elements.overview(component)).toBeNull();
    });
  });
});
