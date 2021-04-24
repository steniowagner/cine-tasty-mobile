/* eslint-disable global-require */
/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

jest.mock('../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';
import * as SchemaTypes from '@schema-types';

import { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';
import { STORAGE_SEARCH_SECTION } from './useRecentSearches';
import RecentSearches from './RecentSearches';

const renderRecentSearchMovies = (onPressItem: typeof jest.fn) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <RecentSearches
        searchType={SchemaTypes.SearchType.MOVIE}
        onPressItem={onPressItem}
      />
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

const STORAGE_KEY = `${STORAGE_SEARCH_SECTION}:${SchemaTypes.SearchType.MOVIE.toString()}`;
const ITEMS_COUNT = 5;
const {
  persistItemInStorage,
  getItemFromStorage,
} = require('../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

const items = Array(ITEMS_COUNT)
  .fill({})
  .map((_, index) => ({
    id: index,
    title: `item-${index}`,
    image: `image-${index}`,
  }));

describe('Testing <RecentSearches /> - [Movies]', () => {
  beforeEach(() => {
    setupTimeTravel();

    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should show the list of recent movies searched when has some items saved on the storage', () => {
    getItemFromStorage.mockImplementationOnce(() => items);

    const { queryAllByTestId, queryByTestId } = render(renderRecentSearchMovies(jest.fn));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(ITEMS_COUNT);

    expect(getItemFromStorage).toHaveBeenCalledTimes(3);

    expect(getItemFromStorage).toHaveBeenCalledWith(STORAGE_KEY, []);
  });

  it("should show an empty list when there's no items saved on the storage", () => {
    getItemFromStorage.mockImplementationOnce(() => []);

    const { queryAllByTestId, queryByTestId } = render(renderRecentSearchMovies(jest.fn));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(0);

    expect(getItemFromStorage).toHaveBeenCalledTimes(3);

    expect(getItemFromStorage).toHaveBeenCalledWith(STORAGE_KEY, []);
  });

  it("should remove an item from the storage when the user press on the 'x' button on the list-item", () => {
    getItemFromStorage.mockImplementation(() => items);

    const { queryAllByTestId, queryByTestId } = render(renderRecentSearchMovies(jest.fn));

    const INDEX_ITEM_REMOVED = 2;

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(ITEMS_COUNT);

    fireEvent.press(
      queryAllByTestId('recent-searches-list-item-close-button')[INDEX_ITEM_REMOVED],
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(persistItemInStorage).toHaveBeenCalledTimes(1);

    expect(persistItemInStorage).toHaveBeenCalledWith(
      STORAGE_KEY,
      items.filter(item => item.id !== items[INDEX_ITEM_REMOVED].id),
    );
  });

  it('should call onPressItem correctly when the item is pressed', () => {
    getItemFromStorage.mockImplementation(() => items);

    const onPressItem = jest.fn();
    const INDEX_ITEM_PRESSED = 2;

    const { queryAllByTestId } = render(renderRecentSearchMovies(onPressItem));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(
      queryAllByTestId('recent-searches-list-item-button')[INDEX_ITEM_PRESSED],
    );

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(items[INDEX_ITEM_PRESSED]);
  });
});
