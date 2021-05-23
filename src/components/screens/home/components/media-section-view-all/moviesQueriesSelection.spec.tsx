import React from 'react';
import { render } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';

const mockUsePaginatedQuery = jest.fn();

mockUsePaginatedQuery.mockImplementation(() => ({
  onPaginateQuery: true,
  isPaginating: true,
}));

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  usePaginatedQuery: params => mockUsePaginatedQuery(params),
}));

import * as Queries from '@graphql/queries';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MediaSectionViewAll from './MediaSectionViewAll';

const renderMediaSectionViewAll = (
  {
    onPressItem = jest.fn,
    initialDataset = [],
    headerTitle = '',
    isMovie = true,
    sectionKey,
  },
  resolvers?: IMocks,
) => (
  <TMDBImageQualityProvider>
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
  </TMDBImageQualityProvider>
);

describe('Testing the query selection for pagination on <MediaSectionViewAll /> - [Movies]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shound select the NowPlaying-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'nowPlaying' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      Queries.NOW_PLAYING_MOVIES,
    );
  });

  it('shound select the Popular-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'popular' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(Queries.POPULAR_MOVIES);
  });

  it('shound select the TopRated-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'topRated' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(
      Queries.TOP_RATED_MOVIES,
    );
  });

  it('shound select the Upcoming-query', () => {
    render(renderMediaSectionViewAll({ sectionKey: 'upcoming' }));

    expect(mockUsePaginatedQuery).toHaveBeenCalledTimes(1);

    expect(mockUsePaginatedQuery.mock.calls[0][0].query).toEqual(Queries.UPCOMING_MOVIES);
  });
});
