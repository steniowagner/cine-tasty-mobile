import React from 'react';

import {SupportedIcons} from '@components/common/svg-icon/getXML';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './Advise.styles';

type AdviseProps = {
  icon: SupportedIcons;
  description: string;
  suggestion: string;
  title: string;
};

const Advise = ({description, suggestion, title, icon}: AdviseProps) => (
  <Styles.Wrapper testID="advise-wrapper">
    <Styles.IconWrapper testID="icon-wrapper">
      <SVGIcon
        size={metrics.getWidthFromDP('20%')}
        colorThemeRef="buttonText"
        id={icon}
      />
    </Styles.IconWrapper>
    {!!title && <Styles.Title>{title}</Styles.Title>}
    {!!description && <Styles.Description>{description}</Styles.Description>}
    {!!suggestion && <Styles.Suggestion>{suggestion}</Styles.Suggestion>}
  </Styles.Wrapper>
);

export default Advise;
