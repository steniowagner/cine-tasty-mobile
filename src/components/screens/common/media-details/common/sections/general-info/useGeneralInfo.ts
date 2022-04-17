import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const useGeneralInfo = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      sectionTitle: translations.translate(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_DETAILS,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};
