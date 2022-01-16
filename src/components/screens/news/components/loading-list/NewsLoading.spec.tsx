import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import { setupTimeTravel } from '@mocks/timeTravel';
import { ThemeContextProvider } from '@providers';

import NewsLoading, { INITIAL_ITEMS_TO_RENDER } from './NewsLoading';

const renderNewsLoading = () => (
  <ThemeContextProvider>
    <NewsLoading />
  </ThemeContextProvider>
);

describe('Testing <NewsLoading />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the correct number of items', () => {
    const { queryAllByTestId, queryByTestId } = render(renderNewsLoading());

    expect(queryByTestId('news-loading-list')).not.toBeNull();

    expect(queryAllByTestId('news-list-item').length).toEqual(INITIAL_ITEMS_TO_RENDER);
  });
});
