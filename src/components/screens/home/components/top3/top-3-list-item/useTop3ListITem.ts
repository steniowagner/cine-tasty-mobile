import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const useTop3ListItem = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      learnMore: translations.translate(Translations.Tags.HOME_LEARN_MORE),
    }),
    [translations],
  );

  return {
    texts,
  };
};
