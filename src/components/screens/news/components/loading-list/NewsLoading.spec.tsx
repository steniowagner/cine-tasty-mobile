import React from 'react';
import { render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import NewsLoading, { INITIAL_ITEMS_TO_RENDER } from './NewsLoading';

const renderNewsLoading = () => (
  <ThemeProvider
    theme={dark}
  >
    <NewsLoading />
  </ThemeProvider>
);

describe('Testing <NewsLoading />', () => {
  it('should render the correct number of items', () => {
    const { queryAllByTestId, queryByTestId } = render(renderNewsLoading());

    expect(queryByTestId('news-loading-list')).not.toBeNull();

    expect(queryAllByTestId('news-list-item').length).toEqual(INITIAL_ITEMS_TO_RENDER);
  });
});
