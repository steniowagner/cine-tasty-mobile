import React from 'react';

import {SVGIcon} from '@components/common';
import metrics from '@styles/metrics';

import * as Styles from './SettingsSection.styles';

type SettingsSectionProps = {
  onPress: () => void;
  description: string;
  title: string;
};

const SettingsSection = ({
  description,
  onPress,
  title,
}: SettingsSectionProps) => (
  <Styles.Wrapper onPress={onPress} testID="settings-section-button">
    <Styles.TextWrapper>
      <Styles.SectionTitle>{title}</Styles.SectionTitle>
      <Styles.SectionDescription>{description}</Styles.SectionDescription>
    </Styles.TextWrapper>
    <SVGIcon id="chevron-right" size={metrics.getWidthFromDP('8%')} />
  </Styles.Wrapper>
);

export default SettingsSection;
