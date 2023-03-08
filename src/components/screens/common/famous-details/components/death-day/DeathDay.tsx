import React from 'react';

import {SVGIcon} from '@components';
import metrics from '@styles/metrics';

import * as Styles from './DeathDay.styles';
import {useDeathDay} from './useDeathDay';

type DeathDayProps = {
  day: string;
};

export const DeathDay = (props: DeathDayProps) => {
  const deathDay = useDeathDay({day: props.day});

  return (
    <Styles.Wrapper testID="death-day-wrapper">
      <Styles.IconWrapper>
        <SVGIcon
          size={metrics.extraLargeSize}
          colorThemeRef="buttonText"
          id="christianity"
        />
      </Styles.IconWrapper>
      <Styles.DateText testID="death-day-text">{deathDay.text}</Styles.DateText>
    </Styles.Wrapper>
  );
};
