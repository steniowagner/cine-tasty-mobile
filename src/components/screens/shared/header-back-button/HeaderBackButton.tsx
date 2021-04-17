import React from 'react';
import { Platform } from 'react-native';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './HeaderBackButton.styles';

type Props = {
  onPress: () => void;
};

const HeaderBackButton = ({ onPress }: Props) => (
  <Styles.IconWrapper
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
  </Styles.IconWrapper>
);

export default HeaderBackButton;
