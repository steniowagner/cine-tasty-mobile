import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

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

export const useSearchFamous = () => {
  const navigation = useNavigation<SearchFamousNavigationProp>();
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
    navigation.goBack();
  }, []);

  const handleBeforePressItem = useCallback(
    async (famous: Types.Famous) =>
      recentSearches.add({
        image: famous.profileImage,
        title: famous.name,
        id: famous.id,
      }),
    [recentSearches.add],
  );

  const handlePressRecentSearchedItem = useCallback(
    (item: RecentSearchItem) => {
      navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.image,
        name: item.title,
        id: item.id,
      });
    },
    [navigation.navigate],
  );

  return {
    onPressBottomReloadButton: search.onPressFooterReloadButton,
    beforePressItem: handleBeforePressItem,
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
    navigation,
    onTypeSearchQuery: search.onTypeSearchQuery,
    onPressRecentSearchedItem: handlePressRecentSearchedItem,
  };
};
