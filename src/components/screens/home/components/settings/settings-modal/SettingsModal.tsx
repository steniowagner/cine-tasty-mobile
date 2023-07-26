import React from 'react';

import {ModalSheet} from '@components';

import {SettingsModalOption} from './settings-modal-option/SettingsModalOption';
import {
  UseSettingsModalProps as SettingsModalProps,
  useSettingsModal,
} from './useSettingsModal';

export const SettingsModal = (props: SettingsModalProps) => {
  const settingsModal = useSettingsModal({
    setIsSettingsModalOpen: props.setIsSettingsModalOpen,
    isSettingsModalOpen: props.isSettingsModalOpen,
    navigation: props.navigation,
  });

  return (
    <ModalSheet
      isOpen={settingsModal.isOpen}
      onClose={settingsModal.close}
      forceClose={settingsModal.forceClose}
      onCloseForcibly={settingsModal.onCloseForcibly}>
      {settingsModal.options.map(option => (
        <SettingsModalOption
          onPress={() => settingsModal.onPressOption(option)}
          title={option.title}
          icon={option.icon}
          key={option.id}
        />
      ))}
    </ModalSheet>
  );
};
