import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './OptionSetting.styles';

type OptionSettingProps = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('7%');

const RadioBoxMarkedIcon = () => (
  <SVGIcon
    size={DEFAULT_ICON_SIZE}
    id="radiobox-marked"
  />
);

const RadioBoxUnmarkedIcon = () => (
  <SVGIcon
    size={DEFAULT_ICON_SIZE}
    id="radiobox-blank"
  />
);

const OptionSetting = (props: OptionSettingProps) => (
  <Styles.Wrapper
    onPress={props.onPress}
    testID="option-settings"
  >
    {props.isSelected ? <RadioBoxMarkedIcon /> : <RadioBoxUnmarkedIcon />}
    <Styles.OptionTitle
      testID="option-title"
    >
      {props.title}
    </Styles.OptionTitle>
  </Styles.Wrapper>
);

export default OptionSetting;
