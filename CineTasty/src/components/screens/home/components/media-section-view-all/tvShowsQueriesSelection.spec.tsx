import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';

const mockUsePaginatedQuery = jest.fn();

mockUsePaginatedQuery.mockImplementation(() => ({
  onPaginateQuery: true,
  isPaginating: true,
}));

jest.mock('hooks', () => ({
  usePaginatedQuery: params => mockUsePaginatedQuery(params),
}));

import theme from 'styles/theme';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MediaSectionViewAll from './MediaSectionViewAll';
import * as TVShowsQueries from './queries';

const renderMediaSectionViewAll = (
  {
    onPressItem = jest.fn,
    initialDataset = [],
    headerTitle = '',
    isMovie = false,
    sectionKey,
  },
  resolvers?: IMocks,
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <AutoMockProvider mockResolvers={resolvers}>
        <MediaSectionViewAll
          route={{
            params: {
              initialDataset,
              onPressItem,
              sectionKey,
              headerTitle,
              isMovie,
            },
          }}
        />
      </AutoMockProvider>
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing the query selection for pagination on <MediaSectionViewAll /> - [TV-Shows]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'onTheAir' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      TVShowsQueries.ON_THE_AIR_TV_SHOWS,
    );
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'popular' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      TVShowsQueries.POPULAR_TV_SHOWS,
    );
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'topRated' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      TVShowsQueries.TOP_RATED_TV_SHOWS,
    );
  });
});
