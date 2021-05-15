import React from 'react';

import { useParseDateToLocaleDate } from '@hooks';

import InfoText, { DEFAULT_MARGIN_VERTICAL } from '../InfoText';

type BirthdayTextProps = {
  rawBirthDate: string;
};

const BirthDayText = (props: BirthdayTextProps) => {
  const parseDateToLocaleDate = useParseDateToLocaleDate(props.rawBirthDate);

  return (
    <InfoText
      marginBottom={DEFAULT_MARGIN_VERTICAL - 3}
    >
      {parseDateToLocaleDate.dateText}
    </InfoText>
  );
};

export default BirthDayText;
