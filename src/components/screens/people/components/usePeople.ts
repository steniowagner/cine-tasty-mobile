import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gql from 'graphql-tag';

import {
  GetPeople_people_items as GetPeoplePeopleItems,
  GetPeopleVariables,
  GetPeople,
} from 'types/schema';
import { usePaginatedQuery } from 'hooks';

type State = {
  onPullRefreshControl: () => void;
  onPressReloadButton: () => void;
  people: GetPeoplePeopleItems[];
  hasPaginationError: boolean;
  onEndReached: () => void;
  isPaginating: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string;
};

export const GET_PEOPLE = gql`
  query GetPeople($page: Int!) {
    people(page: $page) {
      hasMore
      items {
        profilePath
        name
        id
      }
    }
  }
`;

const usePeople = (): State => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [people, setPeople] = useState<GetPeoplePeopleItems[]>([]);
  const [isRefreshing, setIsRefrehing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: GetPeople): boolean => {
    setPeople((previousPeople: GetPeoplePeopleItems[]) => [
      ...previousPeople,
      ...data.people.items,
    ]);

    return data.people.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    GetPeople,
    GetPeopleVariables
  >({
    onPaginationQueryError: () => setError(t('translations:people:i18nQueryByPaginationErrorRef')),
    onEntryQueryError: () => setError(t('translations:people:i18EntryQueryErrorRef')),
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: GET_PEOPLE,
  });

  const onPressReloadButton = useCallback(() => {
    setHasPaginationError(false);

    if (error) {
      setError('');
    }

    onPaginateQuery();
  }, []);

  const handleRefreshQuery = useCallback(async () => {
    if (error) {
      setError('');
    }

    setPeople([]);

    await onReloadData();

    setIsRefrehing(false);
  }, [onReloadData, error]);

  useEffect(() => {
    if (isRefreshing) {
      handleRefreshQuery();
    }
  }, [isRefreshing]);

  return {
    onPullRefreshControl: () => setIsRefrehing(true),
    onEndReached: onPaginateQuery,
    onPressReloadButton,
    hasPaginationError,
    isRefreshing,
    isPaginating,
    isLoading,
    people,
    error,
  };
};

export default usePeople;
