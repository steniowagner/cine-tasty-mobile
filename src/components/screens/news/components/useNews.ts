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

export const I18N_QUERY_BY_PAGINATION_ERROR_REF = 'translations:news:i18nQueryByPaginationErrorRef';
export const I18N_ENTRY_QUERY_ERROR_REF = 'translations:news:i18EntryQueryErrorRef';

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
