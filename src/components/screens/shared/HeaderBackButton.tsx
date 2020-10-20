import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

const IconWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ArrowLeftIcon = styled(Icon).attrs(({ theme }) => ({
  size: Platform.select({
    android: theme.metrics.getWidthFromDP('6.5%'),
    ios: theme.metrics.getWidthFromDP('9%'),
  }),
  color: theme.colors.text,
  name: Platform.select({
    android: 'arrow-left',
    ios: 'chevron-left',
  }),
}))``;

type Props = {
  onPress: () => void;
};

const HeaderBackButton = ({ onPress }: Props) => (
  <IconWrapper
    onPress={onPress}
  >
    <ArrowLeftIcon />
  </IconWrapper>
);

export default HeaderBackButton;
