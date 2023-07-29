import {useCallback, useState, useMemo, useEffect} from 'react';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {CONSTANTS, storage} from '@utils';

const MAX_RECENT_SEARCHES = 3;

export type RecentSearchItem = {
  image: string;
  title: string;
  id: number;
};

export type UseRecentSearchesProps = {
  searchType: SchemaTypes.SearchType;
};

export const useRecentSearches = (props: UseRecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<
    RecentSearchItem[] | undefined
  >();

  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      recentSearches: translations.translate(Translations.Tags.SEARCH_RECENT),
    }),
    [translations.language],
  );

  const STORAGE_KEY = useMemo(
    () =>
      `${
        CONSTANTS.KEYS.APP_STORAGE_KEY
      }:RECENT_SEARCHES:${props.searchType.toString()}`,
    [props.searchType],
  );

  const addExistingItem = useCallback(
    async (
      currentRecentSearches: RecentSearchItem[],
      item: RecentSearchItem,
    ) => {
      const recentSearchesWithoutItem = currentRecentSearches.filter(
        persistedItem => persistedItem.id !== item.id,
      );
      const recentSearchesUpdated = [item, ...recentSearchesWithoutItem].slice(
        0,
        MAX_RECENT_SEARCHES,
      );
      await storage.set(STORAGE_KEY, recentSearchesUpdated);
    },
    [STORAGE_KEY],
  );

  const addNewItem = useCallback(
    async (
      currentRecentSearches: RecentSearchItem[],
      item: RecentSearchItem,
    ) => {
      const recentSearchesUpdated = [item, ...currentRecentSearches].slice(
        0,
        MAX_RECENT_SEARCHES,
      );
      await storage.set(STORAGE_KEY, recentSearchesUpdated);
    },
    [STORAGE_KEY],
  );

  const add = useCallback(
    async (item: RecentSearchItem) => {
      const recentSearchesFromStorage = await storage.get<
        RecentSearchItem[],
        RecentSearchItem[]
      >(STORAGE_KEY, []);
      const isItemSearchedBefore = recentSearchesFromStorage.some(
        recentSearchItem => recentSearchItem.id === item.id,
      );
      const handler = isItemSearchedBefore ? addExistingItem : addNewItem;
      await handler(recentSearchesFromStorage, item);
    },
    [addExistingItem, addNewItem],
  );

  const load = useCallback(async () => {
    const recentSearchesFromStorage = await storage.get<
      RecentSearchItem[],
      RecentSearchItem[]
    >(STORAGE_KEY, []);
    setRecentSearches(recentSearchesFromStorage);
  }, [STORAGE_KEY]);

  const remove = useCallback((itemId: number) => {
    setRecentSearches(pastRecentSearches =>
      pastRecentSearches.filter(
        pastRecentSearch => pastRecentSearch.id !== itemId,
      ),
    );
  }, []);

  useEffect(() => {
    if (Array.isArray(recentSearches)) {
      storage.set(STORAGE_KEY, recentSearches);
    }
  }, [recentSearches]);

  return {
    items: recentSearches || [],
    remove,
    add,
    texts,
    load,
  };
};
