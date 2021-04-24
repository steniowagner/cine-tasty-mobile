import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';

import LoadingFamousList, { INITIAL_ITEMS_TO_RENDER } from './LoadingFamousList';
import { setupTimeTravel } from '../../../../__mocks__/timeTravel';
import { NUMBER_FLATLIST_COLUMNS } from '../../screens/famous/components/Famous';

const renderLoadingFamousList = () => (
  <ThemeContextProvider>
    <LoadingFamousList numberOfColumns={NUMBER_FLATLIST_COLUMNS} />
  </ThemeContextProvider>
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
