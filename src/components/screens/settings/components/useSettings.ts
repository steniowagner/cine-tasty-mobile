import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';

import * as TRANSLATIONS from '@i18n/tags';

import { HomeStackParams } from '../../home/routes/route-params-types';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SETTINGS'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const useSettings = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const sections = useMemo(
    () => [
      {
        description: t(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_SECTION_TITLE),
        onPress: () => navigation.navigate('IMAGES_QUALITY'),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_LANGUAGE_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_LANGUAGE_SECTION_TITLE),
        onPress: () => navigation.navigate('LANGUAGE'),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_THEME_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_THEME_SECTION_TITLE),
        onPress: () => navigation.navigate('THEME'),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_ABOUT_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_ABOUT_SECTION_TITLE),
        onPress: () => navigation.navigate('ABOUT'),
      },
      {
        description: t(TRANSLATIONS.SETTINGS_OPEN_SOURCE_DESCRIPTION),
        title: t(TRANSLATIONS.SETTINGS_OPEN_SOURCE_SECTION_TITLE),
        onPress: () => navigation.navigate('OPEN_SOURCE'),
      },
    ],
    [],
  );

  return {
    sections,
  };
};

export default useSettings;
