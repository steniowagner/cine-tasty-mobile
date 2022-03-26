import React from 'react';
import {Colors} from 'styled-components/native';

import {SVGIcon, Icons} from '@components';
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

export const HeaderIconButton = (props: HeaderIconButtonProps) => (
  <Styles.Wrapper
    testID={`header-icon-button-wrapper-${props.iconName}`}
    withMarginRight={props.withMarginRight}
    withMarginLeft={props.withMarginLeft}
    disabled={props.disabled}
    onPress={props.onPress}>
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      colorThemeRef={props.color}
      id={props.iconName}
    />
  </Styles.Wrapper>
);
