import {useCallback} from 'react';
import {ApolloQueryResult, DocumentNode} from '@apollo/client';

import {useImperativeQuery, useTranslations} from '@hooks';
import * as SchemaTypes from '@schema-types';

type Variables = {
  language: SchemaTypes.ISO6391Language;
  page: number;
};

type UseFetchMediaTrendingProps<TResult> = {
  onCompleted: (data: TResult) => void;
  query: DocumentNode;
};

export const useFetchMediaTrending = <TResult>(
  props: UseFetchMediaTrendingProps<TResult>,
) => {
  const translations = useTranslations();

  const handleOnCompleted = useCallback(
    (result: ApolloQueryResult<TResult>) => {
      props.onCompleted(result.data);
    },
    [props.onCompleted],
  );

  const imperativeQuery = useImperativeQuery<TResult, Variables>({
    fetchPolicy: 'network-only',
    onCompleted: handleOnCompleted,
    query: props.query,
  });

  const exec = useCallback(() => {
    imperativeQuery.exec({
      language: translations.language,
      page: 1,
    });
  }, [translations.language, imperativeQuery]);

  return {
    hasError: imperativeQuery.hasError,
    isLoading: imperativeQuery.isLoading,
    exec,
  };
};
