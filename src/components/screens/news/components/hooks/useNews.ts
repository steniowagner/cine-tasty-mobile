import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';

import {
  GetArticles_articles_items as Article,
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from 'types/schema';

import useFetchFromFirstPage from './useFetchFromFirstPage';
import usePaginateArticles from './usePaginateArticles';
import useRefreshArticles from './useRefreshArticles';

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
  onPressFooterLoadMoreButton: () => void;
  shouldRendeListFooterComponent: boolean;
  isFooterLoadMoreButtonVisible: boolean;
  onPressReloadErrorButton: () => void;
  isFilterLanguageModalOpen: boolean;
  languageFilter: ArticleLanguage;
  onRefreshArticles: () => void;
  onHidePopupError: () => void;
  t: (key: string) => string;
  popupErrorMessage: string;
  error: ApolloError | null;
  onEndReached: () => void;
  isPaginating: boolean;
  isRefreshing: boolean;
  articles: Article[];
  isLoading: boolean;
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
  const [isFooterLoadMoreButtonVisible, setIsFooterLoadMoreButtonVisible] = useState<
    boolean
  >(false);
  const [
    fetchFromFirstPageError,
    setFetchFromFirstPageError,
  ] = useState<ApolloError | null>(null);
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(false);
  const [popupErrorMessage, setPopupErrorMessage] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const { t } = useTranslation();

  const restartErrorsAndLoadings = () => {
    if (isRefreshing) setIsRefreshing(false);

    if (isLoading) setIsLoading(false);

    if (isPaginating) setIsPaginating(false);

    if (fetchFromFirstPageError) setFetchFromFirstPageError(null);
  };

  const {
    data, error, fetchMore, refetch,
  } = useQuery<GetArticles, GetArticlesVariables>(
    GET_ARTICLES,
    {
      variables: { language: languageFilter, page: 1 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      onError: () => {
        restartErrorsAndLoadings();
      },
      onCompleted: () => {
        if (!isFetchedInitialData && data && !error) {
          setLocalQueryState({
            articles: data.articles.items,
            hasMore: data.articles.hasMore,
          });

          setIsFetchedInitialData(true);
        }

        restartErrorsAndLoadings();
      },
    },
  );

  useRefreshArticles({
    setError: (err: string) => setPopupErrorMessage(t(err)),
    setIsFooterLoadMoreButtonVisible,
    isFooterLoadMoreButtonVisible,
    language: languageFilter,
    restartErrorsAndLoadings,
    query: GET_ARTICLES,
    setLocalQueryState,
    isRefreshing,
    fetchMore,
    setPage,
  });

  const { fetchFromFirstPage } = useFetchFromFirstPage({
    setFetchFromFirstPageError,
    language: languageFilter,
    isFetchedInitialData,
    setLocalQueryState,
    setIsLoading,
    refetch,
    setPage,
  });

  usePaginateArticles({
    setError: (err: string) => setPopupErrorMessage(t(err)),
    setIsFooterLoadMoreButtonVisible,
    isFooterLoadMoreButtonVisible,
    restartErrorsAndLoadings,
    language: languageFilter,
    query: GET_ARTICLES,
    setLocalQueryState,
    localQueryState,
    setIsPaginating,
    isPaginating,
    fetchMore,
    setPage,
    page,
  });

  const onSelectLanguageFilter = (language: ArticleLanguage): void => {
    setIsFilterLanguageModalOpen(false);
    setLanguageFilter(language);
  };

  return {
    shouldRendeListFooterComponent:
      !!localQueryState.articles.length && localQueryState.hasMore,
    onEndReached: () => !popupErrorMessage && setIsPaginating(true),
    onPressFooterLoadMoreButton: () => setIsPaginating(true),
    isPaginating: isPaginating && localQueryState.hasMore,
    onPressReloadErrorButton: () => fetchFromFirstPage(),
    onHidePopupError: () => setPopupErrorMessage(''),
    onRefreshArticles: () => setIsRefreshing(true),
    error: fetchFromFirstPageError || error,
    articles: localQueryState.articles,
    isFooterLoadMoreButtonVisible,
    setIsFilterLanguageModalOpen,
    isFilterLanguageModalOpen,
    onSelectLanguageFilter,
    popupErrorMessage,
    languageFilter,
    isRefreshing,
    isLoading,
    t,
  };
};

export default useNews;
