import React from 'react';

import { SettingsStackProps } from '../routes/route-params-types';
import SettingsSection from './settings-section/SettingsSection';
import * as Styles from './Settings.styles';
import useSettings from './useSettings';

const Settings = (props: SettingsStackProps) => {
  const settings = useSettings({ navigation: props.navigation });

  return (
    <Styles.Wrapper
      testID="settings-wrapper"
    >
      {settings.sections.map((section) => (
        <SettingsSection
          description={section.description}
          onPress={section.onPress}
          title={section.title}
          key={section.title}
        />
      ))}
    </Styles.Wrapper>
  );
};

export default Settings;
