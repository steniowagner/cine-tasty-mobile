import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import useCheckHasThemeSupport from './useCheckHasThemeSupport';

type ThemeOption = {
  onPress: () => void;
  title: string;
  id: Types.ThemeId;
};

type State = {
  themeOptions: ThemeOption[];
};

type Props = {
  onPressSystemPreferencesOption: () => void;
  onPressLightOption: () => void;
  onPressDarkOption: () => void;
};

const useGetThemeSettingsOption = ({
  onPressSystemPreferencesOption,
  onPressLightOption,
  onPressDarkOption,
}: Props): State => {
  const { hasThemeSupport } = useCheckHasThemeSupport();
  const { t } = useTranslation();

  const systemPreferenceOption = useMemo(
    (): ThemeOption => ({
      onPress: onPressSystemPreferencesOption,
      title: t(TRANSLATIONS.THEME_SYSTEM_PREFERENCES),
      id: Types.ThemeId.SYSTEM,
    }),
    [],
  );

  const defaultOptions = useMemo(
    () => [
      {
        onPress: onPressDarkOption,
        title: t(TRANSLATIONS.THEME_DARK),
        id: Types.ThemeId.DARK,
      },
      {
        onPress: onPressLightOption,
        title: t(TRANSLATIONS.THEME_LIGHT),
        id: Types.ThemeId.LIGHT,
      },
    ],
    [onPressLightOption, onPressDarkOption],
  );

  const themeOptions = useMemo(() => {
    if (hasThemeSupport) {
      return [...defaultOptions, systemPreferenceOption];
    }

    return defaultOptions;
  }, [onPressLightOption, onPressDarkOption, hasThemeSupport]);

  return {
    themeOptions,
  };
};

export default useGetThemeSettingsOption;
