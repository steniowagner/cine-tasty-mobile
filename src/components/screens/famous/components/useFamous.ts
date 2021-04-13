/* eslint-disable camelcase */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GET_FAMOUS } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { usePaginatedQuery } from '@hooks';

const useFamous = () => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [famous, setFamous] = useState<SchemaTypes.GetFamous_people_items[]>([]);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: SchemaTypes.GetFamous): boolean => {
    setFamous((previousFamous: SchemaTypes.GetFamous_people_items[]) => [
      ...previousFamous,
      ...data.people.items,
    ]);

    return data.people.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    SchemaTypes.GetFamous,
    SchemaTypes.GetFamousVariables
  >({
    onPaginationQueryError: () => {
      setError(t(TRANSLATIONS.FAMOUS_QUERY_BY_PAGINATION_ERROR));
      setHasPaginationError(true);
    },
    onEntryQueryError: () => {
      setError(t(TRANSLATIONS.FAMOUS_ENTRY_QUERY_ERROR));

      if (hasPaginationError) {
        setHasPaginationError(false);
      }
    },
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: GET_FAMOUS,
  });

  const onPressTopReloadButton = useCallback(async (): Promise<void> => {
    setHasPaginationError(false);

    setError('');

    await onReloadData();
  }, []);

  const onPressBottomReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setError('');

    onPaginateQuery();
  }, []);

  return {
    onEndReached: onPaginateQuery,
    onPressBottomReloadButton,
    onPressTopReloadButton,
    hasPaginationError,
    isPaginating,
    isLoading,
    famous,
    error,
  };
};

export default useFamous;
