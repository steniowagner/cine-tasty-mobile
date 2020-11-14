import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import LoadingFamousList, { INITIAL_ITEMS_TO_RENDER } from './LoadingFamousList';
import { setupTimeTravel } from '../../../../__mocks__/timeTravel';
import { NUMBER_FLATLIST_COLUMNS } from '../../screens/famous/components/Famous';

const renderLoadingFamousList = () => (
  <ThemeProvider theme={theme}>
    <LoadingFamousList numberOfColumns={NUMBER_FLATLIST_COLUMNS} />
  </ThemeProvider>
);

describe('Testing <LoadingFamousList />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the correct number of items', () => {
    const { queryAllByTestId, queryByTestId } = render(renderLoadingFamousList());

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    expect(queryAllByTestId('loading-placeholder').length).toEqual(
      INITIAL_ITEMS_TO_RENDER * NUMBER_FLATLIST_COLUMNS,
    );
  });
});
