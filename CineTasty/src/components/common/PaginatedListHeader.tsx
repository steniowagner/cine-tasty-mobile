import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Icon from './Icon';

const ReloadButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))`
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ReloadIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: theme.colors.text,
  name: 'reload',
}))``;

type Props = {
  onPress: () => void;
};

const PaginatedListHeader = ({ onPress }: Props) => (
  <ReloadButton
    testID="top-reload-button"
    onPress={onPress}
  >
    <ReloadIcon />
  </ReloadButton>
);

export default PaginatedListHeader;
