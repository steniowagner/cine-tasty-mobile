import React from 'react';

import InfoText, {DEFAULT_MARGIN_VERTICAL} from '../InfoText';
import {useBirthDayText} from './useBirthDayText';

type BirthdayTextProps = {
  rawBirthDate: string;
};

export const BirthDayText = (props: BirthdayTextProps) => {
  const birthDayText = useBirthDayText({rawDateString: props.rawBirthDate});

  return (
    <InfoText marginBottom={DEFAULT_MARGIN_VERTICAL - 3} testID="birthday-text">
      {birthDayText.text}
    </InfoText>
  );
};
