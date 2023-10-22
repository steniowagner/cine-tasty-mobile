import { useCallback, useMemo } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 31;
const ONE_YEAR_IN_SECONDS = ONE_MONTH_IN_SECONDS * 12;
const MONTHS_IN_ONE_YEAR = 12;

type UseDateDiffProps = {
  date: string;
  now: Date;
};

export const useDateDiff = (props: UseDateDiffProps) => {
  const translation = useTranslation();

  const handleYearsPassed = useCallback(
    (value: number) =>
      translation.translate(Translations.Time.TIME_YEAR, { value }),
    [translation.translate],
  );

  const handleMonthsPassed = useCallback(
    (value: number) => {
      if (value % MONTHS_IN_ONE_YEAR === 0) {
        return handleYearsPassed(value / MONTHS_IN_ONE_YEAR);
      }
      return translation.translate(Translations.Time.TIME_MONTH, { value });
    },
    [translation.translate],
  );

  const handleDaysPassed = useCallback(
    (value: number) =>
      translation.translate(Translations.Time.TIME_DAY, { value }),
    [translation.translate],
  );

  const handleHoursPassed = useCallback(
    (value: number) =>
      translation.translate(Translations.Time.TIME_HOUR, { value }),
    [translation.translate],
  );

  const handleMinutesPassed = useCallback(
    (value: number) =>
      translation.translate(Translations.Time.TIME_MINUTE, { value }),
    [translation.translate],
  );

  const handleSecondsPassed = useCallback(
    (value: number) =>
      translation.translate(Translations.Time.TIME_SECOND, { value }),
    [translation.translate],
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
