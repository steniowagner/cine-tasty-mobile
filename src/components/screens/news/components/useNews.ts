import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {usePaginatedQuery} from '@hooks';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

import {NewsStackNavigationProp} from '../routes/route-params-types';
import {imageWrapper} from './list-item/NewsListItem.styles';

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / imageWrapper.height) - 1;

type UseNewsProps = {
  navigation: NewsStackNavigationProp;
};

const useNews = ({navigation}: UseNewsProps) => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [articleLanguage, setArticleLanguage] =
    useState<SchemaTypes.ArticleLanguage>(SchemaTypes.ArticleLanguage.EN);
  const [articles, setArticles] = useState<
    SchemaTypes.GetArticles_articles_items[]
  >([]);
  const [error, setError] = useState('');

  const {t} = useTranslation();

  const handleOnGetData = useCallback(
    (data: SchemaTypes.GetArticles): boolean => {
      setArticles(
        (previousPeople: SchemaTypes.GetArticles_articles_items[]) => [
          ...previousPeople,
          ...data.articles.items,
        ],
      );
      return data.articles.hasMore;
    },
    [],
  );

  const {onPaginateQuery, onReloadData, isPaginating, isLoading} =
    usePaginatedQuery<
      SchemaTypes.GetArticles,
      SchemaTypes.GetArticlesVariables
    >({
      onPaginationQueryError: () => {
        setError(t(TRANSLATIONS.NEWS_QUERY_BY_PAGINATION_ERROR));
        setHasPaginationError(true);
      },
      onEntryQueryError: () => {
        setError(t(TRANSLATIONS.NEWS_ENTRY_QUERY_ERROR));

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

  const onSelectArticleLanguage = useCallback(
    (language: SchemaTypes.ArticleLanguage): void => {
      if (error) {
        setError('');
      }
      setArticles([]);
      setArticleLanguage(language);
    },
    [],
  );

  const onPressTopReloadButton = useCallback(async (): Promise<void> => {
    setHasPaginationError(false);
    setError('');
    await onReloadData();
  }, []);

  const shouldShowEmptyListAdvice = useMemo(
    () => !isLoading && !error && !articles.length,
    [isLoading, error, articles],
  );

  const shouldShowListTopReloadButton = useMemo(
    () => !articles.length && !!error && !isLoading,
    [isLoading, error, articles],
  );

  const shouldShowListBottomReloadButton = useMemo(
    () => !!articles.length && (hasPaginationError || isPaginating),
    [articles, hasPaginationError, isPaginating],
  );

  const onPressHeaderIconButton = useCallback(() => {
    navigation.navigate(Routes.CustomModal.CUSTOM_MODAL_STACK, {
      type: Types.CustomizedModalChildrenType.LANGUAGE,
      headerText: t(TRANSLATIONS.NEWS_FILTER_MESSAGE),
      extraData: {
        onPressSelect: onSelectArticleLanguage,
        lastItemSelected: articleLanguage,
      },
    });
  }, [onSelectArticleLanguage, articleLanguage]);

  return {
    shouldShowListBottomReloadButton,
    shouldShowListTopReloadButton,
    onEndReached: onPaginateQuery,
    shouldShowEmptyListAdvice,
    onPressFooterReloadButton,
    onPressHeaderIconButton,
    onPressTopReloadButton,
    hasPaginationError,
    articleLanguage,
    isPaginating,
    articles,
    isLoading,
    error,
  };
};

export default useNews;
