import { useCallback, useState, useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';
import { storage } from '@utils';

import { SearchType, SearchItem } from '../../types';

export const BASE_STORAGE_KEY = 'RECENT_SEARCHES';
export const MAX_RECENT_SEARCHES = 3;

type UseRecentSearchesProps = {
  searchType: SearchType;
};

export const useRecentSearches = (props: UseRecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);

  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      recentSearches: translation.translate(Translations.Search.SEARCH_RECENT),
    }),
    [translation.translate],
  );

  const storageKey = useMemo(
    () => `${BASE_STORAGE_KEY}:${props.searchType.toString()}`,
    [props.searchType],
  );

  const add = useCallback(
    async (item: SearchItem) => {
      const recentSearchesFromStorage = await storage.get<SearchItem[]>(
        storageKey,
      );
      if (!recentSearchesFromStorage) {
        return await storage.set(storageKey, [item]);
      }
      let recentSearchesUpdated = [item, ...recentSearchesFromStorage];
      const isItemSearchedBefore = recentSearches.some(
        recentSearch => recentSearch.id === item.id,
      );
      if (isItemSearchedBefore) {
        recentSearchesUpdated = [
          item,
          ...recentSearches.filter(
            persistedItem => persistedItem.id !== item.id,
          ),
        ];
      }
      const recentSearchesUpdatedSliced = recentSearchesUpdated.slice(
        0,
        MAX_RECENT_SEARCHES,
      );
      await storage.set(storageKey, recentSearchesUpdatedSliced);
    },
    [recentSearches, storageKey],
  );

  const load = useCallback(async () => {
    const recentSearchesFromStorage = await storage.get<SearchItem[]>(
      storageKey,
    );
    if (recentSearchesFromStorage) {
      setRecentSearches(recentSearchesFromStorage);
    }
  }, [storageKey]);

  const remove = useCallback(
    async (id: number) => {
      const recentSearchesUpdated = recentSearches.filter(
        recentSearch => recentSearch.id !== id,
      );
      setRecentSearches(recentSearchesUpdated);
      await storage.set(storageKey, recentSearchesUpdated);
    },
    [recentSearches],
  );

  return {
    items: recentSearches,
    load,
    remove,
    add,
    texts,
  };
};
