import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { PAGINATION_DELAY } from '@src/hooks/use-paginated-query/useQueryWithPagination';
import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import { tvShowViewAllInitialDataset } from '@mocks/fixtures';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import { navigation } from '@mocks/navigationMock';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import * as Types from '@local-types';

import MediaSectionViewAll from './MediaSectionViewAll';

const renderMediaSectionViewAll = (
  {
    initialDataset = tvShowViewAllInitialDataset,
    sectionKey = 'onTheAir',
    headerTitle = '',
    isMovie = false,
    navigate = jest.fn(),
  },
  resolvers?: IMocks,
) => {
  const trendingMediaItemkeY = sectionKey as Types.TrendingMediaItemKey;

  return (
    <TMDBImageQualityProvider>
      <ThemeContextProvider>
        <AutoMockProvider mockResolvers={resolvers}>
          <MediaSectionViewAll
            navigation={{ ...navigation, navigate }}
            route={{
              name: Routes.Home.MEDIA_DETAILS_VIEW_ALL,
              key: `${Routes.Home.MEDIA_DETAILS_VIEW_ALL}-key`,
              params: {
                sectionKey: trendingMediaItemkeY,
                onPressItem: jest.fn(),
                initialDataset,
                headerTitle,
                isMovie,
              },
            }}
          />
        </AutoMockProvider>
      </ThemeContextProvider>
    </TMDBImageQualityProvider>
  );
};

const getMockResolvers = (hasMore: boolean = false) => ({
  TrendingTVShowsQueryResult: () => ({
    items: () => new MockList(tvShowViewAllInitialDataset.length),
    hasMore,
  }),
});

const mockResolversWithError = {
  TrendingTVShowsQueryResult: () => new Error(),
};

describe('Testing <MediaSectionViewAll /> - [TV-Shows]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('shound render the inital items correctly', () => {
    const { getByTestId, queryAllByTestId } = render(
      renderMediaSectionViewAll({}, getMockResolvers()),
    );

    expect(queryAllByTestId('full-media-list-item').length).toEqual(
      tvShowViewAllInitialDataset.length,
    );

    expect(getByTestId('media-view-all-list')).not.toBeNull();
  });

  it('shound call the "onEndReached" when the user scrolls until the end of the "media-view-all-list"', () => {
    const { queryAllByTestId, getByTestId, queryByTestId } = render(
      renderMediaSectionViewAll({}, getMockResolvers()),
    );

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(getByTestId('media-view-all-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByTestId('full-media-list-item').length).toEqual(
      tvShowViewAllInitialDataset.length * 2,
    );
  });

  it('should call "onPressItem" correctly when some item on the list is pressed', () => {
    const INDEX_ITEM_PRESSED =
      (Math.random() * (tvShowViewAllInitialDataset.length - 1 - 0 + 1)) << 0;

    const navigate = jest.fn();

    const { queryAllByTestId } = render(
      renderMediaSectionViewAll({ navigate }, getMockResolvers()),
    );

    fireEvent.press(queryAllByTestId('full-media-list-item')[INDEX_ITEM_PRESSED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.TVShow.DETAILS, {
      genreIds: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].genreIds,
      voteAverage: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].voteAverage,
      posterPath: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].posterPath,
      voteCount: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].voteCount,
      title: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].title,
      id: tvShowViewAllInitialDataset[INDEX_ITEM_PRESSED].id,
    });
  });

  it('shound show an error message when the user scroll to the end of the list and some error occurs during the pagination', () => {
    const { getByTestId } = render(renderMediaSectionViewAll({}, mockResolversWithError));

    fireEvent(getByTestId('media-view-all-list'), 'onEndReached');

    act(() => {
      timeTravel(PAGINATION_DELAY);
    });

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR,
    );
  });

  it('shound paginate correctly after the user have an error and then try it again without errors', () => {
    const { queryAllByTestId, getByTestId, queryByTestId, rerender } = render(
      renderMediaSectionViewAll({}, mockResolversWithError),
    );

    fireEvent(getByTestId('media-view-all-list'), 'onEndReached');

    act(() => {
      timeTravel(PAGINATION_DELAY);
    });

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    fireEvent.press(getByTestId('pagination-footer-reload-button'));

    rerender(renderMediaSectionViewAll({}, getMockResolvers()));

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    expect(queryAllByTestId('full-media-list-item').length).toEqual(
      tvShowViewAllInitialDataset.length * 2,
    );
  });
});
