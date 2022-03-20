import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';
import {useFormatDate} from '@utils';

import * as Styles from './DeathDay.styles';

type DeathInfoProps = {
  deathDate: string;
};

const DeathInfo = (props: DeathInfoProps) => {
  const formatDate = useFormatDate();
  const dateText = formatDate.format(props.deathDate);
  return (
    <Styles.Wrapper testID="death-day-wrapper">
      <Styles.IconWrapper>
        <SVGIcon
          size={metrics.extraLargeSize}
          colorThemeRef="buttonText"
          id="christianity"
        />
      </Styles.IconWrapper>
      <Styles.DateText testID="death-day-text">{dateText}</Styles.DateText>
    </Styles.Wrapper>
  );
};

export default DeathInfo;
