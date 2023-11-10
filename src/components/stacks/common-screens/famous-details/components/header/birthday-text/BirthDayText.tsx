import React from 'react';

import { Typography } from '@/components/common';

import { useBirthDayText } from './useBirthDayText';

type BirthdayTextProps = {
  rawBirthDate?: string | null;
};

export const BirthDayText = (props: BirthdayTextProps) => {
  const birthDayText = useBirthDayText({
    rawDateString: props.rawBirthDate ?? '-',
  });

  if (!props.rawBirthDate) {
    return;
  }

  return (
    <Typography.ExtraSmallText testID="birthday-text">
      {birthDayText.text}
    </Typography.ExtraSmallText>
  );
};
