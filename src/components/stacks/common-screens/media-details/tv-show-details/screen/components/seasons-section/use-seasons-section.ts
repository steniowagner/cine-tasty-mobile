import { useMemo } from 'react';

import { useTranslation } from '@hooks';
import { Translations } from '@/i18n/tags';

type UseSeasonsSectionParams = {
  numberOfSeasons: number;
};

export const useSeasonsSection = (params: UseSeasonsSectionParams) => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      seasons: translation.translate(Translations.TVShowDetails.SEASONS),
    }),
    [translation.translate],
  );

  const seasons = useMemo(
    () =>
      Array(params.numberOfSeasons)
        .fill({})
        .map((_, index) => `S${index + 1}`),
    [texts],
  );

  return {
    seasons,
    texts,
  };
};
