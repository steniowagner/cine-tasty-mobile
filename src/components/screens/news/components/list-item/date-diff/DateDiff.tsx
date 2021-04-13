import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

const DefaultText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => (theme.id === Types.ThemeId.DARK ? 'white' : theme.colors.buttonText)};
`;

const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
const ONE_MONTH_IN_SECONDS = ONE_DAY_IN_SECONDS * 31;
const ONE_YEAR_IN_SECONDS = ONE_MONTH_IN_SECONDS * 12;

type Props = {
  date: string;
  now: Date;
};

const DateDiff = ({ now, date }: Props) => {
  const { t } = useTranslation();

  const handleYearsPassed = (value: number): string => t(TRANSLATIONS.TIME_YEAR, { value });

  const handleMonthsPassed = (value: number): string => t(TRANSLATIONS.TIME_MONTH, { value });

  const handleDaysPassed = (value: number): string => t(TRANSLATIONS.TIME_DAY, { value });

  const handleHoursPassed = (value: number): string => t(TRANSLATIONS.TIME_HOUR, { value });

  const handleMinutesPassed = (value: number): string => t(TRANSLATIONS.TIME_MINUTE, { value });

  const handleSecondsPassed = (value: number): string => t(TRANSLATIONS.TIME_SECOND, { value });

  const getDateDiffInSeconds = (): number => {
    const peaceNewsDate = new Date(date);

    return Math.abs(now.getTime() - peaceNewsDate.getTime()) / 1000;
  };

  const getDateDiffText = (): string => {
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
  };

  return <DefaultText>{getDateDiffText()}</DefaultText>;
};

export default DateDiff;
