import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';

export type Similar =
  | SchemaTypes.MovieDetail_movie_similar
  | SchemaTypes.TVShowDetail_tvShow_similar;

export type ParsedSimilar =
  | SchemaTypes.MovieDetail_movie_similar
  | (Omit<SchemaTypes.TVShowDetail_tvShow_similar, 'name'> & {title: string});

type UseSimilarProps = {
  similar: Similar[];
};

export const useSimilar = (props: UseSimilarProps) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      section: props.similar.length
        ? translations.translate(
            Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
          )
        : `${translations.translate(
            Translations.Tags.MEDIA_DETAIL_SECTIONS_SIMILAR,
          )} (0)`,
    }),
    [translations.translate, props.similar],
  );

  const dataset = useMemo(
    () =>
      props.similar.map(similarItem => {
        const title =
          similarItem.__typename === 'BaseMovie'
            ? similarItem.title
            : similarItem.name;
        return {
          __typename: similarItem.__typename,
          voteAverage: similarItem.voteAverage,
          posterPath: similarItem.posterPath,
          voteCount: similarItem.voteCount,
          id: similarItem.id,
          title,
        };
      }),
    [props.similar],
  );

  return {
    texts,
    dataset,
  };
};
