import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {GET_FAMOUS_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

import {useMakeAnimatedHeaderIntepolationParams} from './useMakeAnimatedHeaderInterpolationParams';

type UseFamousDetailProps = {
  id: number;
};

export const useFamousDetail = (props: UseFamousDetailProps) => {
  const animatedHeaderIntepolationParams =
    useMakeAnimatedHeaderIntepolationParams();

  const translations = useTranslations();

  const query = useQuery<
    SchemaTypes.GetFamousDetail,
    SchemaTypes.GetFamousDetailVariables
  >(GET_FAMOUS_DETAIL, {
    fetchPolicy: 'cache-first',
    variables: {
      language: translations.language,
      id: props.id,
    },
  });

  const handleShowLanguageAlert = useCallback(() => {
    const shouldShowLanguageAlert =
      !query.loading && query.data?.person && !query.data?.person.biography;
    if (!shouldShowLanguageAlert) {
      return;
    }
    showLanguageAlert({
      description: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_DESCRIPTION,
      ),
      positiveActionTitle: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_POSITIVE_ACTION,
      ),
      title: translations.translate(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_TITLE,
      ),
      onPressPositiveAction: () => {},
      singleAction: true,
    });
  }, [translations.translate, query.loading, query.data]);

  const texts = useMemo(() => {
    const castMoviesSection = translations.translate(
      Translations.Tags.FAMOUS_DETAIL_CAST_MOVIES,
    );
    const castTvShowSection = translations.translate(
      Translations.Tags.FAMOUS_DETAIL_CAST_TV,
    );
    return {
      advise: {
        description: translations.translate(
          Translations.Tags.FAMOUS_DETAIL_ERROR_DESCRIPTION,
        ),
        suggestion: translations.translate(
          Translations.Tags.FAMOUS_DETAIL_ERROR_SUGGESTION,
        ),
        title: translations.translate(
          Translations.Tags.FAMOUS_DETAIL_ERROR_TITLE,
        ),
      },
      biography: translations.translate(
        Translations.Tags.FAMOUS_DETAIL_BIOGRAPHY,
      ),
      castMoviesSection: query.data?.person.moviesCast.length
        ? castMoviesSection
        : `${castMoviesSection} (0)`,
      castTvShowSection: query.data?.person.tvCast.length
        ? castTvShowSection
        : `${castTvShowSection} (0)`,
    };
  }, [translations.language, query.data]);

  useEffect(() => {
    handleShowLanguageAlert();
  }, [query.data]);

  return {
    animatedHeaderIntepolationParams,
    canShowContent: query.data?.person && !query.loading && !query.error,
    famous: query.data?.person,
    isLoading: query.loading,
    hasError: !!query.error,
    texts,
  };
};
