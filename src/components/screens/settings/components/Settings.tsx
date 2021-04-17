import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStackParams } from '../../home/routes/route-params-types';
import SettingsSection from './settings-section/SettingsSection';
import * as Styles from './Settings.styles';
import useSettings from './useSettings';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SETTINGS'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Settings = ({ navigation }: Props) => {
  const { sections } = useSettings({ navigation });

  return (
    <Styles.Wrapper
      testID="settings-wrapper"
    >
      {sections.map((section) => (
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
