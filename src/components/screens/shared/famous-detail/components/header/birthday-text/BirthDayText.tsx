import React from 'react';

import { useParseDateToLocaleDate } from '@hooks';

import InfoText, { DEFAULT_MARGIN_VERTICAL } from '../InfoText';

type BirthdayTextProps = {
  rawBirthDate: string;
};

const BirthDayText = ({ rawBirthDate }: BirthdayTextProps) => {
  const { dateText } = useParseDateToLocaleDate(rawBirthDate);

  return (
    <InfoText
      marginBottom={DEFAULT_MARGIN_VERTICAL - 3}
    >
      {dateText}
    </InfoText>
  );
};

export default BirthDayText;
