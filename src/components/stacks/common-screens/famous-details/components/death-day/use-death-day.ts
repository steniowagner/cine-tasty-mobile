import { useCallback } from 'react';

import { ISO6391Language } from '@/types/schema';
import { useTranslation } from '@/hooks';

type UseDeathDayParams = {
  day: string;
};

export const useDeathDay = (params: UseDeathDayParams) => {
  const translation = useTranslation();

  const format = useCallback(
    (date: string) => {
      if (!date) {
        return '-';
      }
      const [year, month, day] = date.split('-');
      const isCurrentLanguageEnglish =
        translation.currentLanguage.toLocaleLowerCase() ===
        ISO6391Language.en.toLocaleLowerCase();
      if (isCurrentLanguageEnglish) {
        return `${year}-${month}-${day}`;
      }
      return `${day}/${month}/${year}`;
    },
    [translation.currentLanguage],
  );

  return format(params.day);
};
