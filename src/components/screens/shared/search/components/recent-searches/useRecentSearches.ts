import {useCallback, useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import * as storage from '@utils/storage';

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

  const {t} = useTranslation();

  const STORAGE_KEY = useMemo(
    () => `${STORAGE_SEARCH_SECTION}:${searchType.toString()}`,
    [searchType],
  );

  const getRecentSearches = useCallback(async () => {
    const recentSearchesFromStorage = await storage.get<[], ResentSearchItem[]>(
      STORAGE_KEY,
      [],
    );
    setRecentSearches(recentSearchesFromStorage);
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (!shouldSkipGetInitialRecentSearches) {
      getRecentSearches();
    }
  }, [getRecentSearches, searchType, shouldSkipGetInitialRecentSearches]);

  const onRemoveItem = useCallback(
    async (recentSearch: ResentSearchItem) => {
      const recentSearchesFromStorage = await storage.get<
        [],
        ResentSearchItem[]
      >(STORAGE_KEY, []);
      const recentSearchesUpdated = recentSearchesFromStorage.filter(
        (recentSearchFromStorage: ResentSearchItem) =>
          recentSearchFromStorage.id !== recentSearch.id,
      );
      setRecentSearches(recentSearchesUpdated);
      await storage.set(STORAGE_KEY, recentSearchesUpdated);
    },
    [STORAGE_KEY],
  );

  const persistItemToRecentSearches = useCallback(
    async (item: ResentSearchItem) => {
      let recentSearchesUpdated = [];
      const recentSearchesFromStorage = await storage.get<
        ResentSearchItem[],
        ResentSearchItem[]
      >(STORAGE_KEY, []);
      const isItemAlreadyPersisted = recentSearchesFromStorage.some(
        recentSearcheFromStorage => recentSearcheFromStorage.id === item.id,
      );

      if (isItemAlreadyPersisted) {
        recentSearchesUpdated = recentSearchesFromStorage.filter(
          recentSearchFromStorage => recentSearchFromStorage.id !== item.id,
        );
      }

      if (!isItemAlreadyPersisted) {
        recentSearchesUpdated = recentSearchesFromStorage.slice(0, 4);
      }

      await storage.set(STORAGE_KEY, [item, ...recentSearchesUpdated]);
    },
    [STORAGE_KEY],
  );

  return {
    persistItemToRecentSearches,
    recentSearches,
    onRemoveItem,
    t,
  };
};

export default useRecentSearches;
