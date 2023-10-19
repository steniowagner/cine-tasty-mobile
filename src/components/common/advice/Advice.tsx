import React from 'react';

import { SVGIcon, Icons } from '@common-components';
import metrics from '@styles/metrics';

import * as Styles from './Advice.styles';

type AdviceProps = {
  icon: Icons;
  description: string;
  suggestion: string;
  title: string;
};

export const Advice = (props: AdviceProps) => (
  <Styles.Wrapper testID="advice-wrapper">
    <Styles.IconWrapper testID="icon-wrapper">
      <SVGIcon
        size={metrics.getWidthFromDP('20')}
        color="buttonText"
        id={props.icon}
      />
    </Styles.IconWrapper>
    {!!props.title && (
      <Styles.Title testID="advice-title">{props.title}</Styles.Title>
    )}
    {!!props.description && (
      <Styles.Description testID="advice-description">
        {props.description}
      </Styles.Description>
    )}
    {!!props.suggestion && (
      <Styles.Suggestion testID="advice-suggestion">
        {props.suggestion}
      </Styles.Suggestion>
    )}
  </Styles.Wrapper>
);
