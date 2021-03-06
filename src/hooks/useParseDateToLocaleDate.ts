import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type State = {
  dateText: string;
};

export const useParseDateToLocaleDate = (rawDateString: string): State => {
  const [dateText, setDateText] = useState<string>('-');

  const { i18n, t } = useTranslation();

  const parseDateToLocaleTextDate = useCallback(
    (rawDate: string, currentLanguage: string): string => {
      const [year, month, day] = rawDate.split('-');

      let parsedDate: string;

      const monthText = t(`translations:months.${Number(month) - 1}`);

      switch (currentLanguage) {
        case 'ptBR':
        case 'ptPT':
        case 'es':
          parsedDate = `${day} de ${monthText.toLowerCase()} de ${year}`;
          break;

        case 'sv':
          parsedDate = `${day} ${monthText.toLowerCase()} ${year}`;
          break;

        case 'en':
          parsedDate = `${monthText} ${day}, ${year}`;
          break;

        default:
          parsedDate = '-';
      }

      return parsedDate;
    },
    [rawDateString, i18n],
  );

  const parseRawDateToLocaleDateText = useCallback(() => {
    const rawDate = new Date(rawDateString);

    if (Number.isNaN(rawDate.getTime())) {
      return;
    }

    const dateParsed = parseDateToLocaleTextDate(rawDateString, i18n.language);

    setDateText(dateParsed);
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
