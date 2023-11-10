import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { TMDBImageQualitiesProvider } from '@/providers';
import { RenderAPI, render, waitFor } from '@testing-library/react-native';
import { Routes } from '@/navigation';

import { FamousDetailsNavigationProps } from './routes/route-params-types';
import { FamousDetails } from './FamousDetails';
import {
  mockQueryFamousDetailsSuccess,
  mockQueryFamousDetailsError,
  MockedNavigator,
} from '../../../../../__mocks__';
import { Translations } from '@/i18n/tags';

const FAMOUS_ID = 123;

const renderFamousDetails = (
  mocks: readonly MockedResponse<Record<string, any>>[],
) => {
  const Component = (props: FamousDetailsNavigationProps) => (
    <MockedProvider
      mocks={mocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}>
      <TMDBImageQualitiesProvider>
        <FamousDetails
          route={{
            name: Routes.Famous.DETAILS,
            key: `${Routes.Famous.DETAILS}-key`,
            params: {
              profileImage: 'PROFILE_IMAGE',
              name: 'NAME',
              id: FAMOUS_ID,
            },
          }}
          navigation={props.navigation}
        />
      </TMDBImageQualitiesProvider>
    </MockedProvider>
  );
  return <MockedNavigator component={Component} />;
};

describe('Common-screens/FamousDetails', () => {
  const elements = {
    loading: (api: RenderAPI) =>
      api.queryByTestId('loading-header-placeholder'),
    sectionsTitles: (api: RenderAPI) => api.queryAllByTestId('section-title'),
    header: (api: RenderAPI) => api.queryByTestId('header-info'),
    biography: (api: RenderAPI) => api.queryByTestId('biography'),
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
    castMovies: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-MOVIE'),
    castTVShows: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-TV_SHOW'),
    advice: (component: RenderAPI) => component.queryByTestId('advice-wrapper'),
    adviceIcon: (component: RenderAPI) =>
      component.queryByTestId('icon-alert-box'),
    adviceTitle: (component: RenderAPI) =>
      component.queryByTestId('advice-title'),
    adviceDescription: (component: RenderAPI) =>
      component.queryByTestId('advice-description'),
    adviceSuggestion: (component: RenderAPI) =>
      component.queryByTestId('advice-suggestion'),
  };

  describe('Rendering', () => {
    it('should show the "loading-state" by default', async () => {
      const mock = mockQueryFamousDetailsSuccess(FAMOUS_ID);
      const component = render(renderFamousDetails(mock));
      expect(elements.loading(component)).not.toBeNull();
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
    });

    it('should render the "sections" correctly', async () => {
      const mock = mockQueryFamousDetailsSuccess(FAMOUS_ID);
      const component = render(renderFamousDetails(mock));
      await waitFor(() => {
        expect(elements.loading(component)).toBeNull();
      });
      expect(elements.sectionsTitles(component).length).toEqual(3);
      expect(elements.sectionsTitles(component)[0]!.children[0]).toEqual(
        Translations.FamousDetails.BIOGRAPHY,
      );
      expect(elements.sectionsTitles(component)[1]!.children[0]).toEqual(
        Translations.FamousDetails.CAST_MOVIES,
      );
      expect(elements.sectionsTitles(component)[2]!.children[0]).toEqual(
        Translations.FamousDetails.CAST_TV_SHOWS,
      );
    });

    describe('When query successfuly', () => {
      it('should render correctly', async () => {
        const mock = mockQueryFamousDetailsSuccess(FAMOUS_ID);
        const component = render(renderFamousDetails(mock));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.header(component)).not.toBeNull();
        expect(elements.biography(component)).not.toBeNull();
        expect(elements.imagesList(component)).not.toBeNull();
        expect(elements.castMovies(component)).not.toBeNull();
        expect(elements.castTVShows(component)).not.toBeNull();
      });
    });

    describe('When query with error', () => {
      it('should render the "Advice"', async () => {
        const mock = mockQueryFamousDetailsError(FAMOUS_ID);
        const component = render(renderFamousDetails(mock));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.advice(component)).not.toBeNull();
        expect(elements.adviceIcon(component)).not.toBeNull();
        expect(elements.header(component)).toBeNull();
        expect(elements.biography(component)).toBeNull();
        expect(elements.imagesList(component)).toBeNull();
        expect(elements.castMovies(component)).toBeNull();
        expect(elements.castTVShows(component)).toBeNull();
      });

      it('should render the "Advice" content correctly', async () => {
        const mock = mockQueryFamousDetailsError(FAMOUS_ID);
        const component = render(renderFamousDetails(mock));
        await waitFor(() => {
          expect(elements.loading(component)).toBeNull();
        });
        expect(elements.adviceDescription(component)!.children[0]).toEqual(
          Translations.FamousDetails.ERROR_ADVICE_DESCRIPTION,
        );
        expect(elements.adviceSuggestion(component)!.children[0]).toEqual(
          Translations.FamousDetails.ERROR_ADVICE_SUGGESTION,
        );
        expect(elements.adviceTitle(component)!.children[0]).toEqual(
          Translations.FamousDetails.ERROR_ADVICE_TITLE,
        );
      });
    });
  });
});
