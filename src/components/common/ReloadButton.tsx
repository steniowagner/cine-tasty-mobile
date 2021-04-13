import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const LoadButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))``;

type Props = {
  onPress: () => void;
};

const ReloadButton = ({ onPress }: Props) => (
  <Wrapper>
    <LoadButton
      onPress={onPress}
    >
      <SVGIcon
        size={metrics.getWidthFromDP('10%')}
        id="restart"
      />
    </LoadButton>
  </Wrapper>
);

export default ReloadButton;
