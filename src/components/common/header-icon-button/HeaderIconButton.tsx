import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { Icons } from '@components/common/svg-icon/icons';
import metrics from '@styles/metrics';

import * as Styles from './HeaderIconButton.styles';

type HeaderIconButtonProps = {
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
      id={iconName}
    />
  </Styles.Wrapper>
);

export default HeaderIconButton;
