/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GET_ARTICLES } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import { usePaginatedQuery } from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';

const useNews = () => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [articleLanguage, setArticleLanguage] = useState<SchemaTypes.ArticleLanguage>(
    SchemaTypes.ArticleLanguage.EN,
  );
  const [articles, setArticles] = useState<SchemaTypes.GetArticles_articles_items[]>([]);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: SchemaTypes.GetArticles): boolean => {
    setArticles((previousPeople: SchemaTypes.GetArticles_articles_items[]) => [
      ...previousPeople,
      ...data.articles.items,
    ]);

    return data.articles.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    SchemaTypes.GetArticles,
    SchemaTypes.GetArticlesVariables
  >({
    onPaginationQueryError: () => {
      setError(t(TRANSLATIONS.NEWS_QUERY_BY_PAGINATION_ERROR));
      setHasPaginationError(true);
    },
    onEntryQueryError: () => {
      setError(t(TRANSLATIONS.NEWS_ENTRY_QUERY_ERROR));

      if (hasPaginationError) {
        setHasPaginationError(false);
      }
    },
    fireEntryQueryWhenMounted: false,
    variables: {
      language: articleLanguage,
    },
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: GET_ARTICLES,
  });

  const onPressFooterReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setError('');

    onPaginateQuery();
  }, []);

  useEffect(() => {
    if (error) {
      setError('');
    }

    onReloadData();
  }, [articleLanguage]);

  const onSelectArticleLanguage = useCallback(
    (language: SchemaTypes.ArticleLanguage): void => {
      if (error) {
        setError('');
      }

      setArticles([]);

      setArticleLanguage(language);
    },
    [],
  );

  const onPressTopReloadButton = useCallback(async (): Promise<void> => {
    setHasPaginationError(false);

    setError('');

    await onReloadData();
  }, []);

  return {
    onEndReached: onPaginateQuery,
    onPressFooterReloadButton,
    onPressTopReloadButton,
    onSelectArticleLanguage,
    hasPaginationError,
    articleLanguage,
    isPaginating,
    articles,
    isLoading,
    error,
    t,
  };
};

export default useNews;
