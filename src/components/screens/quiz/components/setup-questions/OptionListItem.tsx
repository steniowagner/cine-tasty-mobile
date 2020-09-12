import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

interface ListItemTextStyleProps {
  readonly isSelected: boolean;
}

const ListItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ListItemText = styled(Text)<ListItemTextStyleProps>`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'rgba(0, 0, 0, 0.8)')};
`;

const CheckIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('8%'),
  name: 'check-circle',
  color: theme.colors.primary,
}))``;

type Props = {
  onPress: () => void;
  isSelected: boolean;
  title: string;
};

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

const OptionListItem = ({ isSelected, onPress, title }: Props) => (
  <ListItemWrapper
    onPress={onPress}
    testID="option-list-item"
  >
    <ListItemText
      testID="list-item-text"
      isSelected={isSelected}
    >
      {title}
    </ListItemText>
    {isSelected && <CheckIcon />}
  </ListItemWrapper>
);

export default memo(OptionListItem, shouldComponentUpdate);
