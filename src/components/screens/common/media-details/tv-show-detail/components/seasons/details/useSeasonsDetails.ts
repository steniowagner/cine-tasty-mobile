import {useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {TV_SHOW_SEASONS_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseSeasonsDetailsProps = {
  season: number;
  id: string;
};

export const useSeasonsDetails = (props: UseSeasonsDetailsProps) => {
  const translations = useTranslations();

  const query = useQuery<
    SchemaTypes.TVShowSeasonsDetail,
    SchemaTypes.TVShowSeasonsDetailVariables
  >(TV_SHOW_SEASONS_DETAIL, {
    variables: {
      language: translations.language,
      season: props.season,
      id: props.id,
    },
    fetchPolicy: 'cache-first',
  });

  const texts = useMemo(
    () => ({
      advise: {
        description: translations.translate(
          Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION,
        ),
        suggestion: translations.translate(
          Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION,
        ),
        title: translations.translate(
          Translations.Tags.MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE,
        ),
      },
      epsiode: translations.translate(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_EPISODE,
      ),
    }),
    [translations],
  );

  return {
    data: query.data?.tvShowSeason,
    isLoading: query.loading,
    hasError: !!query.error,
    texts,
  };
};