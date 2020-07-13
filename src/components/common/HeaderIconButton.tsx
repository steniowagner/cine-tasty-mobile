/* eslint-disable no-confusing-arrow */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

interface WrapperStyleProps {
  readonly withMarginRight?: boolean;
  readonly withMarginLeft?: boolean;
}

const Wrapper = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.mediumSize,
    right: theme.metrics.mediumSize,
    bottom: theme.metrics.mediumSize,
    left: theme.metrics.mediumSize,
  },
}))<WrapperStyleProps>`
  margin-right: ${({ theme, withMarginRight }) => withMarginRight ? theme.metrics.mediumSize : 0}px;
  margin-left: ${({ theme, withMarginLeft }) => withMarginLeft ? theme.metrics.mediumSize : 0}px;
  justify-content: center;
  align-items: center;
`;

const HeaderIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('6%'),
  color: theme.colors.text,
}))``;

type Props = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
  onPress: () => void;
  iconName: string;
};

const HeaderIconButton = ({
  withMarginRight,
  withMarginLeft,
  iconName,
  onPress,
}: Props) => (
  <Wrapper
    withMarginRight={withMarginRight}
    withMarginLeft={withMarginLeft}
    testID="header-icon-button-wrapper"
    onPress={onPress}
  >
    <HeaderIcon
      name={iconName}
    />
  </Wrapper>
);

export default HeaderIconButton;
