import {TouchableOpacity, Image, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {light as lightTheme} from '@styles/themes';

type SocialNetworkButtonStyleProps = {
  isMiddle: boolean;
  color: string;
};

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('85%')}px;
  align-items: center;
  padding-vertical: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: white;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;

export const NameText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${lightTheme.colors.text};
  text-align: center;
`;

export const SoftwareEngineerText = styled(Text)`
  margin-right: ${({theme}) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize * 1.2}px;
  color: ${lightTheme.colors.subText};
  text-align: center;
`;

export const AboutText = styled(Text)`
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('4.5%')}px;
  padding-horizontal: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${lightTheme.colors.text};
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
  margin-top: ${({theme}) => theme.metrics.extraLargeSize}px;
  margin-horizontal: ${({isMiddle, theme}) =>
    isMiddle ? theme.metrics.extraLargeSize : 0}px;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({color}) => color};
`;

export const BeautifulImage = styled(Image).attrs(() => ({
  source: {
    uri: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
  },
}))`
  width: ${({theme}) => theme.metrics.getWidthFromDP('36%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('36%')}px;
  align-self: center;
  margin-bottom: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('18%')}px;
  border-width: ${({theme}) => theme.metrics.smallSize}px;
`;

export const SoftwareEngineerWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.metrics.extraSmallSize}px;
`;
