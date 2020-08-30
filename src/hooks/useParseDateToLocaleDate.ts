import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ParseDateOptions } from 'types';

type Props = {
  options: ParseDateOptions;
  rawDateString: string;
};

type State = {
  dateText: string;
};

export const useParseDateToLocaleDate = ({ rawDateString, options }: Props): State => {
  const [dateText, setDateText] = useState<string>('-');

  const { i18n } = useTranslation();

  const parseRawDateToLocaleDateText = useCallback(() => {
    const rawDate = new Date(rawDateString);

    if (Number.isNaN(rawDate.getTime())) {
      return;
    }

    const date = new Date(rawDate.getTime() + 1000 * 60 * 60 * 24);

    const dateToText = date.toLocaleDateString(i18n.language || 'en', options);

    setDateText(dateToText);
  }, []);

  useEffect(() => {
    if (rawDateString) {
      parseRawDateToLocaleDateText();
    }
  }, []);

  return {
    dateText,
  };
};
