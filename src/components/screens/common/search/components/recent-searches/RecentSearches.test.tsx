jest.unmock('react-native-reanimated');
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  render,
  waitFor,
  RenderAPI,
  act,
  fireEvent,
} from '@testing-library/react-native';

import {TMDBImageQualitiesProvider} from '@providers';
import {dark as theme} from '@styles/themes/dark';
import {randomArrayElement, randomArrayIndex} from '@mocks/utils';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {CONSTANTS} from '@utils';

import {MAX_RECENT_SEARCHES} from './useRecentSearches';
import {RecentSearches} from './RecentSearches';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@utils');

const utils = require('@utils');

const makeRecentSearches = (size: number = MAX_RECENT_SEARCHES) =>
  Array(size)
    .fill({})
    .map((_, index) => ({
      image: `IMAGE_${index}`,
      title: `TITLE_${index}`,
      id: index,
    }));

const searchTypes = [
  SchemaTypes.SearchType.MOVIE,
  SchemaTypes.SearchType.TV,
  SchemaTypes.SearchType.PERSON,
];

const renderRecentSearches = (
  searchType: SchemaTypes.SearchType,
  onPressItem = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <RecentSearches searchType={searchType} onPressItem={onPressItem} />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('<RecentSearches />', () => {
  const elements = {
    buttons: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-button'),
    titles: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-title'),
    closeButtons: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-close-button'),
    title: (api: RenderAPI) => api.queryByTestId('recent-searches-title'),
    images: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-image'),
  };

  describe('When has some searched-items previously saved in the storage', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.useFakeTimers();
    });

    it('should call "storage.get" correctly', async () => {
      const searchType = randomArrayElement(searchTypes);
      render(renderRecentSearches(searchType));
      expect(utils.storage.get as jest.Mock).toHaveBeenCalledWith(
        `${
          CONSTANTS.KEYS.APP_STORAGE_KEY
        }:RECENT_SEARCHES:${searchType.toString()}`,
        [],
      );
    });

    it('should render the previously saved items correctly', async () => {
      const searchType = randomArrayElement(searchTypes);
      const itemsFromStorage = makeRecentSearches();
      (utils.storage.get as jest.Mock).mockResolvedValue(itemsFromStorage);
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.buttons(component).length).toBeGreaterThan(0);
      });
      for (let i = 0; i < elements.buttons(component).length; i++) {
        expect(elements.titles(component)[i].children[0]).toEqual(
          itemsFromStorage[i].title,
        );
      }
    });

    it('should render the title correctly', async () => {
      const searchType = randomArrayElement(searchTypes);
      const itemsFromStorage = makeRecentSearches(1);
      (utils.storage.get as jest.Mock).mockResolvedValue(itemsFromStorage);
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.buttons(component).length).toBeGreaterThan(0);
      });
      expect(elements.title(component).children[0]).toEqual(
        Translations.Tags.SEARCH_RECENT,
      );
    });

    it('should remove an item correctly', async () => {
      const searchType = randomArrayElement(searchTypes);
      const itemsFromStorage = makeRecentSearches(MAX_RECENT_SEARCHES);
      const indexRemovedItem = randomArrayIndex(itemsFromStorage);
      (utils.storage.get as jest.Mock).mockResolvedValue(itemsFromStorage);
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.buttons(component).length).toEqual(MAX_RECENT_SEARCHES);
      });
      fireEvent.press(elements.closeButtons(component)[indexRemovedItem]);
      expect(elements.buttons(component).length).toEqual(
        itemsFromStorage.length - 1,
      );
      const expectedItemsAfterRemoval = [...itemsFromStorage].filter(
        (_, index) => index !== indexRemovedItem,
      );
      for (let i = 0; i < elements.buttons(component).length; i++) {
        expect(elements.titles(component)[i].children[0]).toEqual(
          expectedItemsAfterRemoval[i].title,
        );
      }
    });

    it('should call "onPressItem" correctly when the user press one of the items', async () => {
      const searchType = randomArrayElement(searchTypes);
      const onPressItem = jest.fn();
      const itemsFromStorage = makeRecentSearches(MAX_RECENT_SEARCHES);
      (utils.storage.get as jest.Mock).mockResolvedValue(itemsFromStorage);
      const component = render(renderRecentSearches(searchType, onPressItem));
      await waitFor(() => {
        expect(elements.buttons(component).length).toBeGreaterThan(0);
      });
      expect(onPressItem).toHaveBeenCalledTimes(0);
      const indexItemSelected = randomArrayIndex(itemsFromStorage);
      fireEvent.press(elements.buttons(component)[indexItemSelected]);
      expect(onPressItem).toHaveBeenCalledWith(
        itemsFromStorage[indexItemSelected],
      );
      expect(onPressItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('When has no items previously saved', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should not render when there is not items previously searched', () => {
      const searchType = randomArrayElement(searchTypes);
      (utils.storage.get as jest.Mock).mockResolvedValue([]);
      const component = render(renderRecentSearches(searchType));
      expect(elements.buttons(component).length).toEqual(0);
    });
  });
});
