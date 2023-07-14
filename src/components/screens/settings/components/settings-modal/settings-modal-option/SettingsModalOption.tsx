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
    <Styles.Wrapper onPress={props.onPress}>
      <SVGIcon
        size={metrics.getWidthFromDP(Styles.ICON_WIDTH_PERCENTAGE)}
        style={Styles.iconStyles}
        colorThemeRef="modalTextContent"
        id={props.icon}
      />
      <Styles.Title>{props.title}</Styles.Title>
    </Styles.Wrapper>
    <Styles.LineDivider />
  </>
);
