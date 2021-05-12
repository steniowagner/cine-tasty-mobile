import React from 'react';

import { SupportedIcons } from '@components/common/svg-icon/getXML';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './Advise.styles';

type AdviseProps = {
  icon: SupportedIcons;
  description: string;
  suggestion: string;
  title: string;
};

const Advise = (props: AdviseProps) => (
  <Styles.Wrapper
    testID="advise-wrapper"
  >
    <Styles.IconWrapper
      testID="icon-wrapper"
    >
      <SVGIcon
        size={metrics.getWidthFromDP('20%')}
        colorThemeRef="buttonText"
        id={props.icon}
      />
    </Styles.IconWrapper>
    {!!props.title && <Styles.Title>{props.title}</Styles.Title>}
    {!!props.description && <Styles.Description>{props.description}</Styles.Description>}
    {!!props.suggestion && <Styles.Suggestion>{props.suggestion}</Styles.Suggestion>}
  </Styles.Wrapper>
);

export default Advise;
