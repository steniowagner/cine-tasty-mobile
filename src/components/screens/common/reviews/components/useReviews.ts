import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const useReviews = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      reviews: translations.translate(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};
