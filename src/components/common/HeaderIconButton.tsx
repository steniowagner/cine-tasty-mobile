import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

const Wrapper = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.mediumSize,
    right: theme.metrics.mediumSize,
    bottom: theme.metrics.mediumSize,
    left: theme.metrics.mediumSize,
  },
}))`
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  justify-content: center;
  align-items: center;
`;

const HeaderIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('6%'),
  color: theme.colors.text,
}))``;

type Props = {
  onPress: () => void;
  iconName: string;
};

const HeaderIconButton = ({ iconName, onPress }: Props) => (
  <Wrapper
    testID="header-icon-button-wrapper"
    onPress={onPress}
  >
    <HeaderIcon
      name={iconName}
    />
  </Wrapper>
);

export default HeaderIconButton;
