import {useCallback, useMemo} from 'react';

import {useTranslations, usePagination} from '@hooks';
import * as SchemaTypes from '@schema-types';
import {GET_FAMOUS} from '@graphql/queries';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {FamousNavigationProp} from '../routes/route-params-types';

type UseFamousProps = {
  navigation: FamousNavigationProp;
};

export const useFamous = (props: UseFamousProps) => {
  const translations = useTranslations();

  const handleOnGetData = useCallback(
    (result: SchemaTypes.GetFamous) => ({
      hasMore: result?.people.hasMore || false,
      dataset: result?.people.items || [],
    }),
    [],
  );

  const texts = useMemo(
    () => ({
      errors: {
        pagination: translations.translate(
          Translations.Tags.FAMOUS_QUERY_BY_PAGINATION_ERROR,
        ),
        entryQuery: translations.translate(
          Translations.Tags.FAMOUS_ENTRY_QUERY_ERROR,
        ),
        queryByText: translations.translate(
          Translations.Tags.FAMOUS_QUERY_BY_TEXT_ERROR,
        ),
      },
      searchBarPlaceholder: translations.translate(
        Translations.Tags.FAMOUS_SEARCHBAR_PLACEHOLDER,
      ),
    }),
    [translations.translate],
  );

  const pagination = usePagination<
    SchemaTypes.GetFamous,
    SchemaTypes.GetFamous_people_items,
    SchemaTypes.GetFamousVariables
  >({
    paginationError: texts.errors.pagination,
    entryQueryError: texts.errors.entryQuery,
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    skipFirstRun: false,
    query: GET_FAMOUS,
  });

  const handlePressHeaderIconButton = useCallback(() => {
    props.navigation.navigate(Routes.Famous.SEARCH);
  }, []);

  const dataset = useMemo(
    () =>
      pagination.dataset.map(famous => ({
        profileImage: famous.profilePath,
        name: famous.name,
        id: famous.id,
      })),
    [pagination.dataset],
  );

  const shouldShowTopReloadButton = useMemo(
    () => !dataset.length && !!pagination.error && !pagination.isLoading,
    [dataset, pagination.error, pagination.isLoading],
  );

  const shouldShowBottomReloadButton = useMemo(
    () =>
      !!dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    [dataset, pagination.hasPaginationError, pagination.isPaginating],
  );

  const handlePressFamousListItem = useCallback((famous: Types.Famous) => {
    props.navigation.navigate(Routes.Famous.DETAILS, famous);
  }, []);

  return {
    shouldShowTopReloadButton,
    shouldShowBottomReloadButton,
    onPressHeaderIconButton: handlePressHeaderIconButton,
    hasPaginationError: pagination.hasPaginationError,
    onPressBottomReloadButton: pagination.paginate,
    onPressFamousListItem: handlePressFamousListItem,
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    isPaginating: pagination.isPaginating,
    onEndReached: pagination.paginate,
    isLoading: pagination.isLoading,
    error: pagination.error,
    dataset,
    texts,
  };
};
