import {useCallback, useMemo, useState} from 'react';

import {useTranslations, usePagination} from '@hooks';
import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {NewsStackNavigationProp} from '../routes/route-params-types';

type UseNewsProps = {
  navigation: NewsStackNavigationProp;
};

const useNews = (props: UseNewsProps) => {
  const [language, setLanguage] = useState<SchemaTypes.ArticleLanguage>(
    SchemaTypes.ArticleLanguage.EN,
  );
  const translations = useTranslations();

  const handleOnGetData = useCallback(
    (result: SchemaTypes.GetArticles) => ({
      hasMore: result.articles.hasMore,
      dataset: result.articles.items,
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
    fireWhenMounted: true,
    query: GET_ARTICLES,
    variables,
  });

  const handlePressHeaderIconButton = useCallback(() => {
    props.navigation.navigate(Routes.CustomModal.CUSTOM_MODAL_STACK, {
      type: Types.CustomizedModalChildrenType.LANGUAGE,
      headerText: translations.translate(Translations.Tags.NEWS_FILTER_MESSAGE),
      extraData: {
        onPressSelect: setLanguage,
        lastItemSelected: language,
      },
    });
  }, [props.navigation, language, translations.translate]);

  const adviseTexts = useMemo(
    () => ({
      description: translations.translate(
        Translations.Tags.NEWS_EMPTY_LIST_DESCRIPTION,
      ),
      suggestion: translations.translate(
        Translations.Tags.NEWS_EMPTY_LIST_SUGGESTION,
      ),
      title: translations.translate(Translations.Tags.NEWS_EMPTY_LIST_TITLE),
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
    onPressHeaderIconButton: handlePressHeaderIconButton,
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    onEndReached: pagination.paginate,
    articles: pagination.dataset,
    hasPaginationError: pagination.hasPaginationError,
    isPaginating: pagination.isPaginating,
    isLoading: pagination.isLoading,
    error: pagination.error,
    adviseTexts,
    language,
  };
};

export default useNews;
