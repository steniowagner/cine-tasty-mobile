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
  onPressHeaderArticleLanguageButton: (value: boolean) => void;
  onCloseArticleLanguageModal: () => void;
  isFilterLanguageModalOpen: boolean;
  articleLanguage: ArticleLanguage;
  onPullRefreshControl: () => void;
  onPressReloadButton: () => void;
  hasPaginationError: boolean;
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

  const { onPaginateQuery, onReloadData, isPaginating, isLoading } = usePaginatedQuery<
    GetArticles,
    GetArticlesVariables
  >({
    onPaginationQueryError: () =>
      setError(t('translations:news:i18nQueryByPaginationErrorRef')),
    onEntryQueryError: () => setError(t('translations:news:i18EntryQueryErrorRef')),
    variables: {
      language: articleLanguage,
    },
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: GET_ARTICLES,
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

    setArticles([]);

    await onReloadData();

    setIsRefrehing(false);
  }, [onReloadData, error]);

  useEffect(() => {
    if (isRefreshing) {
      handleRefreshQuery();
    }
  }, [isRefreshing]);

  const onSelectArticleLanguage = useCallback((language: ArticleLanguage): void => {
    setIsFilterLanguageModalOpen(false);
    setArticleLanguage(language);
  }, []);

  return {
    onPressHeaderArticleLanguageButton: () => setIsFilterLanguageModalOpen(true),
    onCloseArticleLanguageModal: () => setIsFilterLanguageModalOpen(false),
    onSelectArticleLanguage,

    isFilterLanguageModalOpen: boolean;
    articleLanguage: ArticleLanguage;
    onPullRefreshControl: () => void;
    onPressReloadButton: () => void;
    hasPaginationError: boolean;
    onEndReached: () => void;
    isPaginating: boolean;
    isRefreshing: boolean;
    articles: Article[];
    isLoading: boolean;
    error: string;

    onPressArticleLanguageButton: () => setIsFilterLanguageModalOpen(true),
    onPullRefreshControl: () => setIsRefrehing(true),
    onEndReached: onPaginateQuery,
    setIsFilterLanguageModalOpen,
    isFilterLanguageModalOpen,
    onSelectArticleLanguage,
    onPressReloadButton,
    hasPaginationError,
    articleLanguage,
    isRefreshing,
    isPaginating,
    isLoading,
    articles,
    error,
  };
};

export default useNews;
