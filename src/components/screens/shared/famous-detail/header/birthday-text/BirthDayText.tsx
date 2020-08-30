import React from 'react';

import { useParseDateToLocaleDate } from 'hooks';
import { ParseDateOptions } from 'types';

import InfoText from '../InfoText';

const parseDateOptions: ParseDateOptions = {
  year: 'numeric',
  day: '2-digit',
  month: 'long',
};

type BirthdayTextProps = {
  rawBirthDate: string;
};

const BirthDayText = ({ rawBirthDate }: BirthdayTextProps) => {
  const { dateText } = useParseDateToLocaleDate({
    rawDateString: rawBirthDate,
    options: parseDateOptions,
  });
  console.log('rawBirthDate: ', rawBirthDate);
  console.log('dateText: ', dateText);

  return <InfoText>{dateText}</InfoText>;
};

export default BirthDayText;
