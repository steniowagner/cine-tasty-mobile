import React from 'react';

import {Icons, SVGIcon} from '@components';

import * as Styles from './SettingsModalOption.styles';
import metrics from '@styles/metrics';

type SettingsOptionProps = {
  onPress: () => void;
  title: string;
  icon: Icons;
};

export const SettingsModalOption = (props: SettingsOptionProps) => (
  <>
    <Styles.Wrapper
      onPress={props.onPress}
      testID="settings-modal-option-button">
      <SVGIcon
        size={metrics.getWidthFromDP(Styles.ICON_WIDTH_PERCENTAGE)}
        style={Styles.iconStyles}
        colorThemeRef="modalTextContent"
        id={props.icon}
      />
      <Styles.Title testID="settings-modal-option-text">
        {props.title}
      </Styles.Title>
    </Styles.Wrapper>
    <Styles.LineDivider />
  </>
);
