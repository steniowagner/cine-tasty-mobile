import React from 'react';
import {
  TouchableOpacity, Linking, Image, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

import socialNetworks from './socialNetworks';
// import HeartBeating from './HeartBeating';

interface SocialNetworkButtonStyleProps {
  readonly isMiddle: boolean;
  readonly color: string;
}

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('85%')}px;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const NameText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: #262626;
  text-align: center;
`;

const SoftwareEngineerText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: #858585;
  text-align: center;
`;

const AboutText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: #262626;
  text-align: center;
`;

const SocialNetworkButtonsWrapper = styled(View)`
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SocialNetworkButton = styled(TouchableOpacity)<SocialNetworkButtonStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-horizontal: ${({ isMiddle, theme }) => (isMiddle ? theme.metrics.extraLargeSize : 0)}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({ color }) => color};
`;

const BeautifulImage = styled(Image).attrs(() => ({
  source: {
    uri:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
  },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('36%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('36%')}px;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  border-width: ${({ theme }) => theme.metrics.smallSize}px;
`;

const SoftwareEngineerWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 35px;
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

const About = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <CardWrapper
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <BeautifulImage />
        <NameText>Stenio Wagner</NameText>
        <SoftwareEngineerWrapper>
          <SoftwareEngineerText>
            {t('translations:softwareEngineer')}
          </SoftwareEngineerText>
          {/* <HeartBeating /> */}
        </SoftwareEngineerWrapper>
        <AboutText>{t('translations:about')}</AboutText>
        <SocialNetworkButtonsWrapper>
          {socialNetworks.map((socialNetwork, index) => (
            <SocialNetworkButton
              onPress={() => Linking.openURL(socialNetwork.url)}
              color={socialNetwork.color}
              key={socialNetwork.url}
              isMiddle={index === 1}
            >
              <SVGIcon
                size={DEFAULT_ICON_SIZE}
                colorThemeRef="white"
                id={socialNetwork.icon}
              />
            </SocialNetworkButton>
          ))}
        </SocialNetworkButtonsWrapper>
      </CardWrapper>
    </Wrapper>
  );
};

export default About;
