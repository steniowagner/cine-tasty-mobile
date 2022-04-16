import React from 'react';
import {render, RenderAPI, waitFor} from '@testing-library/react-native';

import {ThemeContextProvider} from '@providers';
import {Translations} from '@i18n/tags';

import {NUMBER_ITEMS} from './loading-overview/LoadingOverview';
import {act} from 'react-test-renderer';
import {Overview} from './Overview';

const overview = 'SOME_OVERVIEW';

const renderOverview = (isLoading = false) => (
  <ThemeContextProvider>
    <Overview isLoading={isLoading} overview="SOME_OVERVIEW" />
  </ThemeContextProvider>
);

describe('<Overview />', () => {
  const elements = {
    descriptionWrapper: (api: RenderAPI) =>
      api.queryByTestId('media-item-description-wrapper'),
    loadings: (api: RenderAPI) => api.queryAllByTestId('loading-item'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    descriptionText: (api: RenderAPI) => api.queryByTestId('description-text'),
  };

  describe('Renders correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly when "isLoading" is "false"', async () => {
      const component = render(renderOverview());
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_OVERVIEW,
      );
      expect(elements.loadings(component).length).toEqual(0);
      expect(elements.descriptionWrapper(component)).not.toBeNull();
      expect(elements.descriptionText(component)).not.toBeNull();
      expect(elements.descriptionText(component).children[0]).toEqual(overview);
      await waitFor(() => {});
    });
  });

  describe('Loading State', () => {
    it('should render correctly when "isLoading" is "true"', async () => {
      act(() => {
        jest.runAllTimers();
      });
      const component = render(renderOverview(true));
      await waitFor(() => {
        expect(elements.loadings(component).length).toEqual(NUMBER_ITEMS);
      });
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_OVERVIEW,
      );
      expect(elements.descriptionWrapper(component)).toBeNull();
      await waitFor(() => {});
    });
  });
});
