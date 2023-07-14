import {useCallback, useMemo, useState} from 'react';

import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';
import {Icons} from '@components';

import {HomeStackNavigationProp} from '../../routes/route-params-types';
import {settingsModalOptions} from './options';

export type Option = {
  id: 'about' | 'images-quality' | 'language' | 'open-source' | 'theme';
  route: Routes.Settings;
  title: string;
  icon: Icons;
};

type UseSettingsModalProps = {
  navigation: HomeStackNavigationProp;
};

export const useSettingsModal = (props: UseSettingsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const translations = useTranslations();

  const options = useMemo(
    () =>
      settingsModalOptions.map(
        settingsModalOption =>
          ({
            ...settingsModalOption,
            title: translations.translate(settingsModalOption.titleTag),
          } as Option),
      ),
    [translations.translate],
  );

  const handlePressOption = useCallback(
    (option: Option) => {
      props.navigation.navigate(option.route);
    },
    [props.navigation],
  );

  return {
    onPressOption: handlePressOption,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    isOpen,
    options,
  };
};
