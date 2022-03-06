import {useCallback, useMemo} from 'react';

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
    skipFirstRun: false,
    query: GET_FAMOUS,
  });

  const onPressHeaderIconButton = useCallback(() => {
    props.navigation.navigate(Routes.Search.SEARCH_STACK, {
      paginationError: translations.translate(
        Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
      ),
      placeholder: translations.translate(
        Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER,
      ),
      searchByTextError: translations.translate(
        Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
      ),
      searchType: SchemaTypes.SearchType.PERSON,
      queryId: 'search_famous',
    });
  }, [translations.translate]);

  const dataset = useMemo(
    () =>
      pagination.dataset.map(famous => ({
        profileImage: famous.profilePath,
        name: famous.name,
        id: famous.id,
      })),
    [pagination.dataset],
  );

  return {
    hasPaginationError: pagination.hasPaginationError,
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    isPaginating: pagination.isPaginating,
    onEndReached: pagination.paginate,
    isLoading: pagination.isLoading,
    error: pagination.error,
    onPressHeaderIconButton,
    dataset,
  };
};

export default useFamous;
