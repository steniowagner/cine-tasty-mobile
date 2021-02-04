import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useThemeProvider } from 'providers/theme/Theme';
import { ThemeId } from 'types';

export const LIGHT_I18N_REF = 'translations:theme:light';
export const DARK_I18N_REF = 'translations:theme:dark';

type ThemeOption = {
  onPress: () => void;
  title: string;
  id: ThemeId;
};

type State = {
  themeOptions: ThemeOption[];
  selectedTheme: ThemeId;
};

const useThemeSettingsOption = (): State => {
  const { themeId, onToggleTheme } = useThemeProvider();
  const { t } = useTranslation();

  const onPressDarkOption = useCallback(() => {
    if (themeId === ThemeId.DARK) {
      return;
    }

    onToggleTheme();
  }, [themeId]);

  const onPressLightOption = useCallback(() => {
    if (themeId === ThemeId.LIGHT) {
      return;
    }

    onToggleTheme();
  }, [themeId]);

  const themeOptions = useMemo(
    () => [
      {
        id: ThemeId.DARK,
        onPress: onPressDarkOption,
        title: t(DARK_I18N_REF),
      },
      {
        id: ThemeId.LIGHT,
        onPress: onPressLightOption,
        title: t(LIGHT_I18N_REF),
      },
    ],
    [onPressLightOption, onPressDarkOption, onToggleTheme],
  );

  return {
    selectedTheme: themeId,
    themeOptions,
  };
};

export default useThemeSettingsOption;
