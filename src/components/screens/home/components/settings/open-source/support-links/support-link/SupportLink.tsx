import React from 'react';
import {Linking} from 'react-native';

import {Icons, SVGIcon} from '@components';
import metrics from '@styles/metrics';

import * as Styles from './SupportLink.styles';

type SupportLinkProps = {
  description: string;
  buttonText: string;
  title: string;
  icon: Icons;
  url: string;
};

export const SupportLink = (props: SupportLinkProps) => (
  <>
    <Styles.SectionTitle testID="support-link-title">
      {props.title}
    </Styles.SectionTitle>
    <Styles.SectionDescrpition testID="support-link-description">
      {props.description}
    </Styles.SectionDescrpition>
    <Styles.Wrapper
      testID="suppot-link-button"
      onPress={() => Linking.openURL(props.url)}>
      <Styles.DefaultText testID="suppot-link-button-title">
        {props.buttonText}
      </Styles.DefaultText>
      <Styles.GapSpace />
      <SVGIcon
        size={metrics.extraLargeSize}
        colorThemeRef="buttonText"
        id={props.icon}
      />
    </Styles.Wrapper>
  </>
);
