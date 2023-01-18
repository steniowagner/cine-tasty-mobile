import {useMemo, useState} from 'react';

import {useTranslations, usePagination} from '@hooks';
import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

export const useNews = () => {
  const [languageSelected, setLanguageSelected] =
    useState<SchemaTypes.ArticleLanguage>(SchemaTypes.ArticleLanguage.EN);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const translations = useTranslations();

  const variables = useMemo(
    () => ({
      language: languageSelected,
    }),
    [languageSelected],
  );

  const pagination = usePagination<
    SchemaTypes.GetArticles,
    SchemaTypes.GetArticles_articles_items,
    SchemaTypes.GetArticlesVariables
  >({
    paginationError: translations.translate(
      Translations.Tags.NEWS_QUERY_BY_PAGINATION_ERROR,
    ),
    entryQueryError: translations.translate(
      Translations.Tags.NEWS_ENTRY_QUERY_ERROR,
    ),
    onGetData: (result: SchemaTypes.GetArticles) => ({
      hasMore: result?.articles.hasMore || false,
      dataset: result?.articles.items || [],
    }),
    query: GET_ARTICLES,
    skipFirstRun: false,
    variables,
  });

  const texts = useMemo(
    () => ({
      advice: {
        description: translations.translate(
          Translations.Tags.NEWS_EMPTY_LIST_DESCRIPTION,
        ),
        suggestion: translations.translate(
          Translations.Tags.NEWS_EMPTY_LIST_SUGGESTION,
        ),
        title: translations.translate(Translations.Tags.NEWS_EMPTY_LIST_TITLE),
      },
    }),
    [translations.translate],
  );

  return {
    shouldShowPaginationFooter:
      !!pagination.dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    shouldShowListTopReloadButton:
      !pagination.dataset.length && !!pagination.error && !pagination.isLoading,
    shouldShowEmptyListAdvice:
      !pagination.isLoading && !pagination.error && !pagination.dataset.length,
    onPressHeaderIconButton: () => setIsLanguageModalOpen(true),
    onCloseModal: () => setIsLanguageModalOpen(false),
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    onEndReached: pagination.paginate,
    articles: pagination.dataset,
    hasPaginationError: pagination.hasPaginationError,
    isPaginating: pagination.isPaginating,
    isLoading: pagination.isLoading,
    error: pagination.error,
    isLanguageModalOpen,
    languageSelected,
    setLanguageSelected,
    texts,
  };
};
