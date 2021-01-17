/* eslint-disable no-confusing-arrow */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

interface WrapperStyleProps {
  readonly withMarginRight?: boolean;
  readonly withMarginLeft?: boolean;
}

interface HeaderIconStyleProps {
  readonly followThemeTextColor?: boolean;
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

const HeaderIcon = styled(Icon).attrs(({ followThemeTextColor, theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: followThemeTextColor ? theme.colors.text : 'white',
}))<HeaderIconStyleProps>``;

type Props = {
  followThemeTextColor?: boolean;
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
  onPress: () => void;
  disabled?: boolean;
  iconName: string;
};

const HeaderIconButton = ({
  followThemeTextColor,
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
    <HeaderIcon
      followThemeTextColor={followThemeTextColor}
      name={iconName}
    />
  </Wrapper>
);

export default HeaderIconButton;
