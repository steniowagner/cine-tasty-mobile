import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { gql } from '@apollo/client';

import { useImperativeQuery, useTranslation } from '@hooks';
import {
  FamousDetailsVariables,
  FamousDetails_famous,
  FamousDetails,
  ISO6391Language,
} from '@schema-types';
import { Translations } from '@/i18n/tags';

type UseFamousDetailsParams = {
  id?: number | null;
};

export const FAMOUS_DETAILS_QUERY = gql`
  query FamousDetails($id: Int!, $language: ISO6391Language) {
    famous(id: $id, language: $language) {
      knownForDepartment
      placeOfBirth
      biography
      birthday
      deathday
      images
      cast {
        movies: moviesCast {
          voteAverage
          posterPath
          voteCount
          title
          id
        }
        tvShows: tvShowsCast {
          voteAverage
          posterPath
          voteCount
          title: name
          id
        }
      }
    }
  }
`;

export const useFamousDetails = (params: UseFamousDetailsParams) => {
  const [details, setDetails] = useState<FamousDetails_famous | undefined>();

  const translation = useTranslation();
  const theme = useTheme();

  const handleCompleteQuery = useCallback((queryResult: FamousDetails) => {
    setDetails(queryResult.famous);
  }, []);

  const query = useImperativeQuery<FamousDetails, FamousDetailsVariables>({
    onCompleted: handleCompleteQuery,
    fetchPolicy: 'cache-first',
    query: FAMOUS_DETAILS_QUERY,
  });

  const headerInterpolationValues = useMemo(
    () => ({
      backgroudColor: {
        input: [0, theme.metrics.lg * 2],
        output: [theme.colors.background, theme.colors.background],
      },
      title: {
        input: [0, theme.metrics.xl * 3, theme.metrics.xl * 5],
        output: [0, 0, 1],
      },
    }),
    [theme],
  );

  const texts = useMemo(
    () => ({
      biography: translation.translate(Translations.FamousDetails.BIOGRAPHY),
      castMovies: translation.translate(Translations.FamousDetails.CAST_MOVIES),
      castTVShows: translation.translate(
        Translations.FamousDetails.CAST_TV_SHOWS,
      ),
      advice: {
        description: translation.translate(
          Translations.FamousDetails.ERROR_ADVICE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.FamousDetails.ERROR_ADVICE_SUGGESTION,
        ),
        title: translation.translate(
          Translations.FamousDetails.ERROR_ADVICE_TITLE,
        ),
      },
    }),
    [translation.translate],
  );

  const queryFamousDetails = useCallback(() => {
    if (!params.id) {
      return;
    }
    query.exec({
      language: translation.currentLanguage as ISO6391Language,
      id: params.id,
    });
  }, [translation.currentLanguage, params.id]);

  useEffect(() => {
    queryFamousDetails();
  }, []);

  return {
    headerInterpolationValues,
    isLoading: query.isLoading,
    hasError: query.hasError,
    texts,
    details,
  };
};
