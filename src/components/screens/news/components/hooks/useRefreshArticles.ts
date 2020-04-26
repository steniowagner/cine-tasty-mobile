import { useEffect } from 'react';
import { DocumentNode } from 'graphql';

import { GetArticles_articles_items as Article, ArticleLanguage } from 'types/schema';
import { FetchMoreArticles } from 'types';

type LocalQueryState = {
  articles: Article[];
  hasMore: boolean;
};

type Props = {
  setIsFooterLoadMoreButtonVisible: (isFooterLoadMoreButtonVisible: boolean) => void;
  setLocalQueryState: (localQueryState: LocalQueryState) => void;
  isFooterLoadMoreButtonVisible: boolean;
  restartErrorsAndLoadings: () => void;
  setError: (error: string) => void;
  setPage: (page: number) => void;
  fetchMore: FetchMoreArticles;
  language: ArticleLanguage;
  isRefreshing: boolean;
  query: DocumentNode;
};

const useRefreshArticles = ({
  isFooterLoadMoreButtonVisible,
  setIsFooterLoadMoreButtonVisible,
  restartErrorsAndLoadings,
  setLocalQueryState,
  isRefreshing,
  setError,
  fetchMore,
  language,
  setPage,
  query,
}: Props) => {
  const onRefreshArticles = async (): Promise<void> => {
    try {
      await fetchMore({
        query,
        variables: { language, page: 1 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLocalQueryState({
            hasMore: fetchMoreResult.articles.hasMore,
            articles: fetchMoreResult.articles.items,
          });

          if (isFooterLoadMoreButtonVisible) setIsFooterLoadMoreButtonVisible(false);

          setPage(1);

          return previousResult;
        },
      });
    } catch (err) {
      setError('translations:errors:reloadNewsError');
      setIsFooterLoadMoreButtonVisible(true);
    } finally {
      restartErrorsAndLoadings();
    }
  };

  useEffect(() => {
    if (isRefreshing) {
      onRefreshArticles();
    }
  }, [isRefreshing]);
};

export default useRefreshArticles;
