import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { SettingsStackProps as UseSettingsProps } from '../routes/route-params-types';

const useSettings = ({ navigation }: UseSettingsProps) => {
  const { t } = useTranslation();

  const sections = useMemo(
    () => [
      {
        description: t(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_SECTION_TITLE),
        onPress: () => navigation.navigate(Routes.Settings.IMAGES_QUALITY),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_LANGUAGE_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_LANGUAGE_SECTION_TITLE),
        onPress: () => navigation.navigate(Routes.Settings.LANGUAGE),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_THEME_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_THEME_SECTION_TITLE),
        onPress: () => navigation.navigate(Routes.Settings.THEME),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_ABOUT_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_ABOUT_SECTION_TITLE),
        onPress: () => navigation.navigate(Routes.Settings.ABOUT),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_OPEN_SOURCE_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_OPEN_SOURCE_SECTION_TITLE),
        onPress: () => navigation.navigate(Routes.Settings.OPEN_SOURCE),
      },
    ],
    [],
  );

  return {
    sections,
  };
};

export default useSettings;
