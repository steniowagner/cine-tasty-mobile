import {useCallback, useMemo, useState} from 'react';

import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';
import {Icons} from '@components';

import {HomeStackNavigationProp} from '../../../routes/route-params-types';
import {settingsModalOptions} from './options';

export type Option = {
  id: 'about' | 'images-quality' | 'language' | 'open-source' | 'theme';
  route: Routes.Home;
  title: string;
  icon: Icons;
};

export type UseSettingsModalProps = {
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) => void;
  navigation: HomeStackNavigationProp;
  isSettingsModalOpen: boolean;
};

export const useSettingsModal = (props: UseSettingsModalProps) => {
  const [optionSelected, setOptionSelected] = useState<Option | undefined>();

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

  const handlePressOption = useCallback((option: Option) => {
    setOptionSelected(option);
    props.setIsSettingsModalOpen(false);
  }, []);

  const open = useCallback(() => {
    props.setIsSettingsModalOpen(true);
  }, [props.setIsSettingsModalOpen]);

  const close = useCallback(() => {
    props.setIsSettingsModalOpen(false);
  }, [props.setIsSettingsModalOpen]);

  const onCloseForcibly = useCallback(() => {
    props.setIsSettingsModalOpen(false);
    props.navigation.navigate(optionSelected.route);
    setOptionSelected(undefined);
  }, [optionSelected, props.navigation]);

  return {
    forceClose: !!optionSelected,
    onPressOption: handlePressOption,
    isOpen: props.isSettingsModalOpen,
    onCloseForcibly,
    options,
    close,
    open,
  };
};
