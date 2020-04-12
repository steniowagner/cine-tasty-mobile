import { useEffect, useRef } from 'react';
import { DocumentNode } from 'graphql';

import {
  GetArticles_articles_items as Article,
  ArticleLanguage,
} from '../../../../../types/schema';
import { FetchMoreArticles } from '../../../../../types';

type LocalQueryState = {
  articles: Article[];
  hasMore: boolean;
};

type Props = {
  setIsFooterLoadMoreButtonVisible: (isFooterLoadMoreButtonVisible: boolean) => void;
  setLocalQueryState: (localQueryState: LocalQueryState) => void;
  setIsPaginating: (isPaginating: boolean) => void;
  isFooterLoadMoreButtonVisible: boolean;
  restartErrorsAndLoadings: () => void;
  setError: (error: string) => void;
  localQueryState: LocalQueryState;
  setPage: (page: number) => void;
  fetchMore: FetchMoreArticles;
  language: ArticleLanguage;
  isPaginating: boolean;
  query: DocumentNode;
  page: number;
};

const usePaginateArticles = ({
  setIsFooterLoadMoreButtonVisible,
  isFooterLoadMoreButtonVisible,
  restartErrorsAndLoadings,
  setLocalQueryState,
  localQueryState,
  setIsPaginating,
  isPaginating,
  fetchMore,
  setError,
  language,
  setPage,
  query,
  page,
}: Props) => {
  const lastPaginationTimestamp = useRef(0);

  const onPaginateArticles = async (): Promise<void> => {
    try {
      await fetchMore({
        query,
        variables: { language, page },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLocalQueryState({
            hasMore: fetchMoreResult.articles.hasMore,
            articles: [...localQueryState.articles, ...fetchMoreResult.articles.items],
          });

          if (isFooterLoadMoreButtonVisible) setIsFooterLoadMoreButtonVisible(false);

          return previousResult;
        },
      });
    } catch (err) {
      setError('translations:errors:loadMoreNewsError');
      setIsFooterLoadMoreButtonVisible(true);
      restartErrorsAndLoadings();
    }
  };

  useEffect(() => {
    if (page > 1) {
      onPaginateArticles();
    }
  }, [page]);

  useEffect(() => {
    if (!localQueryState.hasMore) return;

    const now = new Date().getTime();

    const isEnabledToPaginate = now - lastPaginationTimestamp.current >= 500;

    if (isEnabledToPaginate && isPaginating) {
      lastPaginationTimestamp.current = now;
      setPage(page + 1);
    } else {
      setIsPaginating(false);
    }
  }, [isPaginating]);
};

export default usePaginateArticles;
