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
    <Styles.SectionTitle>{props.title}</Styles.SectionTitle>
    <Styles.SectionDescrpition>{props.description}</Styles.SectionDescrpition>
    <Styles.Wrapper onPress={() => Linking.openURL(props.url)}>
      <Styles.DefaultText>{props.title}</Styles.DefaultText>
      <Styles.GapSpace />
      <SVGIcon
        size={metrics.extraLargeSize}
        colorThemeRef="buttonText"
        id={props.icon}
      />
    </Styles.Wrapper>
  </>
);
