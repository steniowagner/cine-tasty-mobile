import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './SettingsSection.styles';

type SettingsSectionProps = {
  onPress: () => void;
  description: string;
  title: string;
};

const SettingsSection = (props: SettingsSectionProps) => (
  <Styles.Wrapper
    onPress={props.onPress}
    testID="settings-section-button"
  >
    <Styles.TextWrapper>
      <Styles.SectionTitle>{props.title}</Styles.SectionTitle>
      <Styles.SectionDescription>{props.description}</Styles.SectionDescription>
    </Styles.TextWrapper>
    <SVGIcon
      id="chevron-right"
      size={metrics.getWidthFromDP('8%')}
    />
  </Styles.Wrapper>
);

export default SettingsSection;
