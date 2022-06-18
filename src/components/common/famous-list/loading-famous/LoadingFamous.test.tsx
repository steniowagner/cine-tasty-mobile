import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import {INITIAL_ITEMS_TO_RENDER} from './useLoadingFamous';
import {NUMBER_OF_COLUMNS} from '../FamousList';
import {LoadingFamous} from './LoadingFamous';

const renderLoadingFamousList = () => (
  <ThemeProvider theme={theme}>
    <LoadingFamous />
  </ThemeProvider>
);

describe('<LoadingFamous />', () => {
  const elements = {
    famousLoadingList: (api: RenderAPI) =>
      api.queryByTestId('famous-loading-list'),
    loadingPlaceholder: (api: RenderAPI) =>
      api.queryAllByTestId('loading-placeholder'),
  };

  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  describe('Renders correctly', () => {
    it('should render the correct number of items', () => {
      const component = render(renderLoadingFamousList());
      expect(elements.famousLoadingList(component)).not.toBeNull();
      expect(elements.loadingPlaceholder(component).length).toEqual(
        INITIAL_ITEMS_TO_RENDER * NUMBER_OF_COLUMNS,
      );
    });
  });
});