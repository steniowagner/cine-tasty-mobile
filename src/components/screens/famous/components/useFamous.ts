import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GetFamous_people_items as GetFamousItems,
  GetFamousVariables,
  GetFamous,
} from 'types/schema';
import { GET_FAMOUS } from '@graphql/queries';
import { usePaginatedQuery } from 'hooks';

type State = {
  onPressTopReloadButton: () => Promise<void>;
  onPressBottomReloadButton: () => void;
  hasPaginationError: boolean;
  famous: GetFamousItems[];
  onEndReached: () => void;
  isPaginating: boolean;
  isLoading: boolean;
  error: string;
};

export const I18N_QUERY_BY_PAGINATION_ERROR_REF = 'translations:famous:i18nQueryByPaginationErrorRef';
export const I18N_ENTRY_QUERY_ERROR_REF = 'translations:famous:i18EntryQueryErrorRef';

const useFamous = (): State => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [famous, setFamous] = useState<GetFamousItems[]>([]);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: GetFamous): boolean => {
    setFamous((previousFamous: GetFamousItems[]) => [
      ...previousFamous,
      ...data.people.items,
    ]);

    return data.people.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    GetFamous,
    GetFamousVariables
  >({
    onPaginationQueryError: () => {
      setError(t(I18N_QUERY_BY_PAGINATION_ERROR_REF));
      setHasPaginationError(true);
    },
    onEntryQueryError: () => {
      setError(t(I18N_ENTRY_QUERY_ERROR_REF));

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
