jest.unmock('react-native-reanimated');

import React from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import NewsLoading, {INITIAL_ITEMS_TO_RENDER} from './NewsLoading';

const renderNewsLoading = () => (
  <ThemeProvider theme={theme}>
    <NewsLoading />
  </ThemeProvider>
);

describe('<NewsLoading />', () => {
  afterEach(cleanup);

  const elements = {
    newsLoadingList: (api: RenderAPI) => api.queryByTestId('news-loading-list'),
    newsListItems: (api: RenderAPI) =>
      api.queryAllByTestId('news-loading-list-item'),
  };

  it('should render the component correctly', () => {
    const component = render(renderNewsLoading());
    expect(elements.newsLoadingList(component)).not.toBeNull();
    expect(elements.newsListItems(component)).not.toBeNull();
  });

  it('should render the correct number of items', async () => {
    const component = render(renderNewsLoading());
    expect(elements.newsListItems(component).length).toEqual(
      INITIAL_ITEMS_TO_RENDER,
    );
  });
});
