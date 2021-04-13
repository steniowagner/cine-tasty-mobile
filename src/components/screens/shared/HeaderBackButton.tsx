import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

const IconWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  background-color: rgba(0, 0, 0, 0.8);
`;

type Props = {
  onPress: () => void;
};

const HeaderBackButton = ({ onPress }: Props) => (
  <IconWrapper
    onPress={onPress}
  >
    <SVGIcon
      size={Platform.select({
        android: metrics.getWidthFromDP('6.5%'),
        ios: metrics.getWidthFromDP('9%'),
      })}
      id={Platform.select({
        android: 'arrow-back',
        ios: 'chevron-left',
      })}
      colorThemeRef="white"
    />
  </IconWrapper>
);

export default HeaderBackButton;
