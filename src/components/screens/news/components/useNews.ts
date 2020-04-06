import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';

import {
  GetArticles_articles_items as Article,
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from '../../../../types/schema';

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
  onSelectLanguageFilter: (language: ArticleLanguage) => void;
  setIsFilterLanguageModalOpen: (value: boolean) => void;
  isFilterLanguageModalOpen: boolean;
  languageFilter: ArticleLanguage;
  onRefreshArticles: () => void;
  t: (key: string) => string;
  onEndReached: () => void;
  isPaginating: boolean;
  isRefreshing: boolean;
  articles: Article[];
  isLoading: boolean;
  error: ApolloError;
};

type LocalQueryState = {
  articles: Article[];
  hasMore: boolean;
};

const INITIAL_QUERY_STATE: LocalQueryState = {
  hasMore: true,
  articles: [],
};

const useNews = (): State => {
  const [isFilterLanguageModalOpen, setIsFilterLanguageModalOpen] = useState<boolean>(
    false,
  );
  const [languageFilter, setLanguageFilter] = useState<ArticleLanguage>(
    ArticleLanguage.EN,
  );
  const [localQueryState, setLocalQueryState] = useState<LocalQueryState>(
    INITIAL_QUERY_STATE,
  );
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const lastPaginationTimestamp = useRef(0);

  const { t } = useTranslation();

  const {
    data, error, fetchMore, refetch,
  } = useQuery<GetArticles, GetArticlesVariables>(
    GET_ARTICLES,
    {
      variables: { language: languageFilter, page: 1 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        if (!isFetchedInitialData && data && !error) {
          setLocalQueryState({
            articles: data.articles.items,
            hasMore: data.articles.hasMore,
          });

          setIsLoading(false);

          setIsFetchedInitialData(true);
        }

        if (isRefetching) setIsRefetching(false);

        if (isLoading) setIsLoading(false);

        if (isPaginating) setIsPaginating(false);
      },
    },
  );

  const onPaginateArticles = (): void => {
    if (isPaginating && localQueryState.hasMore) {
      fetchMore({
        query: GET_ARTICLES,
        variables: { language: languageFilter, page },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLocalQueryState({
            hasMore: fetchMoreResult.articles.hasMore,
            articles: [...localQueryState.articles, ...fetchMoreResult.articles.items],
          });

          return previousResult;
        },
      });
    }
  };

  const onRefetchArticles = async (): Promise<void> => {
    const refreshedArticlesQuery = await refetch({ language: languageFilter, page: 1 });

    setLocalQueryState({
      articles: refreshedArticlesQuery.data.articles.items,
      hasMore: refreshedArticlesQuery.data.articles.hasMore,
    });
  };

  const onRefreshArticles = async (): Promise<void> => {
    setIsRefetching(false);

    setPage(1);

    setIsLoading(true);

    await onRefetchArticles();

    setIsLoading(false);
  };

  const onChangeLanguageFilter = async (): Promise<void> => {
    setIsLoading(true);

    setPage(1);

    await onRefetchArticles();

    setIsLoading(false);
  };

  useEffect(() => {
    if (page > 1) {
      onPaginateArticles();
    }
  }, [page]);

  useEffect(() => {
    if (isFetchedInitialData) {
      onChangeLanguageFilter();
    }
  }, [languageFilter]);

  useEffect(() => {
    const now = new Date().getTime();

    const isEnableToPaginate = now - lastPaginationTimestamp.current >= 500;

    if (isEnableToPaginate && isPaginating) {
      lastPaginationTimestamp.current = now;
      setPage(page + 1);
    } else {
      setIsPaginating(false);
    }
  }, [isPaginating]);

  useEffect(() => {
    if (isRefetching) {
      onRefreshArticles();
    }
  }, [isRefetching]);

  const onSelectLanguageFilter = (language: ArticleLanguage): void => {
    setIsFilterLanguageModalOpen(false);
    setLanguageFilter(language);
  };

  return {
    isPaginating: isPaginating && localQueryState.hasMore,
    onRefreshArticles: () => setIsRefetching(true),
    onEndReached: () => setIsPaginating(true),
    articles: localQueryState.articles,
    setIsFilterLanguageModalOpen,
    isRefreshing: isRefetching,
    isFilterLanguageModalOpen,
    onSelectLanguageFilter,
    languageFilter,
    isLoading,
    error,
    t,
  };
};

export default useNews;
