import React from 'react';
import {
  RenderAPI,
  render,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';
import { Translations } from '@/i18n/tags';

import { BASE_STORAGE_KEY, MAX_RECENT_SEARCHES } from './use-recent-searches';
import { randomPositiveNumber } from '../../../../../../../__mocks__/utils';
import { RecentSearchItem, SearchType } from '../../types';
import { RecentSearches } from './RecentSearches';

const searchTypes = Object.keys(SearchType);

const persistedItems: RecentSearchItem[] = Array(MAX_RECENT_SEARCHES)
  .fill({})
  .map((_, index) => ({
    title: `PERSISTED_ITEM_TITLE_${index}`,
    image: `PERSISTED_ITEM_IMAGE_${index}`,
    id: index,
  }));

jest.mock('@utils', () => ({
  isEqualsOrLargerThanIphoneX: jest.fn().mockReturnValue(true),
  renderSVGIconConditionally: () => <></>,
  storage: {
    set: jest.fn(),
    get: jest.fn(),
  },
}));

const utils = require('@/utils');

const renderRecentSearches = (searchType: string, onPressItem = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <RecentSearches
      onPressItem={onPressItem}
      searchType={searchType as SearchType}
    />
  </ThemeProvider>
);

describe('Common-screens/Search/RecentSearches', () => {
  const elements = {
    list: (api: RenderAPI) => api.queryByTestId('recent-searches-list'),
    title: (api: RenderAPI) => api.queryByTestId('recent-searches-title'),
    items: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-button'),
    itemsTexts: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-title'),
    removeItemButtons: (api: RenderAPI) =>
      api.queryAllByTestId('recent-searches-list-item-close-button'),
  };

  describe('Loading the items from the storage', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call the "storage.get" correctly', async () => {
      const searchType =
        searchTypes[randomPositiveNumber(searchTypes.length - 1)];
      (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
      render(renderRecentSearches(searchType));
      const storageKey = `${BASE_STORAGE_KEY}:${searchType.toString()}`;
      await waitFor(() => {
        expect(utils.storage.get).toBeCalledTimes(1);
        expect(utils.storage.get).toBeCalledWith(storageKey);
      });
    });
  });

  describe('When has "no previously-searched-items', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should not render any element', async () => {
      (utils.storage.get as jest.Mock).mockResolvedValueOnce(undefined);
      const searchType =
        searchTypes[randomPositiveNumber(searchTypes.length - 1)];
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.list(component)).toBeNull();
      });
    });
  });

  describe('When has some previous "recent-searched-items"', () => {
    describe('Rendering', () => {
      const searchType =
        searchTypes[randomPositiveNumber(searchTypes.length - 1)];

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should show the elements correctly', async () => {
        (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
        const component = render(renderRecentSearches(searchType));
        await waitFor(() => {
          expect(elements.list(component)).not.toBeNull();
        });
        expect(elements.items(component).length).toEqual(persistedItems.length);
        expect(elements.removeItemButtons(component).length).toEqual(
          persistedItems.length,
        );
      });

      it('should show the "title" correctly', async () => {
        (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
        const component = render(renderRecentSearches(searchType));
        await waitFor(() => {
          expect(elements.title(component)?.children[0]).toEqual(
            Translations.Search.SEARCH_RECENT,
          );
        });
      });

      it('should show the "items" in the correct order', async () => {
        (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
        const component = render(renderRecentSearches(searchType));
        await waitFor(() => {
          expect(elements.list(component)).not.toBeNull();
        });
        for (let i = 0; i < elements.itemsTexts(component).length; i++) {
          expect(elements.itemsTexts(component)[i].children[0]).toEqual(
            persistedItems[i].title,
          );
        }
      });
    });
  });

  describe('Removing items', () => {
    const searchType =
      searchTypes[randomPositiveNumber(searchTypes.length - 1)];

    beforeEach(() => {
      (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
      jest.clearAllMocks();
    });

    it('should "remove" the item "from the list" after removal', async () => {
      const indexItemRemoved = randomPositiveNumber(searchTypes.length - 1);
      const itemsAfterRemoval = persistedItems.filter(
        (_, index) => index !== indexItemRemoved,
      );
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.list(component)).not.toBeNull();
      });
      for (let i = 0; i < elements.itemsTexts(component).length; i++) {
        expect(elements.itemsTexts(component)[i].children[0]).toEqual(
          persistedItems[i].title,
        );
      }
      act(() => {
        fireEvent.press(
          elements.removeItemButtons(component)[indexItemRemoved],
        );
      });
      for (let i = 0; i < elements.itemsTexts(component).length; i++) {
        expect(elements.itemsTexts(component)[i].children[0]).toEqual(
          itemsAfterRemoval[i].title,
        );
      }
    });

    it('should "persist" the items correctly after removal', async () => {
      const indexItemRemoved = randomPositiveNumber(searchTypes.length - 1);
      const storageKey = `${BASE_STORAGE_KEY}:${searchType.toString()}`;
      const itemsAfterRemoval = persistedItems.filter(
        (_, index) => index !== indexItemRemoved,
      );
      const component = render(renderRecentSearches(searchType));
      await waitFor(() => {
        expect(elements.list(component)).not.toBeNull();
      });
      expect(utils.storage.set).toBeCalledTimes(0);
      fireEvent.press(elements.removeItemButtons(component)[indexItemRemoved]);
      expect(utils.storage.set).toBeCalledTimes(1);
      expect(utils.storage.set).toBeCalledWith(storageKey, itemsAfterRemoval);
    });
  });

  describe('Pressing items', () => {
    it('should call "onPress" correctly when selecting some item', async () => {
      (utils.storage.get as jest.Mock).mockResolvedValueOnce(persistedItems);
      const searchType =
        searchTypes[randomPositiveNumber(searchTypes.length - 1)];
      const onPressItem = jest.fn();
      const indexItemSelected = randomPositiveNumber(searchTypes.length - 1);
      const component = render(renderRecentSearches(searchType, onPressItem));
      await waitFor(() => {
        expect(elements.list(component)).not.toBeNull();
      });
      expect(onPressItem).toBeCalledTimes(0);
      fireEvent.press(elements.items(component)[indexItemSelected]);
      expect(onPressItem).toBeCalledTimes(1);
      expect(onPressItem).toBeCalledWith(persistedItems[indexItemSelected]);
    });
  });
});
