import React from 'react';

import {ModalSheet} from '@components';

import {SettingsModalOption} from './settings-modal-option/SettingsModalOption';
import {Option} from './useSettingsModal';

type SettingsModalProps = {
  onPressOption: (option: Option) => void;
  onCloseModal: () => void;
  isOpen: boolean;
  options: Option[];
};

export const SettingsModal = (props: SettingsModalProps) => (
  <ModalSheet isOpen={props.isOpen} onClose={props.onCloseModal}>
    {props.options.map(option => (
      <SettingsModalOption
        onPress={() => props.onPressOption(option)}
        title={option.title}
        icon={option.icon}
        key={option.id}
      />
    ))}
  </ModalSheet>
);
