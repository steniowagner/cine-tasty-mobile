import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GET_ARTICLES } from '@graphql/queries';
import { usePaginatedQuery } from 'hooks';
import * as TRANSLATIONS from 'i18n/tags';
import {
  GetArticles_articles_items as Article,
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from 'types/schema';

type State = {
  onSelectArticleLanguage: (language: ArticleLanguage) => void;
  onPressTopReloadButton: () => Promise<void>;
  onPressFooterReloadButton: () => void;
  articleLanguage: ArticleLanguage;
  hasPaginationError: boolean;
  t: (key: string) => string;
  onEndReached: () => void;
  isPaginating: boolean;
  articles: Article[];
  isLoading: boolean;
  error: string;
};

const useNews = (): State => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [articleLanguage, setArticleLanguage] = useState<ArticleLanguage>(
    ArticleLanguage.EN,
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: GetArticles): boolean => {
    setArticles((previousPeople: Article[]) => [
      ...previousPeople,
      ...data.articles.items,
    ]);

    return data.articles.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    GetArticles,
    GetArticlesVariables
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

  const onSelectArticleLanguage = useCallback((language: ArticleLanguage): void => {
    if (error) {
      setError('');
    }

    setArticles([]);

    setArticleLanguage(language);
  }, []);

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
