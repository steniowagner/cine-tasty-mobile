import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const useOverview = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      sectionTitle: translations.translate(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_OVERVIEW,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};
