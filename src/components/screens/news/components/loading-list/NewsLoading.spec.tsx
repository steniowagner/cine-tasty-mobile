import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import NewsLoading, { INITIAL_ITEMS_TO_RENDER } from './NewsLoading';

const renderNewsLoading = () => (
  <ThemeProvider theme={theme}>
    <NewsLoading />
  </ThemeProvider>
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
