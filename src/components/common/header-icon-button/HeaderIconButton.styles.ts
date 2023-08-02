import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {SVGIcon} from '../svg-icon';

type WrapperStyleProps = {
  withMarginRight?: boolean;
  withMarginLeft?: boolean;
};

export const Wrapper = styled(TouchableOpacity).attrs(({theme}) => ({
  hitSlop: {
    top: theme.metrics.mediumSize,
    right: theme.metrics.mediumSize,
    bottom: theme.metrics.mediumSize,
    left: theme.metrics.mediumSize,
  },
}))<WrapperStyleProps>`
  margin-right: ${({theme, withMarginRight}) =>
    withMarginRight ? theme.metrics.mediumSize : 0}px;
  margin-left: ${({theme, withMarginLeft}) =>
    withMarginLeft ? theme.metrics.mediumSize : 0}px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(SVGIcon).attrs(({theme}) => ({
  size: theme.metrics.getWidthFromDP('6.5%'),
}))``;
