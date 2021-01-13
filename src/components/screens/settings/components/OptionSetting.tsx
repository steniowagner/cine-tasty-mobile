import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

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

const OptionSelectionIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.text,
}))``;

type Props = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

export const UNMARKED_OPTION_ICON = 'radiobox-blank';
export const MARKED_OPTION_ICON = 'radiobox-marked';

const OptionSetting = ({ isSelected, onPress, title }: Props) => (
  <Wrapper
    onPress={onPress}
    testID="option-settings"
  >
    <OptionSelectionIcon
      name={isSelected ? MARKED_OPTION_ICON : UNMARKED_OPTION_ICON}
    />
    <OptionTitle
      testID="option-title"
    >
      {title}
    </OptionTitle>
  </Wrapper>
);

export default OptionSetting;
