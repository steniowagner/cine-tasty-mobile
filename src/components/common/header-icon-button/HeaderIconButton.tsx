import React from 'react';
import { Colors } from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { Icons } from '@components/common/svg-icon/icons';
import metrics from '@styles/metrics';

import * as Styles from './HeaderIconButton.styles';

type HeaderIconButtonProps = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
  color?: keyof Colors;
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
  color,
}: HeaderIconButtonProps) => (
  <Styles.Wrapper
    testID={`header-icon-button-wrapper-${iconName}`}
    withMarginRight={withMarginRight}
    withMarginLeft={withMarginLeft}
    disabled={disabled}
    onPress={onPress}
  >
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      colorThemeRef={color}
      id={iconName}
    />
  </Styles.Wrapper>
);

export default HeaderIconButton;
