import React from 'react';
import { render } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { navigation } from '@mocks/navigationMock';

import {
  MediaSectionViewAllStackNavigationProp,
  MediaSectionViewAllStackRouteProp,
} from '../../routes/route-params-types';

const mockUsePaginatedQuery = jest.fn();

mockUsePaginatedQuery.mockImplementation(() => ({
  onPaginateQuery: true,
  isPaginating: true,
}));

jest.mock('@hooks', () => ({
  usePaginatedQuery: params => mockUsePaginatedQuery(params),
  useGetCurrentISO6391Language: () => jest.fn(),
  useShowLanguageAlert: () => jest.fn(),
}));

import AutoMockProvider from '@mocks/AutoMockedProvider';
import * as Queries from '@graphql/queries';

import MediaSectionViewAll from './MediaSectionViewAll';
import { Routes } from '@routes/routes';

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
        navigation={navigation as MediaSectionViewAllStackNavigationProp}
        route={
          {
            name: Routes.Home.MEDIA_DETAILS_VIEW_ALL,
            key: `${Routes.Home.MEDIA_DETAILS_VIEW_ALL}-key`,
            params: {
              initialDataset,
              onPressItem,
              sectionKey,
              headerTitle,
              isMovie,
            },
          } as MediaSectionViewAllStackRouteProp
        }
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
