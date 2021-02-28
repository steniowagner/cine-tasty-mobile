/* eslint-disable no-confusing-arrow */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import { Icons } from 'components/common/svg-icon/icons';
import metrics from 'styles/metrics';

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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  justify-content: center;
  align-items: center;
`;

type Props = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
  onPress: () => void;
  disabled?: boolean;
  iconName: Icons;
};

const HeaderIconButton = ({
  withMarginRight,
  withMarginLeft,
  disabled,
  iconName,
  onPress,
}: Props) => (
  <Wrapper
    testID={`header-icon-button-wrapper-${iconName}`}
    withMarginRight={withMarginRight}
    withMarginLeft={withMarginLeft}
    disabled={disabled}
    onPress={onPress}
  >
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      id={iconName}
    />
  </Wrapper>
);

export default HeaderIconButton;
