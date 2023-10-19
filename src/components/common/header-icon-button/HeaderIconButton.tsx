import React from 'react';
import { Colors } from 'styled-components/native';

import { Icons } from '@common-components';
import metrics from '@/styles/metrics';

import * as Styles from './HeaderIconButton.styles';
import { SVGIcon } from '../svg-icon';

export type HeaderIconButtonProps = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
  color?: keyof Colors;
  onPress: () => void;
  disabled?: boolean;
  iconName: Icons;
};

const iconSize = metrics.getWidthFromDP('6');

export const HeaderIconButton = (props: HeaderIconButtonProps) => (
  <Styles.Wrapper
    testID={`header-icon-button-wrapper-${props.iconName}`}
    withMarginRight={props.withMarginRight}
    withMarginLeft={props.withMarginLeft}
    disabled={props.disabled}
    onPress={props.onPress}>
    <SVGIcon size={iconSize} color={props.color} id={props.iconName} />
  </Styles.Wrapper>
);
