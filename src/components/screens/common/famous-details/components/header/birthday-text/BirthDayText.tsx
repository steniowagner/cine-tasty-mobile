import React from 'react';

import * as HeaderStyles from '../Header.styles';
import {useBirthDayText} from './useBirthDayText';

type BirthdayTextProps = {
  rawBirthDate: string;
};

export const BirthDayText = (props: BirthdayTextProps) => {
  const birthDayText = useBirthDayText({rawDateString: props.rawBirthDate});

  return (
    <HeaderStyles.DefaultText
      marginBottom={HeaderStyles.DEFAULT_MARGIN_VERTICAL - 3}
      testID="birthday-text">
      {birthDayText.text}
    </HeaderStyles.DefaultText>
  );
};
