import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { PAGINATION_DELAY } from '@src/hooks/use-paginated-query/useQueryWithPagination';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { DEFAULT_ANIMATION_DURATION } from '../../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MediaSectionViewAll from './MediaSectionViewAll';

const mockedInitialDataset = Array(5)
  .fill({})
  .map((_, index) => ({
    voteAverage: 10 / index + 1,
    title: `Title ${index + 1}`,
    posterPath: `PosterPath ${index + 1}`,
    voteCount: 10 / index + 1,
    genreIds: [`Genre${index}`],
    id: index,
  }));

const navigate = jest.fn();

const renderMediaSectionViewAll = (
  {
    initialDataset = mockedInitialDataset,
    sectionKey = 'onTheAir',
    headerTitle = '',
    isMovie = false,
  },
  resolvers?: IMocks,
) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <AutoMockProvider mockResolvers={resolvers}>
        <MediaSectionViewAll
          navigation={{ navigate }}
          route={{
            params: {
              initialDataset,
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

const getMockResolvers = (hasMore: boolean = false) => ({
  TrendingTVShowsQueryResult: () => ({
    items: () => new MockList(mockedInitialDataset.length),
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
      mockedInitialDataset.length,
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
      mockedInitialDataset.length * 2,
    );
  });

  it('should call "onPressItem" correctly when some item on the list is pressed', () => {
    const INDEX_ITEM_PRESSED =
      (Math.random() * (mockedInitialDataset.length - 1 - 0 + 1)) << 0;

    const { queryAllByTestId } = render(
      renderMediaSectionViewAll({}, getMockResolvers()),
    );

    fireEvent.press(queryAllByTestId('full-media-list-item')[INDEX_ITEM_PRESSED]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(
      Routes.TVShow.DETAILS,
      mockedInitialDataset[INDEX_ITEM_PRESSED],
    );
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
      } catch (err) {
        console.log('MediaSectionViewAllTVShows - error - 126');
      }
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
      } catch (err) {
        console.log('MediaSectionViewAllTVShows - error - 126');
      }
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
      } catch (err) {
        console.log('MediaSectionViewAllTVShows - error - 185');
      }
    });

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    expect(queryAllByTestId('full-media-list-item').length).toEqual(
      mockedInitialDataset.length * 2,
    );
  });
});
