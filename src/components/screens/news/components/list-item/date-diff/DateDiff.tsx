import React from 'react';

import * as Styles from './DateDiff.styles';
import useDateDiff from './useDateDiff';

type DateDiffProps = {
  date: string;
  now: Date;
};

const DateDiff = ({ date, now }: DateDiffProps) => {
  const { dateDiffText } = useDateDiff({ date, now });

  return <Styles.DefaultText>{dateDiffText}</Styles.DefaultText>;
};

export default DateDiff;
