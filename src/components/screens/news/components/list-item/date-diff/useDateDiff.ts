import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 31;
const ONE_YEAR_IN_SECONDS = ONE_MONTH_IN_SECONDS * 12;

type UseDateDiffProps = {
  date: string;
  now: Date;
};

const useDateDiff = (props: UseDateDiffProps) => {
  const {t} = useTranslation();

  const handleYearsPassed = useCallback(
    (value: number) => t(TRANSLATIONS.TIME_YEAR, {value}),
    [t],
  );

  const handleMonthsPassed = useCallback(
    (value: number) => {
      if (value % 12 === 0) {
        return handleYearsPassed(value / 12);
      }
      return t(TRANSLATIONS.TIME_MONTH, {value});
    },
    [t],
  );

  const handleDaysPassed = useCallback(
    (value: number) => t(TRANSLATIONS.TIME_DAY, {value}),
    [t],
  );

  const handleHoursPassed = useCallback(
    (value: number) => t(TRANSLATIONS.TIME_HOUR, {value}),
    [t],
  );

  const handleMinutesPassed = useCallback(
    (value: number) => t(TRANSLATIONS.TIME_MINUTE, {value}),
    [t],
  );

  const handleSecondsPassed = useCallback(
    (value: number) => t(TRANSLATIONS.TIME_SECOND, {value}),
    [t],
  );

  const getDateDiffInSeconds = useCallback(() => {
    const past = new Date(props.date);
    return Math.abs(props.now.getTime() - past.getTime()) / 1000;
  }, [props.date, props.now]);

  const getDateDiffText = useCallback(() => {
    const diffValue = getDateDiffInSeconds();
    const yearsPassed = diffValue / ONE_YEAR_IN_SECONDS;
    if (yearsPassed >= 1) {
      return handleYearsPassed(Math.round(yearsPassed));
    }

    const monthsPassed = diffValue / ONE_MONTH_IN_SECONDS;
    if (monthsPassed >= 1) {
      return handleMonthsPassed(Math.round(monthsPassed));
    }

    const daysPassed = diffValue / ONE_DAY_IN_SECONDS;
    if (daysPassed >= 1) {
      return handleDaysPassed(Math.round(daysPassed));
    }

    const hoursPassed = diffValue / ONE_HOUR_IN_SECONDS;
    if (hoursPassed >= 1) {
      return handleHoursPassed(Math.round(hoursPassed));
    }

    const minutesPassed = diffValue / ONE_MINUTE_IN_SECONDS;
    if (minutesPassed >= 1) {
      return handleMinutesPassed(Math.round(minutesPassed));
    }

    return handleSecondsPassed(diffValue);
  }, [
    getDateDiffInSeconds,
    handleDaysPassed,
    handleHoursPassed,
    handleMinutesPassed,
    handleMonthsPassed,
    handleSecondsPassed,
    handleYearsPassed,
  ]);

  const text = useMemo(() => getDateDiffText(), [getDateDiffText]);

  return {
    text,
  };
};

export default useDateDiff;
