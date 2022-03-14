import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  act,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

jest.mock('@utils/storage');

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {randomPositiveNumber, randomArrayIndex} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {setupTimeTravel} from '@mocks/timeTravel';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

import {STORAGE_SEARCH_SECTION} from './useRecentSearches';
import RecentSearches from './RecentSearches';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

const renderRecentSearchFamous = () => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualityProvider>
      <RecentSearches searchType={SchemaTypes.SearchType.PERSON} />
    </TMDBImageQualityProvider>
  </ThemeProvider>
);

const STORAGE_KEY = `${STORAGE_SEARCH_SECTION}:${SchemaTypes.SearchType.PERSON.toString()}`;

const storage = require('@utils/storage');

const items = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      id: index,
      title: `item-${index}`,
      image: `image-${index}`,
    }));

describe('<RecentSearches /> - [Famous]', () => {
  const elements = {
    recentSearchesItems: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item'),
    recentSearchesButton: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-button'),
    recentSearchesCloseButton: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-close-button'),
    recentSearchesList: (api: RenderAPI) =>
      api.queryByTestId('recent-searches-list'),
  };

  beforeEach(() => {
    setupTimeTravel();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('Render', () => {
    it('should show the list of the recent-famous-searched when has some items saved on the storage', () => {
      const datasetLength = randomPositiveNumber(10, 1);
      const dataset = items(datasetLength);
      storage.get.mockImplementationOnce(() => dataset);
      const component = render(renderRecentSearchFamous());
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.recentSearchesList(component)).not.toBeNull();
      expect(elements.recentSearchesItems(component).length).toEqual(
        datasetLength,
      );
      expect(storage.get).toHaveBeenCalledTimes(2);
      expect(storage.get).toHaveBeenNthCalledWith(1, STORAGE_KEY, []);
    });

    it("should not show the recent-search-list when there's no items saved on the storage", () => {
      storage.get.mockImplementationOnce(() => []);
      const component = render(renderRecentSearchFamous());
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.recentSearchesList(component)).toBeNull();
      expect(storage.get).toHaveBeenCalledTimes(2);
      expect(storage.get).toHaveBeenNthCalledWith(1, STORAGE_KEY, []);
    });
  });

  describe('Press items', () => {
    it("should remove an item from the storage when the user presses on the 'x' button on the list-item", () => {
      const datasetLength = randomPositiveNumber(10, 1);
      const dataset = items(datasetLength);
      storage.get.mockImplementation(() => dataset);
      const component = render(renderRecentSearchFamous());
      const indexItemRemoved = randomArrayIndex(dataset);
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.recentSearchesList(component)).not.toBeNull();
      expect(elements.recentSearchesItems(component).length).toEqual(
        datasetLength,
      );
      fireEvent.press(
        elements.recentSearchesCloseButton(component)[indexItemRemoved],
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(storage.set).toHaveBeenCalledTimes(1);
      expect(storage.set).toHaveBeenCalledWith(
        STORAGE_KEY,
        dataset.filter(item => item.id !== dataset[indexItemRemoved].id),
      );
    });

    it('should call "navigation.navigate" correctly when the some item is pressed', () => {
      const datasetLength = randomPositiveNumber(10, 1);
      const dataset = items(datasetLength);
      storage.get.mockImplementation(() => dataset);
      const component = render(renderRecentSearchFamous());
      const itemPressedIndex = randomArrayIndex(dataset);
      act(() => {
        jest.runAllTimers();
      });
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(
        elements.recentSearchesButton(component)[itemPressedIndex],
      );
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        Routes.Famous.DETAILS,
        {
          profileImage: dataset[itemPressedIndex].image,
          name: dataset[itemPressedIndex].title,
          id: dataset[itemPressedIndex].id,
        },
      );
    });
  });
});
