import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { ISO6391Language } from '@/types/schema';
import { useTranslation } from '@hooks';
import { Routes } from '@/navigation';

type Navigation = StackNavigationProp<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Famous.TV_SHOW_SEASON & Routes.Home.TV_SHOW_SEASON
>;

type UseSeasonsSectionParams = {
  numberOfSeasons: number;
  tvShowId?: number | null;
};

export const useSeasonsSection = (params: UseSeasonsSectionParams) => {
  const navigation = useNavigation<Navigation>();
  const translation = useTranslation();

  const seasons = useMemo(
    () =>
      Array(params.numberOfSeasons)
        .fill({})
        .map((_, index) => {
          const prefix =
            translation.currentLanguage === ISO6391Language.en ? 'S' : 'T';
          return `${prefix}${index + 1}`;
        }),
    [translation.currentLanguage],
  );

  const handleSelectSeason = useCallback(
    (season: number) => {
      const routeName = navigation.getState().routes[0].name;
      const isHomeStack = /HOME/gi.test(routeName);
      const seasonsRoute = isHomeStack
        ? Routes.Home.TV_SHOW_SEASON
        : Routes.Famous.TV_SHOW_SEASON;
      navigation.navigate(seasonsRoute, {
        id: params.tvShowId,
        season,
      });
    },
    [params.tvShowId],
  );

  return {
    onPress: handleSelectSeason,
    seasons,
  };
};
