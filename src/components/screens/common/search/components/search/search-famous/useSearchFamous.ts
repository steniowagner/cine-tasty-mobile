import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import {useSearch} from '../useSearch';

type SearchResult = SchemaTypes.SearchPerson_search_items_BasePerson;

export const useSearchFamous = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const translations = useTranslations();

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

  const search = useSearch<SearchResult>({
    searchType: SchemaTypes.SearchType.PERSON,
    queryId: 'search_famous',
    searchByTextError: texts.searchByTextError,
    paginationError: texts.paginationError,
  });

  const handlePressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  return {
    onPressBottomReloadButton: search.onPressFooterReloadButton,
    beforePressItem: () => {},
    onPressTopReloadButton: search.onPressTopReloadButton,
    hasPaginationError: search.hasPaginationError,
    onEndReached: search.onEndReached,
    isPaginating: search.isPaginating,
    famous: search.dataset,
    isLoading: search.isLoading,
    error: search.error,
    placeholder: texts.searchBarPlaceholder,
    onPressClose: handlePressClose,
    navigation,
    onTypeSearchQuery: search.onTypeSearchQuery,
  };
};
