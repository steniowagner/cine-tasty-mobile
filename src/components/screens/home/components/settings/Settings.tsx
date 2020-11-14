import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStackParams } from '../../routes/route-params-types';
import SettingsSection from './SettingsSection';
import useSettings from './useSettings';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SETTINGS'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Settings = ({ navigation }: Props) => {
  const { sections } = useSettings({ navigation });

  return (
    <Wrapper
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
    </Wrapper>
  );
};

export default Settings;
