import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { PAGINATION_DELAY } from 'hooks/use-paginated-query/useQueryWithPagination';
import { dark } from 'styles/themes';

import { DEFAULT_ANIMATION_DURATION } from '../../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import { I18N_PAGINATE_MOVIES_ERROR_REF } from './useMediaSectionViewAll';
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

const renderMediaSectionViewAll = (
  {
    initialDataset = mockedInitialDataset,
    sectionKey = 'nowPlaying',
    onPressItem = jest.fn,
    headerTitle = '',
    isMovie = true,
  },
  resolvers?: IMocks,
) => (
  <ThemeProvider theme={dark}>
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
);

const getMockResolvers = (hasMore: boolean = false) => ({
  TrendingMoviesQueryResult: () => ({
    items: () => new MockList(mockedInitialDataset.length),
    hasMore,
  }),
});

const mockResolversWithError = {
  TrendingMoviesQueryResult: () => new Error(),
};

describe('Testing <MediaSectionViewAll /> - [Movies]', () => {
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
    const onPressItem = jest.fn();

    const INDEX_ITEM_PRESSED = 3;

    const { queryAllByTestId } = render(
      renderMediaSectionViewAll({ onPressItem }, getMockResolvers()),
    );

    fireEvent.press(queryAllByTestId('full-media-list-item')[INDEX_ITEM_PRESSED]);

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(mockedInitialDataset[INDEX_ITEM_PRESSED]);
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
        console.log('MediaSectionViewAllMovies - error - 126');
      }
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      I18N_PAGINATE_MOVIES_ERROR_REF,
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
        console.log('MediaSectionViewAllMovies - error - 126');
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
        console.log('MediaSectionViewAllMovies - error - 185');
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
