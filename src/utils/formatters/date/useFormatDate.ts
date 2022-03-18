import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';

export const useFormatDate = () => {
  const translations = useTranslations();

  const format = useCallback(
    (date: string) => {
      if (!date) {
        return '-';
      }
      const [year, month, day] = date.split('-');
      const isCurrentLanguageEnglish =
        translations.language.toLocaleLowerCase() ===
        SchemaTypes.ISO6391Language.EN.toLocaleLowerCase();
      if (isCurrentLanguageEnglish) {
        return `${year}-${month}-${day}`;
      }
      return `${day}/${month}/${year}`;
    },
    [translations.language],
  );

  return {
    format,
  };
};
