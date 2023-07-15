import React from 'react';
import {Linking} from 'react-native';
import {useTranslation} from 'react-i18next';

import {SVGIcon} from '@components';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import socialNetworks from './socialNetworks';
import * as Styles from './About.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('8%');

export const About = () => {
  const {t} = useTranslation();

  return (
    <Styles.Wrapper>
      <Styles.CardWrapper
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}>
        <Styles.BeautifulImage />
        <Styles.NameText>Stenio Wagner</Styles.NameText>
        <Styles.SoftwareEngineerWrapper>
          <Styles.SoftwareEngineerText>
            {t(TRANSLATIONS.SOFTWARE_ENGINEER)}
          </Styles.SoftwareEngineerText>
          <SVGIcon size={DEFAULT_ICON_SIZE} id="heart" colorThemeRef="red" />
        </Styles.SoftwareEngineerWrapper>
        <Styles.AboutText>{t(TRANSLATIONS.ABOUT)}</Styles.AboutText>
        <Styles.SocialNetworkButtonsWrapper>
          {socialNetworks.map((socialNetwork, index) => (
            <Styles.SocialNetworkButton
              onPress={() => Linking.openURL(socialNetwork.url)}
              color={socialNetwork.color}
              key={socialNetwork.url}
              isMiddle={index === 1}>
              <SVGIcon
                size={DEFAULT_ICON_SIZE}
                colorThemeRef="white"
                id={socialNetwork.icon}
              />
            </Styles.SocialNetworkButton>
          ))}
        </Styles.SocialNetworkButtonsWrapper>
      </Styles.CardWrapper>
    </Styles.Wrapper>
  );
};
