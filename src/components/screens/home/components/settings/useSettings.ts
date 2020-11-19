import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStackParams } from '../../routes/route-params-types';
import { Props as SettingsSectionProps } from './SettingsSection';

export const IMAGES_QUALITY_SECTION_TITLE_I18N_REF = 'translations:home:settingsSections:imageQualityTitle';
export const IMAGES_QUALITY_SECTION_DESCRIPTION_I18N_REF = 'translations:home:settingsSections:imageQualityDescription';
export const LANGUAGE_SECTION_TITLE_I18N_REF = 'translations:home:settingsSections:language:sectionTitle';
export const LANGUAGE_SECTION_DESCRIPTION_I18N_REF = 'translations:home:settingsSections:language:sectionDescription';
export const ABOUT_SECTION_TITLE_I18N_REF = 'translations:home:settingsSections:about:sectionTitle';
export const ABOUT_SECTION_DESCRIPTION_I18N_REF = 'translations:home:settingsSections:about:sectionDescription';
export const OPEN_SOURCE_SECTION_TITLE_I18N_REF = 'translations:home:settingsSections:openSource:sectionTitle';
export const OPEN_SOURCE_SECTION_DESCRIPTION_I18N_REF = 'translations:home:settingsSections:openSource:sectionDescription';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SETTINGS'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type State = {
  sections: SettingsSectionProps[];
};

const useSettings = ({ navigation }: Props): State => {
  const { t } = useTranslation();

  const sections = useMemo(
    (): SettingsSectionProps[] => [
      {
        description: t(IMAGES_QUALITY_SECTION_DESCRIPTION_I18N_REF),
        title: t(IMAGES_QUALITY_SECTION_TITLE_I18N_REF),
        onPress: () => navigation.navigate('HOME'),
      },
      {
        description: t(LANGUAGE_SECTION_DESCRIPTION_I18N_REF),
        title: t(LANGUAGE_SECTION_TITLE_I18N_REF),
        onPress: () => navigation.navigate('LANGUAGE'),
      },
      {
        description: t(ABOUT_SECTION_DESCRIPTION_I18N_REF),
        title: t(ABOUT_SECTION_TITLE_I18N_REF),
        onPress: () => navigation.navigate('ABOUT'),
      },
      {
        description: t(OPEN_SOURCE_SECTION_DESCRIPTION_I18N_REF),
        title: t(OPEN_SOURCE_SECTION_TITLE_I18N_REF),
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
