import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const OptionTitle = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
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

const OptionSetting = ({ isSelected, onPress, title }: Props) => (
  <Wrapper
    onPress={onPress}
    testID="option-settings"
  >
    {isSelected ? <RadioBoxMarkedIcon /> : <RadioBoxUnmarkedIcon />}
    <OptionTitle
      testID="option-title"
    >
      {title}
    </OptionTitle>
  </Wrapper>
);

export default OptionSetting;
