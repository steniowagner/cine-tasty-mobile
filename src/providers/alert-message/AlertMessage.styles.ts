import {Animated, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {isEqualsOrLargestThanIphoneX} from '@utils';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: 60%;
  justify-content: center;
  align-items: center;
  background-color: #00f;
`;

export const MessageWrapper = styled(Animated.View)`
  padding-horizontal: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({theme}) => theme.metrics.largeSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.popup};
  position: absolute;
  align-self: center;
  top: ${({theme}) => {
    const tabNavigatorHeight =
      theme.metrics.getWidthFromDP('18%') +
      (isEqualsOrLargestThanIphoneX() ? 30 : 0);
    const headerHeight = 44;
    return theme.metrics.height / 2 - tabNavigatorHeight + headerHeight;
  }}px;
`;

export const Message = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: #fff;
`;
