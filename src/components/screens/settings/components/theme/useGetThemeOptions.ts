import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeId } from 'types';

import useCheckHasThemeSupport from './useCheckHasThemeSupport';

export const SYSTEM_I18N_REF = 'translations:theme:system';
export const LIGHT_I18N_REF = 'translations:theme:light';
export const DARK_I18N_REF = 'translations:theme:dark';

type ThemeOption = {
  onPress: () => void;
  title: string;
  id: ThemeId;
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
      title: t(SYSTEM_I18N_REF),
      id: ThemeId.SYSTEM,
    }),
    [],
  );

  const defaultOptions = useMemo(
    () => [
      {
        onPress: onPressDarkOption,
        title: t(DARK_I18N_REF),
        id: ThemeId.DARK,
      },
      {
        onPress: onPressLightOption,
        title: t(LIGHT_I18N_REF),
        id: ThemeId.LIGHT,
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
