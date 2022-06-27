import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {Animated} from 'react-native';

import {GET_FAMOUS_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseFamousDetailProps = {
  id: number;
};

const useFamousDetail = (props: UseFamousDetailProps) => {
  const scrollViewOffset = useRef(new Animated.Value(0)).current;

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

  const getRandomImage = useCallback(() => {
    const hasImages =
      query.data &&
      query.data?.person.images &&
      !!query.data?.person.images.length;
    if (!hasImages) {
      return '';
    }
    const randomIndex = Math.floor(
      Math.random() * Math.floor(query.data?.person.images.length),
    );
    return query.data?.person.images[randomIndex];
  }, [query.data?.person.images]);

  const backgroundImage = useMemo((): string => {
    if (!query.data || !query.data?.person) {
      return '';
    }
    return getRandomImage();
  }, [getRandomImage, query.data]);

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
  }, [query.loading, query.data]);

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
    famous: query.data?.person,
    isLoading: query.loading,
    hasError: !!query.error,
    scrollViewOffset,
    backgroundImage,
    texts,
  };
};

export default useFamousDetail;
