import {useCallback, useMemo} from 'react';

import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {
  useRecentSearches,
  RecentSearchItem,
} from '../components/recent-searches/useRecentSearches';
import {SearchFamousNavigationProp} from './routes/route-params-types';
import {useSearch} from '../../search/useSearch';

type UseSearchFamousParams = {
  navigation: SearchFamousNavigationProp;
};

export const useSearchFamous = (props: UseSearchFamousParams) => {
  const translations = useTranslations();
  const recentSearches = useRecentSearches({
    searchType: SchemaTypes.SearchType.PERSON,
  });

  const texts = useMemo(
    () => ({
      searchByTextError: translations.translate(
        Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
      ),
      paginationError: translations.translate(
        Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
      ),
      searchBarPlaceholder: translations.translate(
        Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER,
      ),
    }),
    [translations.translate],
  );

  const search = useSearch<Types.Famous>({
    searchType: SchemaTypes.SearchType.PERSON,
    queryId: 'search_famous',
    searchByTextError: texts.searchByTextError,
    paginationError: texts.paginationError,
  });

  const handlePressClose = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const handlePressRecentSearchedItem = useCallback(
    (item: RecentSearchItem) => {
      props.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.image,
        name: item.title,
        id: item.id,
      });
    },
    [],
  );

  const handlePressItem = useCallback(
    async (item: Types.Famous) => {
      await recentSearches.add({
        image: item.profileImage,
        title: item.name,
        id: item.id,
      });
      props.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.profileImage,
        name: item.name,
        id: item.id,
      });
    },
    [recentSearches.add],
  );

  const shouldShowBottomReloadButton = useMemo(
    () =>
      !!search.dataset.length &&
      (search.hasPaginationError || search.isPaginating),
    [search.dataset, search.hasPaginationError, search.isPaginating],
  );

  const shouldShowTopReloadButton = useMemo(
    () => !search.dataset.length && !!search.error && !search.isLoading,
    [search.dataset, search.error, search.isLoading],
  );

  return {
    shouldShowBottomReloadButton,
    shouldShowTopReloadButton,
    onPressBottomReloadButton: search.onPressFooterReloadButton,
    onPressItem: handlePressItem,
    onPressTopReloadButton: search.onPressTopReloadButton,
    hasPaginationError: search.hasPaginationError,
    onEndReached: search.onEndReached,
    isPaginating: search.isPaginating,
    famous: search.dataset,
    isLoading: search.isLoading,
    error: search.error,
    shouldShowRecentSearches: search.shouldShowRecentSearches,
    placeholder: texts.searchBarPlaceholder,
    onPressClose: handlePressClose,
    onTypeSearchQuery: search.onTypeSearchQuery,
    onPressRecentSearchedItem: handlePressRecentSearchedItem,
  };
};
