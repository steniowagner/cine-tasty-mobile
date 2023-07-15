import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const useAbout = () => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      softwareEngineer: translations.translate(
        Translations.Tags.SETTINGS_ABOUT_SOFTWARE_ENGINEER,
      ),
      aboutMe: translations.translate(
        Translations.Tags.SETTINGS_ABOUT_ABOUT_ME,
      ),
    }),
    [translations.translate],
  );

  return {
    texts,
  };
};
