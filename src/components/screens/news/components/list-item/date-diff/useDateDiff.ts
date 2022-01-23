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

const useDateDiff = ({date, now}: UseDateDiffProps) => {
  const {t} = useTranslation();

  const handleYearsPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_YEAR, {value}),
    [t],
  );

  const handleMonthsPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_MONTH, {value}),
    [t],
  );

  const handleDaysPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_DAY, {value}),
    [t],
  );

  const handleHoursPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_HOUR, {value}),
    [t],
  );

  const handleMinutesPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_MINUTE, {value}),
    [t],
  );

  const handleSecondsPassed = useCallback(
    (value: number): string => t(TRANSLATIONS.TIME_SECOND, {value}),
    [t],
  );

  const getDateDiffInSeconds = useCallback((): number => {
    const peaceNewsDate = new Date(date);

    return Math.abs(now.getTime() - peaceNewsDate.getTime()) / 1000;
  }, [date, now]);

  const getDateDiffText = useCallback((): string => {
    const diffValue = getDateDiffInSeconds();
    const yearsPassed = Math.floor(diffValue / ONE_YEAR_IN_SECONDS);

    if (yearsPassed > 0) {
      return handleYearsPassed(yearsPassed);
    }

    const monthsPassed = Math.floor(diffValue / ONE_MONTH_IN_SECONDS);

    if (monthsPassed > 0) {
      return handleMonthsPassed(monthsPassed);
    }

    const daysPassed = Math.floor(diffValue / ONE_DAY_IN_SECONDS);

    if (daysPassed > 0) {
      return handleDaysPassed(daysPassed);
    }

    const hoursPassed = Math.floor(diffValue / ONE_HOUR_IN_SECONDS);

    if (hoursPassed > 0) {
      return handleHoursPassed(hoursPassed);
    }

    const minutesPassed = Math.floor(diffValue / ONE_MINUTE_IN_SECONDS);

    if (minutesPassed > 0) {
      return handleMinutesPassed(minutesPassed);
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

  const dateDiffText = useMemo(() => getDateDiffText(), [getDateDiffText]);

  return {
    dateDiffText,
  };
};

export default useDateDiff;
