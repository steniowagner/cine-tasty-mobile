import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

import isEqualsOrLargestThanIphoneX from '@utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';

type SelectButtonStyleProps = {
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
};

export const SelectButton = styled(TouchableOpacity)<SelectButtonStyleProps>`
  width: 100%;
  height: ${({theme}) =>
    isEqualsOrLargestThanIphoneX()
      ? theme.metrics.getWidthFromDP('20%')
      : theme.metrics.getWidthFromDP('16%')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
  border-bottom-right-radius: ${({borderBottomRightRadius}) =>
    borderBottomRightRadius || 0}px;
  border-bottom-left-radius: ${({borderBottomLeftRadius}) =>
    borderBottomLeftRadius || 0}px;
`;

export const SelectButtonText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  text-transform: uppercase;
`;
