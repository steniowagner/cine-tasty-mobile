import {useCallback, useEffect, useState, useMemo} from 'react';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';
import {storage} from '@utils';

import useNavigateProperScreenDetails from './useNavigateProperScreenDetails';

export const STORAGE_SEARCH_SECTION = 'RECENT-SEARCHES';
export const MAX_RECENT_SEARCHES = 3;

type UseRecentSearchesProps = {
  shouldSkipGetInitialRecentSearches: boolean;
  searchType: SchemaTypes.SearchType;
};

export const useRecentSearches = (props: UseRecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<
    Types.ResentSearchItem[]
  >([]);

  const navigateProperScreenDetails = useNavigateProperScreenDetails({
    searchType: props.searchType,
  });
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      searchRecent: translations.translate(Translations.Tags.SEARCH_RECENT),
    }),
    [translations.language],
  );

  const STORAGE_KEY = useMemo(
    () => `${STORAGE_SEARCH_SECTION}:${props.searchType.toString()}`,
    [props.searchType],
  );

  const remove = useCallback(
    async (recentSearch: Types.ResentSearchItem) => {
      const recentSearchesFromStorage = await storage.get<
        [],
        Types.ResentSearchItem[]
      >(STORAGE_KEY, []);
      const recentSearchesUpdated = recentSearchesFromStorage.filter(
        (recentSearchFromStorage: Types.ResentSearchItem) =>
          recentSearchFromStorage.id !== recentSearch.id,
      );
      setRecentSearches(recentSearchesUpdated);
      await storage.set(STORAGE_KEY, recentSearchesUpdated);
    },
    [STORAGE_KEY],
  );

  const datasetItemRemoved = useCallback(
    (
      item: Types.ResentSearchItem,
      recentSearchesDataset: Types.ResentSearchItem[],
    ) =>
      recentSearchesDataset.filter(
        recentSearchFromStorage => recentSearchFromStorage.id !== item.id,
      ),
    [],
  );

  const datasetMaxRecentSearches = useCallback(
    (recentSearchesDataset: Types.ResentSearchItem[]) =>
      recentSearchesDataset.slice(0, MAX_RECENT_SEARCHES),
    [],
  );

  const checkIsItemAlreadyPersisted = useCallback(
    (
      item: Types.ResentSearchItem,
      recentSearchesDataset: Types.ResentSearchItem[],
    ) =>
      recentSearchesDataset.some(
        recentSearchItem => recentSearchItem.id === item.id,
      ),
    [],
  );

  const add = useCallback(
    async (item: Types.ResentSearchItem) => {
      const recentSearchesFromStorage = await storage.get<
        Types.ResentSearchItem[],
        Types.ResentSearchItem[]
      >(STORAGE_KEY, []);
      const isItemAlreadyPersisted = checkIsItemAlreadyPersisted(
        item,
        recentSearchesFromStorage,
      );
      const recentSearchesUpdated = isItemAlreadyPersisted
        ? datasetItemRemoved(item, recentSearchesFromStorage)
        : datasetMaxRecentSearches(recentSearchesFromStorage);
      await storage.set(STORAGE_KEY, [item, ...recentSearchesUpdated]);
    },
    [STORAGE_KEY],
  );

  const getRecentSearches = useCallback(async () => {
    const recentSearchesFromStorage = await storage.get<
      [],
      Types.ResentSearchItem[]
    >(STORAGE_KEY, []);
    setRecentSearches(recentSearchesFromStorage);
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (props.shouldSkipGetInitialRecentSearches) {
      return;
    }
    getRecentSearches();
  }, []);

  return {
    onPressItem: navigateProperScreenDetails.navigate,
    items: recentSearches,
    remove,
    texts,
    add,
  };
};
