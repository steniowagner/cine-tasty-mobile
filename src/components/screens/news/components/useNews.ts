import {useCallback, useMemo, useState} from 'react';

import {useTranslations, usePagination} from '@hooks';
import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';

export const useNews = () => {
  const [language, setLanguage] = useState<SchemaTypes.ArticleLanguage>(
    SchemaTypes.ArticleLanguage.EN,
  );
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const translations = useTranslations();

  const handleOnGetData = useCallback(
    (result: SchemaTypes.GetArticles) => ({
      hasMore: result?.articles.hasMore || false,
      dataset: result?.articles.items || [],
    }),
    [],
  );

  const variables = useMemo(
    () => ({
      language,
    }),
    [language],
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
    onGetData: handleOnGetData,
    query: GET_ARTICLES,
    skipFirstRun: false,
    variables,
  });

  const texts = useMemo(
    () => ({
      description: translations.translate(
        Translations.Tags.NEWS_EMPTY_LIST_DESCRIPTION,
      ),
      suggestion: translations.translate(
        Translations.Tags.NEWS_EMPTY_LIST_SUGGESTION,
      ),
      title: translations.translate(Translations.Tags.NEWS_EMPTY_LIST_TITLE),
      modalTitle: translations.translate(Translations.Tags.NEWS_FILTER_MESSAGE),
    }),
    [],
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
    handleSelectLanguage: (languageSelected: SchemaTypes.ArticleLanguage) =>
      setLanguage(languageSelected),
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    onEndReached: pagination.paginate,
    articles: pagination.dataset,
    hasPaginationError: pagination.hasPaginationError,
    isPaginating: pagination.isPaginating,
    isLoading: pagination.isLoading,
    error: pagination.error,
    isLanguageModalOpen,
    texts,
    language,
  };
};
