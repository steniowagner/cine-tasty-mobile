import React from 'react';

import {SVGIcon} from '@components/common';
import metrics from '@styles/metrics';

import * as Styles from './OptionSetting.styles';

type OptionSettingProps = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('7%');

const RadioBoxMarkedIcon = () => (
  <SVGIcon size={DEFAULT_ICON_SIZE} id="radiobox-marked" />
);

const RadioBoxUnmarkedIcon = () => (
  <SVGIcon size={DEFAULT_ICON_SIZE} id="radiobox-blank" />
);

const OptionSetting = ({isSelected, onPress, title}: OptionSettingProps) => (
  <Styles.Wrapper onPress={onPress} testID="option-settings">
    {isSelected ? <RadioBoxMarkedIcon /> : <RadioBoxUnmarkedIcon />}
    <Styles.OptionTitle testID="option-title">{title}</Styles.OptionTitle>
  </Styles.Wrapper>
);

export default OptionSetting;
