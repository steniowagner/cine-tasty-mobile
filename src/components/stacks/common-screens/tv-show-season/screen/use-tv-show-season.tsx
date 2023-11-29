import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import gql from 'graphql-tag';

import { useImperativeQuery, useTranslation } from '@/hooks';
import { HeaderIconButton } from '@/components/common';
import { Translations } from '@/i18n/tags';
import {
  ISO6391Language,
  TvShowSeason,
  TvShowSeasonVariables,
  TvShowSeason_tvShowSeason,
} from '@schema-types';

import { TVShowSeasonProps as UseTVShowSeasonParams } from '../routes/route-params-types';
import { scrollWithAnimatedHeaderParams } from './scroll-with-animated-header-params';

export const TV_SHOW_SEASON_QUERY = gql`
  query TvShowSeason($input: TVShowSeasonInput!) {
    tvShowSeason(input: $input) {
      episodes {
        airDate
        id
        name
        overview
        stillPath
        voteAverage
        voteCount
      }
      name
      overview
      posterPath
      voteAverage
    }
  }
`;

export const useTVShowSeason = (params: UseTVShowSeasonParams) => {
  const [season, setSeason] = useState<TvShowSeason_tvShowSeason | undefined>();

  const translation = useTranslation();
  const theme = useTheme();

  const headerInterpolationValues = useMemo(
    () => scrollWithAnimatedHeaderParams(theme),
    [theme],
  );

  const handleCompleteQuery = useCallback((queryResult: TvShowSeason) => {
    setSeason(queryResult.tvShowSeason);
  }, []);

  const query = useImperativeQuery<TvShowSeason, TvShowSeasonVariables>({
    query: TV_SHOW_SEASON_QUERY,
    onCompleted: handleCompleteQuery,
    fetchPolicy: 'cache-first',
  });

  const texts = useMemo(
    () => ({
      season: `${translation.translate(Translations.TVShowDetails.SEASON)} ${
        params.route.params.season
      }`,
    }),
    [translation.currentLanguage, params.route.params.season],
  );

  const handleQueryTVShowSeason = useCallback(() => {
    if (!params.route.params.id) {
      return;
    }
    query.exec({
      input: {
        language: translation.currentLanguage as ISO6391Language,
        season: params.route.params.season,
        id: params.route.params.id,
      },
    });
  }, [
    params.route.params.season,
    params.route.params.id,
    translation.currentLanguage,
  ]);

  const HeaderLeft = useCallback(
    () => (
      <HeaderIconButton
        onPress={params.navigation.goBack}
        iconName="arrow-back"
        withMarginLeft
        color="text"
      />
    ),
    [],
  );

  useEffect(() => {
    handleQueryTVShowSeason();
  }, []);

  useEffect(() => {
    params.navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: theme.colors.text,
      title: '',
      headerStyle: {
        shadowColor: 'transparent',
        backgroundColor: theme.colors.background,
        elevation: 0,
      },
      headerLeft: HeaderLeft,
    });
  }, [theme]);
  console.log(query);
  console.log(params.route.params);
  return {
    headerInterpolationValues,
    theme,
    texts,
    season,
  };
};
