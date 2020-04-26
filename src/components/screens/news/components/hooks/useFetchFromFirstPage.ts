import { useEffect } from 'react';
import { ApolloQueryResult, ApolloError } from 'apollo-client';

import {
  GetArticles_articles_items as Article,
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from 'types/schema';

type State = {
  fetchFromFirstPage: () => Promise<void>;
};

type LocalQueryState = {
  articles: Article[];
  hasMore: boolean;
};

type Props = {
  refetch: (variables: GetArticlesVariables) => Promise<ApolloQueryResult<GetArticles>>;
  setFetchFromFirstPageError: (error: ApolloError | null) => void;
  setLocalQueryState: (localQueryState: LocalQueryState) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPage: (page: number) => void;
  isFetchedInitialData: boolean;
  language: ArticleLanguage;
};

const useFetchFromFirstPage = ({
  setFetchFromFirstPageError,
  isFetchedInitialData,
  setLocalQueryState,
  setIsLoading,
  language,
  refetch,
  setPage,
}: Props): State => {
  const fetchFromFirstPage = async (): Promise<void> => {
    try {
      setIsLoading(true);

      setLocalQueryState({
        hasMore: true,
        articles: [],
      });

      setPage(1);

      const refreshedArticlesQuery = await refetch({ language, page: 1 });

      setFetchFromFirstPageError(null);

      setLocalQueryState({
        articles: refreshedArticlesQuery.data.articles.items,
        hasMore: refreshedArticlesQuery.data.articles.hasMore,
      });
    } catch (err) {
      setFetchFromFirstPageError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFetchedInitialData) {
      fetchFromFirstPage();
    }
  }, [language]);

  return {
    fetchFromFirstPage,
  };
};

export default useFetchFromFirstPage;
