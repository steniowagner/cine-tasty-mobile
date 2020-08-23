import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  persistItemInStorage,
  getItemFromStorage,
} from 'utils/async-storage-adapter/AsyncStorageAdapter';
import { SearchType } from 'types/schema';
import { SearchItem } from 'types';

type State = {
  persistItemToRecentSearches: (item: SearchItem) => void;
  onRemoveItem: (item: SearchItem) => void;
  t: (key: string) => string;
  recentSearches: SearchItem[];
};

export const STORAGE_SEARCH_SECTION = 'RECENT-SEARCHES';

type Props = {
  shouldSkipGetInitialRecentSearches: boolean;
  searchType: SearchType;
};

const useRecentSearches = ({
  shouldSkipGetInitialRecentSearches,
  searchType,
}: Props): State => {
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);

  const STORAGE_KEY = useMemo(
    () => `${STORAGE_SEARCH_SECTION}:${searchType.toString()}`,
    [searchType],
  );

  const { t } = useTranslation();

  const getRecentSearches = useCallback(async () => {
    const recentSearchesFromStorage = await getItemFromStorage<[], SearchItem[]>(
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

  const onRemoveItem = useCallback(async (recentSearch: SearchItem) => {
    const recentSearchesFromStorage = await getItemFromStorage<[], SearchItem[]>(
      STORAGE_KEY,
      [],
    );

    const recentSearchesUpdated = recentSearchesFromStorage.filter(
      (recentSearchFromStorage: SearchItem) => recentSearchFromStorage.id !== recentSearch.id,
    );

    setRecentSearches(recentSearchesUpdated);

    await persistItemInStorage(STORAGE_KEY, recentSearchesUpdated);
  }, []);

  const persistItemToRecentSearches = useCallback(async (item: SearchItem) => {
    const recentSearchesFromStorage = await getItemFromStorage<[], SearchItem[]>(
      STORAGE_KEY,
      [],
    );

    const recentSearchesUpdated = [item, ...recentSearchesFromStorage.slice(0, 4)];

    await persistItemInStorage(STORAGE_KEY, recentSearchesUpdated);
  }, []);

  return {
    persistItemToRecentSearches,
    recentSearches,
    onRemoveItem,
    t,
  };
};

export default useRecentSearches;
