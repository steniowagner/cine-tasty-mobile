import { useMemo } from 'react';

import { ISO6391Language } from '@/types/schema';
import { useTranslation } from '@hooks';

type UseSeasonsSectionParams = {
  numberOfSeasons: number;
};

export const useSeasonsSection = (params: UseSeasonsSectionParams) => {
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

  return {
    seasons,
  };
};
