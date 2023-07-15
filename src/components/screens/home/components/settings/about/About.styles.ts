import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import {CONSTANTS} from '@utils';

type SocialNetworkButtonStyleProps = {
  color: string;
};

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  padding-top: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  padding-horizontal: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  align-items: center;
`;

export const NameText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const SoftwareEngineerText = styled(Text)`
  margin-right: ${({theme}) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.subText};
  text-align: center;
`;

export const AboutText = styled(Text)`
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  margin-bottom: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
`;

export const SocialNetworkButtonsWrapper = styled(View)`
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const SocialNetworkButton = styled(
  TouchableOpacity,
)<SocialNetworkButtonStyleProps>`
  width: ${({theme}) => theme.metrics.getWidthFromDP('14%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('14%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({color}) => color};
`;

export const BeautifulImage = styled(FastImage).attrs(() => ({
  source: {
    uri: CONSTANTS.VALUES.IMAGES.PROFILE,
  },
}))`
  width: ${({theme}) => theme.metrics.getWidthFromDP('36%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('36%')}px;
  align-self: center;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;
