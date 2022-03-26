import React from 'react';

import {SVGIcon, Icons} from '@components/common';
import metrics from '@styles/metrics';

import * as Styles from './Advise.styles';

type AdviseProps = {
  icon: Icons;
  description: string;
  suggestion: string;
  title: string;
};

export const Advise = (props: AdviseProps) => (
  <Styles.Wrapper testID="advise-wrapper">
    <Styles.IconWrapper testID="icon-wrapper">
      <SVGIcon
        size={metrics.getWidthFromDP('20%')}
        colorThemeRef="buttonText"
        id={props.icon}
      />
    </Styles.IconWrapper>
    {!!props.title && (
      <Styles.Title testID="advise-title">{props.title}</Styles.Title>
    )}
    {!!props.description && (
      <Styles.Description testID="advise-description">
        {props.description}
      </Styles.Description>
    )}
    {!!props.suggestion && (
      <Styles.Suggestion testID="advise-suggestion">
        {props.suggestion}
      </Styles.Suggestion>
    )}
  </Styles.Wrapper>
);
