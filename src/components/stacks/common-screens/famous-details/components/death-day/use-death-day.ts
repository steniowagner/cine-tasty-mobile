import { useMemo } from 'react';

import { ISO6391Language } from '@/types/schema';
import { useTranslation } from '@hooks';

type UseDeathDayParams = {
  day?: string | null;
};

export const useDeathDay = (params: UseDeathDayParams) => {
  const translation = useTranslation();

  const deathDay = useMemo(() => {
    if (!params.day) {
      return '-';
    }
    const [year, month, day] = params.day.split('-');
    const isCurrentLanguageEnglish =
      translation.currentLanguage.toLocaleLowerCase() ===
      ISO6391Language.en.toLocaleLowerCase();
    if (isCurrentLanguageEnglish) {
      return `${year}-${month}-${day}`;
    }
    return `${day}/${month}/${year}`;
  }, [translation.currentLanguage, params.day]);

  return deathDay;
};
