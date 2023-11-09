import React from 'react';

import { SVGIcon } from '@common-components';
import metrics from '@styles/metrics';

import * as Styles from './DeathDay.styles';
import { useDeathDay } from './use-death-day';

type DeathDayProps = {
  day?: string | null;
};

export const DeathDay = (props: DeathDayProps) => {
  const deathDay = useDeathDay({ day: props.day });

  if (!props.day) {
    return null;
  }

  return (
    <Styles.Wrapper>
      <Styles.IconWrapper>
        <SVGIcon size={metrics.xl} color="buttonText" id="christianity" />
      </Styles.IconWrapper>
      <Styles.DateText testID="death-day-text">{deathDay}</Styles.DateText>
    </Styles.Wrapper>
  );
};
