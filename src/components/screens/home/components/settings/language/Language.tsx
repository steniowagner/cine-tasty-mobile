import React from 'react';
import { View } from 'react-native';

import OptionSettings from '../OptionSetting';
import useLanguage from './useLanguage';

const Language = () => {
  useLanguage();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <OptionSettings
        onPress={() => {}}
        title="Option 1"
      />
      <OptionSettings
        onPress={() => {}}
        title="Option 1"
      />
      <OptionSettings
        isSelected
        onPress={() => {}}
        title="Option 1"
      />
      <OptionSettings
        onPress={() => {}}
        title="Option 1"
      />
      <OptionSettings
        onPress={() => {}}
        title="Option 1"
      />
    </View>
  );
};

export default Language;
