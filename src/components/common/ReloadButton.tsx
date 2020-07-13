import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import Icon from './Icon';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const LoadMoreIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: theme.colors.text,
  name: 'reload',
}))``;

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
      <LoadMoreIcon />
    </LoadButton>
  </Wrapper>
);

export default ReloadButton;
