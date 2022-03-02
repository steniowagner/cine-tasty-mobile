import {useCallback} from 'react';

import {useTranslations, usePagination} from '@hooks';
import * as SchemaTypes from '@schema-types';
import {GET_FAMOUS} from '@graphql/queries';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';

import {FamousNavigationProp} from '../routes/route-params-types';

type UseFamousProps = {
  navigation: FamousNavigationProp;
};

const useFamous = (props: UseFamousProps) => {
  const translations = useTranslations();

  const handleOnGetData = useCallback(
    (result: SchemaTypes.GetFamous) => ({
      hasMore: result?.people.hasMore || false,
      dataset: result?.people.items || [],
    }),
    [],
  );

  const pagination = usePagination<
    SchemaTypes.GetFamous,
    SchemaTypes.GetFamous_people_items,
    SchemaTypes.GetFamousVariables
  >({
    paginationError: translations.translate(
      Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
    ),
    entryQueryError: translations.translate(
      Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
    ),
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    fireWhenMounted: true,
    query: GET_FAMOUS,
  });

  const onPressHeaderIconButton = useCallback(() => {
    props.navigation.navigate(Routes.Search.SEARCH_STACK, {
      i18nQueryByPaginationErrorRef:
        Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
      i18nSearchBarPlaceholderRef:
        Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER,
      i18nQueryByTextErrorRef: Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
      searchType: SchemaTypes.SearchType.PERSON,
      queryId: 'search_famous',
    });
  }, []);

  return {
    hasPaginationError: pagination.hasPaginationError,
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    isPaginating: pagination.isPaginating,
    onEndReached: pagination.paginate,
    isLoading: pagination.isLoading,
    dataset: pagination.dataset,
    error: pagination.error,
    onPressHeaderIconButton,
  };
};

export default useFamous;
