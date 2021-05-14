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

type UseGetThemeSettingsOptionProps = {
  onPressSystemPreferencesOption: () => void;
  onPressLightOption: () => void;
  onPressDarkOption: () => void;
};

const useGetThemeSettingsOption = (props: UseGetThemeSettingsOptionProps) => {
  const checkHasThemeSupport = useCheckHasThemeSupport();
  const { t } = useTranslation();

  const systemPreferenceOption = useMemo(
    (): ThemeOption => ({
      onPress: props.onPressSystemPreferencesOption,
      title: t(TRANSLATIONS.THEME_SYSTEM_PREFERENCES),
      id: Types.ThemeId.SYSTEM,
    }),
    [],
  );

  const defaultOptions = useMemo(
    () => [
      {
        onPress: props.onPressDarkOption,
        title: t(TRANSLATIONS.THEME_DARK),
        id: Types.ThemeId.DARK,
      },
      {
        onPress: props.onPressLightOption,
        title: t(TRANSLATIONS.THEME_LIGHT),
        id: Types.ThemeId.LIGHT,
      },
    ],
    [props.onPressLightOption, props.onPressDarkOption],
  );

  const themeOptions = useMemo(() => {
    if (checkHasThemeSupport.hasThemeSupport) {
      return [...defaultOptions, systemPreferenceOption];
    }

    return defaultOptions;
  }, [
    checkHasThemeSupport.hasThemeSupport,
    props.onPressLightOption,
    props.onPressDarkOption,
  ]);

  return {
    themeOptions,
  };
};

export default useGetThemeSettingsOption;
