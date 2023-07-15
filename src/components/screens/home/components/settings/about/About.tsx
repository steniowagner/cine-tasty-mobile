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
      <Styles.BeautifulImage />
      <Styles.NameText>Stenio Wagner</Styles.NameText>
      <Styles.SoftwareEngineerText>
        {about.texts.softwareEngineer}
      </Styles.SoftwareEngineerText>
      <Styles.AboutText>{about.texts.aboutMe}</Styles.AboutText>
      <Styles.SocialNetworkButtonsWrapper>
        {socialNetworks.map(socialNetwork => (
          <Styles.SocialNetworkButton
            onPress={() => Linking.openURL(socialNetwork.url)}
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
