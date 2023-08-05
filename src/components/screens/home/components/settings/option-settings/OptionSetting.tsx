import React from 'react';

import {SVGIcon} from '../../../../../common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './OptionSetting.styles';

type OptionSettingsProps = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('6%');

export const OptionSettings = (props: OptionSettingsProps) => (
  <Styles.Wrapper onPress={props.onPress} testID="option-settings">
    {props.isSelected ? (
      <SVGIcon size={DEFAULT_ICON_SIZE} id="radiobox-marked" />
    ) : (
      <SVGIcon size={DEFAULT_ICON_SIZE} id="radiobox-blank" />
    )}
    <Styles.OptionTitle testID="option-title">{props.title}</Styles.OptionTitle>
  </Styles.Wrapper>
);
