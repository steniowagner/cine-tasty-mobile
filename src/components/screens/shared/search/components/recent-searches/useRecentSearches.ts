import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  persistItemInStorage,
  getItemFromStorage,
} from '@utils/async-storage-adapter/AsyncStorageAdapter';
import * as SchemaTypes from '@schema-types';

export const STORAGE_SEARCH_SECTION = 'RECENT-SEARCHES';

type ResentSearchItem = {
  image: string;
  title: string;
  id: number;
};

type UseRecentSearchesProps = {
  shouldSkipGetInitialRecentSearches: boolean;
  searchType: SchemaTypes.SearchType;
};

const useRecentSearches = ({
  shouldSkipGetInitialRecentSearches,
  searchType,
}: UseRecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<ResentSearchItem[]>([]);

  const STORAGE_KEY = useMemo(
    () => `${STORAGE_SEARCH_SECTION}:${searchType.toString()}`,
    [searchType],
  );

  const { t } = useTranslation();

  const getRecentSearches = useCallback(async () => {
    const recentSearchesFromStorage = await getItemFromStorage<[], ResentSearchItem[]>(
      STORAGE_KEY,
      [],
    );

    setRecentSearches(recentSearchesFromStorage);
  }, []);

  useEffect(() => {
    if (!shouldSkipGetInitialRecentSearches) {
      getRecentSearches();
    }
  }, [searchType]);

  const onRemoveItem = useCallback(async (recentSearch: ResentSearchItem) => {
    const recentSearchesFromStorage = await getItemFromStorage<[], ResentSearchItem[]>(
      STORAGE_KEY,
      [],
    );

    const recentSearchesUpdated = recentSearchesFromStorage.filter(
      (recentSearchFromStorage: ResentSearchItem) => recentSearchFromStorage.id !== recentSearch.id,
    );

    setRecentSearches(recentSearchesUpdated);

    await persistItemInStorage(STORAGE_KEY, recentSearchesUpdated);
  }, []);

  const persistItemToRecentSearches = useCallback(async (item: ResentSearchItem) => {
    const recentSearchesFromStorage = await getItemFromStorage<
      ResentSearchItem[],
      ResentSearchItem[]
    >(STORAGE_KEY, []);

    let recentSearchesUpdated = [];

    const isItemAlreadyPersisted = recentSearchesFromStorage.some(
      (recentSearcheFromStorage) => recentSearcheFromStorage.id === item.id,
    );

    if (isItemAlreadyPersisted) {
      recentSearchesUpdated = recentSearchesFromStorage.filter(
        (recentSearchFromStorage) => recentSearchFromStorage.id !== item.id,
      );
    }

    if (!isItemAlreadyPersisted) {
      recentSearchesUpdated = recentSearchesFromStorage.slice(0, 4);
    }

    await persistItemInStorage(STORAGE_KEY, [item, ...recentSearchesUpdated]);
  }, []);

  return {
    persistItemToRecentSearches,
    data: recentSearches,
    onRemoveItem,
    t,
  };
};

export default useRecentSearches;
