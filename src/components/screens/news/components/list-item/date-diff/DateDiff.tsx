import React from 'react';

import * as Styles from './DateDiff.styles';
import {useDateDiff} from './useDateDiff';

type DateDiffProps = {
  date: string;
  now: Date;
};

export const DateDiff = (props: DateDiffProps) => {
  const dateDiff = useDateDiff({date: props.date, now: props.now});
  return (
    <Styles.DefaultText testID="date-diff-text">
      {dateDiff.text}
    </Styles.DefaultText>
  );
};
