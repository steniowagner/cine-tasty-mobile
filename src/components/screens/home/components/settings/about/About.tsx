import React from 'react';
import {Linking} from 'react-native';

import {SVGIcon} from '@components';
import metrics from '@styles/metrics';

import {socialNetworks} from './socialNetworks';
import * as Styles from './About.styles';
import {useAbout} from './useAbout';

export const About = () => {
  const about = useAbout();
  return (
    <Styles.Wrapper>
      <Styles.BeautifulImage testID="profile-image" />
      <Styles.NameText testID="name-text">Stenio Wagner</Styles.NameText>
      <Styles.SoftwareEngineerText testID="software-engineer-text">
        {about.texts.softwareEngineer}
      </Styles.SoftwareEngineerText>
      <Styles.AboutText testID="about-me-text">
        {about.texts.aboutMe}
      </Styles.AboutText>
      <Styles.SocialNetworkButtonsWrapper>
        {socialNetworks.map(socialNetwork => (
          <Styles.SocialNetworkButton
            onPress={() => Linking.openURL(socialNetwork.url)}
            testID="social-network-button"
            color={socialNetwork.color}
            key={socialNetwork.url}>
            <SVGIcon
              size={metrics.getWidthFromDP('8%')}
              colorThemeRef="white"
              id={socialNetwork.icon}
            />
          </Styles.SocialNetworkButton>
        ))}
      </Styles.SocialNetworkButtonsWrapper>
    </Styles.Wrapper>
  );
};
