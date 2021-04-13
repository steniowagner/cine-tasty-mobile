import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

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

type Props = {
  onPress: () => void;
};

const PaginatedListHeader = ({ onPress }: Props) => (
  <ReloadButton
    testID="top-reload-button"
    onPress={onPress}
  >
    <SVGIcon
      size={metrics.getWidthFromDP('10%')}
      id="restart"
    />
  </ReloadButton>
);

export default PaginatedListHeader;
