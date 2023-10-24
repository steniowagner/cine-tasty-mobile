import { useCallback, useEffect, useMemo, useState } from 'react';
import { gql } from '@apollo/client';

import {
  NewsLanguage,
  QueryNews,
  QueryNewsVariables,
  QueryNews_news_items,
} from '@schema-types';
import { usePagination, useTranslation } from '@/hooks';
import { Translations } from '@/i18n/tags';

export const GET_NEWS = gql`
  query QueryNews($page: Int!, $language: NewsLanguage!) {
    news(page: $page, language: $language) {
      items {
        url
        title
        source
        publishedAt
        image
        id
        description
      }
      hasMore
    }
  }
`;

export const useNews = () => {
  const [languageSelected, setLanguageSelected] = useState<NewsLanguage>(
    NewsLanguage.EN,
  );
  const [isLanguageFilterModalOpen, setIsLanguageFilterModalOpen] =
    useState(false);

  const translation = useTranslation();

  const variables = useMemo(
    () => ({
      language: languageSelected,
    }),
    [languageSelected],
  );

  const pagination = usePagination<
    QueryNews,
    QueryNews_news_items,
    QueryNewsVariables
  >({
    errorMessageIcon: 'alert-box',
    paginationError: translation.translate(
      Translations.News.PAGINATION_QUERY_ERROR,
    ),
    entryError: translation.translate(Translations.News.ENTRY_QUERY_ERROR),
    onGetData: (result: QueryNews) => ({
      hasMore: result?.news.hasMore || false,
      dataset: result?.news.items || [],
    }),
    query: GET_NEWS,
    skipFirstRun: true,
    variables,
  });

  const handlePressHeaderCTA = useCallback(() => {
    setIsLanguageFilterModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsLanguageFilterModalOpen(false);
  }, []);

  const texts = useMemo(
    () => ({
      advice: {
        description: translation.translate(
          Translations.News.EMPTY_LIST_ADVICE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.News.EMPTY_LIST_ADVICE_SUGGESTION,
        ),
        title: translation.translate(Translations.News.EMPTY_LIST_ADVICE_TITLE),
      },
    }),
    [translation.translate],
  );

  useEffect(() => {
    pagination.retryEntryQuery();
  }, [languageSelected]);

  return {
    shouldShowPaginationFooter:
      !!pagination.dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    shouldShowListTopReloadButton:
      !pagination.dataset.length && !!pagination.error && !pagination.isLoading,
    shouldShowEmptyListAdvice:
      !pagination.isLoading && !pagination.error && !pagination.dataset.length,
    onPressFooterReloadButton: pagination.retryPagination,
    onPressTopReloadButton: pagination.retryEntryQuery,
    onEndReached: pagination.paginate,
    hasPaginationError: pagination.hasPaginationError,
    isPaginating: pagination.isPaginating,
    error: pagination.error,
    onPressHeaderCTA: handlePressHeaderCTA,
    onCloseModal: handleCloseModal,
    isLanguageFilterModalOpen,
    isLoading: pagination.isLoading,
    articles: pagination.dataset,
    setLanguageSelected,
    languageSelected,
    texts,
  };
};
