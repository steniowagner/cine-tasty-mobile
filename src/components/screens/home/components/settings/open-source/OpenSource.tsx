import React from 'react';
import {ScrollView} from 'react-native';

import {CONSTANTS} from '@utils';

import {SupportLibraries} from './support-libraries/SupportLibraries';
import {SupportLinks} from './support-links/SupportLinks';

export const OpenSource = () => (
  <ScrollView
    contentContainerStyle={{
      padding: CONSTANTS.VALUES.DEFAULT_SPACING,
    }}>
    <SupportLinks />
    <SupportLibraries />
  </ScrollView>
);
