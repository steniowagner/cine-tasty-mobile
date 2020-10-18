import React from 'react';

import { useParseDateToLocaleDate } from 'hooks';

import InfoText from '../InfoText';

type BirthdayTextProps = {
  rawBirthDate: string;
};

const BirthDayText = ({ rawBirthDate }: BirthdayTextProps) => {
  const { dateText } = useParseDateToLocaleDate(rawBirthDate);

  return <InfoText>{dateText}</InfoText>;
};

export default BirthDayText;
