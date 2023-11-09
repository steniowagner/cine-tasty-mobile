import { useCallback, useMemo } from 'react';

import { ISO6391Language } from '@schema-types';
import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

type UseBirthDayTextParams = {
  rawDateString: string;
};

export const useBirthDayText = (params: UseBirthDayTextParams) => {
  const translations = useTranslation();

  const parse = useCallback(() => {
    const [year, month, day] = params.rawDateString.split('-');
    const monthText = translations.translate(
      `${Translations.Miscellaneous.MONTHS}.${
        Number(month) - 1
      }` as Translations.Tags,
    );
    switch (translations.currentLanguage as string) {
      case ISO6391Language.pt:
      case ISO6391Language.es:
        return `${day} de ${monthText.toLowerCase()} de ${year}`;
      case ISO6391Language.en:
        return `${monthText} ${day}, ${year}`;
      default:
        return '-';
    }
  }, [
    translations.translate,
    translations.currentLanguage,
    params.rawDateString,
  ]);

  const parseRawDateToLocaleDateText = useCallback(() => {
    const rawDate = new Date(params.rawDateString);
    const isInvalidDate = Number.isNaN(rawDate.getTime());
    if (isInvalidDate) {
      return '-';
    }
    return parse();
  }, [params.rawDateString, parse]);

  const text = useMemo(() => {
    if (!params.rawDateString) {
      return '-';
    }
    return parseRawDateToLocaleDateText();
  }, [parseRawDateToLocaleDateText, params.rawDateString]);

  return {
    text,
  };
};
