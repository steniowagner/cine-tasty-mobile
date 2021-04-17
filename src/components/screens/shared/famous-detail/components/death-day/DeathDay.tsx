import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { formatDate } from '@utils/formatters';
import metrics from '@styles/metrics';

import * as Styles from './DeathDay.styles';

type Props = {
  deathDate: string;
};

const DeathInfo = ({ deathDate }: Props) => {
  const dateText = formatDate(deathDate);

  return (
    <Styles.Wrapper
      testID="death-day-info"
    >
      <Styles.IconWrapper>
        <SVGIcon
          size={metrics.extraLargeSize}
          colorThemeRef="buttonText"
          id="christianity"
        />
      </Styles.IconWrapper>
      <Styles.DateText>{dateText}</Styles.DateText>
    </Styles.Wrapper>
  );
};

export default DeathInfo;
