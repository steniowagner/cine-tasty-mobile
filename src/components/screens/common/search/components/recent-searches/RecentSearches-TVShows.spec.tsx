/* eslint-disable global-require */
/* eslint-disable import/first */
import React from 'react';
import {cleanup, fireEvent, render, act} from '@testing-library/react-native';

jest.mock('../../../../../../utils/storage');

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {setupTimeTravel} from '@mocks/timeTravel';
import {ThemeContextProvider} from '@providers';
import * as SchemaTypes from '@schema-types';

import {STORAGE_SEARCH_SECTION} from './useRecentSearches';
import RecentSearches from './RecentSearches';

const renderRecentSearchTVShows = (onPressItem: typeof jest.fn) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <RecentSearches
        searchType={SchemaTypes.SearchType.TV}
        onPressItem={onPressItem}
      />
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

const STORAGE_KEY = `${STORAGE_SEARCH_SECTION}:${SchemaTypes.SearchType.TV.toString()}`;
const ITEMS_COUNT = 5;

const storage = require('../../../../../../utils/storage');

const items = Array(ITEMS_COUNT)
  .fill({})
  .map((_, index) => ({
    id: index,
    title: `item-${index}`,
    image: `image-${index}`,
  }));

describe('Testing <RecentSearches /> - [TV Shows]', () => {
  beforeEach(() => {
    setupTimeTravel();

    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should show the list of recent tv shows searched when has some items saved on the storage', () => {
    storage.get.mockImplementationOnce(() => items);

    const {queryAllByTestId, queryByTestId} = render(
      renderRecentSearchTVShows(jest.fn),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(
      ITEMS_COUNT,
    );

    expect(storage.get).toHaveBeenCalledTimes(3);

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEY, []);
  });

  it("should show an empty list when there's no items saved on the storage", () => {
    storage.get.mockImplementationOnce(() => []);

    const {queryAllByTestId, queryByTestId} = render(
      renderRecentSearchTVShows(jest.fn),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(0);

    expect(storage.get).toHaveBeenCalledTimes(3);

    expect(storage.get).toHaveBeenCalledWith(STORAGE_KEY, []);
  });

  it("should remove an item from the storage when the user press on the 'x' button on the list-item", () => {
    storage.get.mockImplementation(() => items);

    const {queryAllByTestId, queryByTestId} = render(
      renderRecentSearchTVShows(jest.fn),
    );

    const INDEX_ITEM_REMOVED = 2;

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('recent-searches-list')).not.toBeNull();

    expect(queryAllByTestId('recent-searches-list-item').length).toEqual(
      ITEMS_COUNT,
    );

    fireEvent.press(
      queryAllByTestId('recent-searches-list-item-close-button')[
        INDEX_ITEM_REMOVED
      ],
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(storage.set).toHaveBeenCalledTimes(1);

    expect(storage.set).toHaveBeenCalledWith(
      STORAGE_KEY,
      items.filter(item => item.id !== items[INDEX_ITEM_REMOVED].id),
    );
  });

  it('should call onPressItem correctly when the item is pressed', () => {
    storage.get.mockImplementation(() => items);

    const onPressItem = jest.fn();
    const INDEX_ITEM_PRESSED = 2;

    const {queryAllByTestId} = render(renderRecentSearchTVShows(onPressItem));

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
