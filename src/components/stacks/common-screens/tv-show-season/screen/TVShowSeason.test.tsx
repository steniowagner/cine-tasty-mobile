import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';

import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { Translations } from '@/i18n/tags';
import { Routes } from '@/navigation';

import { TVShowSeasonProps } from '../routes/route-params-types';
import { TVShowSeason } from './TVShowSeason';
import {
  MockedNavigator,
  mockQueryTVShowSeasonDetailsSuccess,
  mockQueryTVShowSeasonDetailsError,
  tvShowSeason,
  randomPositiveNumber,
} from '../../../../../../__mocks__';

const TV_SHOW_NAME = 'SOME_TV_SHOW_NAME';
const SEASON = 1;

const renderTVShowSeasonDetails = (
  mocks: readonly MockedResponse<Record<string, any>>[],
) => {
  const TVShowSeasonDetailsComponent = (
    tvShowSeasonDetailsComponentProps: TVShowSeasonProps,
  ) => (
    <MockedProvider
      mocks={mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <TVShowSeason
        navigation={tvShowSeasonDetailsComponentProps.navigation}
        route={{
          name: Routes.Famous.TV_SHOW_SEASON,
          key: `${Routes.Famous.TV_SHOW_SEASON}-key`,
          params: {
            season: SEASON,
            id: 1,
            name: TV_SHOW_NAME,
          },
        }}
      />
    </MockedProvider>
  );
  return <MockedNavigator component={TVShowSeasonDetailsComponent} />;
};

describe('Common-screens/TVShowSeason', () => {
  const elements = {
    loading: (api: RenderAPI) => api.queryByTestId('tvshow-season-loading'),
    advice: (component: RenderAPI) => component.queryByTestId('advice-wrapper'),
    adviceIcon: (component: RenderAPI) =>
      component.queryByTestId('icon-alert-box'),
    adviceTitle: (component: RenderAPI) =>
      component.queryByTestId('advice-title'),
    adviceDescription: (component: RenderAPI) =>
      component.queryByTestId('advice-description'),
    adviceSuggestion: (component: RenderAPI) =>
      component.queryByTestId('advice-suggestion'),
    content: (component: RenderAPI) =>
      component.queryByTestId('tv-show-season-content'),
    title: (component: RenderAPI) => component.queryByTestId('tv-show-title'),
    season: (component: RenderAPI) => component.queryByTestId('season-title'),
    episodes: (component: RenderAPI) =>
      component.queryAllByTestId('season-episode'),
    episodeTitle: (component: RenderAPI) =>
      component.queryAllByTestId('season-episode-title'),
    modal: (component: RenderAPI) => component.queryByTestId('modal-sheet'),
    episodeModalTitle: (component: RenderAPI) =>
      component.getByTestId('episode-modal-title'),
    episodeModalDescription: (component: RenderAPI) =>
      component.getByTestId('description-text'),
  };

  describe('Rendering', () => {
    it('should show the "render-state" by default', async () => {
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.advice(component)).toBeNull();
      expect(elements.content(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When querying successfuly', () => {
    it('should render the "header" correctly', async () => {
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.title(component)?.children[0]).toEqual(TV_SHOW_NAME);
      expect(elements.season(component)?.children[0]).toEqual(
        `${Translations.TVShowDetails.SEASON} ${SEASON}`,
      );
    });

    it('should render the "episodes" correctly', async () => {
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.episodes(component).length).toEqual(
        tvShowSeason.episodes.length,
      );
      for (let i = 0; i < elements.episodes(component).length; i++) {
        expect(elements.episodeTitle(component)[i].children[0]).toEqual(
          tvShowSeason.episodes[i].name,
        );
      }
    });
  });

  describe('Opening the "episode-details-modal"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should open the "episode-details-modal" correctly when "selecting some episode"', async () => {
      const indeEpisodeSelected = randomPositiveNumber(
        tvShowSeason.episodes.length - 1,
      );
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.modal(component)!.props.visible).toEqual(false);
      act(() => {
        fireEvent.press(elements.episodes(component)[indeEpisodeSelected]);
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      act(() => {
        jest.runAllTimers();
      });
    });

    it('should render the "episode-details" correctly', async () => {
      const indeEpisodeSelected = randomPositiveNumber(
        tvShowSeason.episodes.length - 1,
      );
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.modal(component)!.props.visible).toEqual(false);
      act(() => {
        fireEvent.press(elements.episodes(component)[indeEpisodeSelected]);
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      act(() => {
        jest.runAllTimers();
      });
    });

    it('should render the "episode-details-content" correctly', async () => {
      const indeEpisodeSelected = randomPositiveNumber(
        tvShowSeason.episodes.length - 1,
      );
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsSuccess()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      act(() => {
        fireEvent.press(elements.episodes(component)[indeEpisodeSelected]);
      });
      expect(elements.modal(component)!.props.visible).toEqual(true);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.episodeModalTitle(component).children[0]).toEqual(
        tvShowSeason.episodes[indeEpisodeSelected].name,
      );
      expect(elements.episodeModalDescription(component).children[0]).toEqual(
        tvShowSeason.episodes[indeEpisodeSelected].overview,
      );
    });
  });

  describe('When some error happens', () => {
    it('should show the "error-state" correctly', async () => {
      const component = render(
        renderTVShowSeasonDetails(mockQueryTVShowSeasonDetailsError()),
      );
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.content(component)).toBeNull();
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
      await waitFor(() => {});
    });
  });
});
