import React from 'react';
import { render } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';

const mockUsePaginatedQuery = jest.fn();

mockUsePaginatedQuery.mockImplementation(() => ({
  onPaginateQuery: true,
  isPaginating: true,
}));

jest.mock('@hooks', () => ({
  usePaginatedQuery: params => mockUsePaginatedQuery(params),
  useShowLanguageAlert: () => jest.fn(),
  useSystemThemePreference: jest.fn(() => ({ systemTheme: 'DARK' })),
  useGetCurrentISO6391Language: () => jest.fn(),
}));

import * as Queries from '@graphql/queries';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MediaSectionViewAll from './MediaSectionViewAll';

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
    <ThemeContextProvider>
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
    </ThemeContextProvider>
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
      Queries.ON_THE_AIR_TV_SHOWS,
    );
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'popular' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      Queries.POPULAR_TV_SHOWS,
    );
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'topRated' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      Queries.TOP_RATED_TV_SHOWS,
    );
  });
});
