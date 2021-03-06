import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

interface ListItemWrapperStyleProps {
  readonly isSelected: boolean;
}

const ListItemWrapper = styled(TouchableOpacity)<ListItemWrapperStyleProps>`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
`;

const ListItemText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
`;

type Props = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

const OptionListItem = ({ isSelected, onPress, title }: Props) => (
  <ListItemWrapper
    isSelected={isSelected}
    onPress={onPress}
    testID="option-list-item"
  >
    <ListItemText
      testID="list-item-text"
    >
      {title}
    </ListItemText>
    {isSelected && (
      <SVGIcon
        size={metrics.getWidthFromDP('8%')}
        id="checkbox-circle"
        colorThemeRef="buttonText"
      />
    )}
  </ListItemWrapper>
);

export default memo(OptionListItem, shouldComponentUpdate);
