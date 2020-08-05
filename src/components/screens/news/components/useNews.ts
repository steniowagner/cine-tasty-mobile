import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gql from 'graphql-tag';

import { usePaginatedQuery } from 'hooks';
import {
  GetArticles_articles_items as Article,
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from 'types/schema';

export const I18N_ENTRY_QUERY_ERROR_REF = 'translations:news:i18EntryQueryErrorRef';
export const I18N_QUERY_BY_PAGINATION_ERROR_REF = 'i18nQueryByPaginationErrorRef';

export const GET_ARTICLES = gql`
  query GetArticles($page: Int!, $language: ArticleLanguage!) {
    articles(page: $page, language: $language) {
      items {
        publishedAt
        content
        source
        author
        title
        image
        url
        id
      }
      hasMore
    }
  }
`;

type State = {
  onSelectArticleLanguage: (language: ArticleLanguage) => void;
  setIsFilterLanguageModalOpen: (value: boolean) => void;
  onPressTopReloadButton: () => Promise<void>;
  onPressFooterReloadButton: () => void;
  isFilterLanguageModalOpen: boolean;
  articleLanguage: ArticleLanguage;
  onPullRefreshControl: () => void;
  hasPaginationError: boolean;
  t: (key: string) => string;
  onEndReached: () => void;
  isPaginating: boolean;
  isRefreshing: boolean;
  articles: Article[];
  isLoading: boolean;
  error: string;
};

const useNews = (): State => {
  const [isFilterLanguageModalOpen, setIsFilterLanguageModalOpen] = useState<boolean>(
    false,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [articleLanguage, setArticleLanguage] = useState<ArticleLanguage>(
    ArticleLanguage.EN,
  );
  const [isRefreshing, setIsRefrehing] = useState<boolean>(false);
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
      setError(t(I18N_QUERY_BY_PAGINATION_ERROR_REF));
      setHasPaginationError(true);
    },
    onEntryQueryError: () => {
      setError(t(I18N_ENTRY_QUERY_ERROR_REF));

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

  const handleRefreshQuery = useCallback(async () => {
    if (error) {
      setError('');
    }

    setArticles([]);

    await onReloadData();

    setIsRefrehing(false);
  }, [error]);

  useEffect(() => {
    if (isRefreshing) {
      handleRefreshQuery();
    }
  }, [isRefreshing]);

  useEffect(() => {
    if (error) {
      setError('');
    }

    onReloadData();
  }, [articleLanguage]);

  const onSelectArticleLanguage = useCallback((language: ArticleLanguage): void => {
    setIsFilterLanguageModalOpen(false);

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
    onPullRefreshControl: () => setIsRefrehing(true),
    onEndReached: onPaginateQuery,
    setIsFilterLanguageModalOpen,
    onPressFooterReloadButton,
    isFilterLanguageModalOpen,
    onPressTopReloadButton,
    onSelectArticleLanguage,
    hasPaginationError,
    articleLanguage,
    isPaginating,
    isRefreshing,
    articles,
    isLoading,
    error,
    t,
  };
};

export default useNews;
