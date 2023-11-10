import { useMemo } from 'react';

import { ISO6391Language } from '@/types/schema';
import { useTranslation } from '@hooks';

type UseDeathDayParams = {
  day: string;
};

export const useDeathDay = (params: UseDeathDayParams) => {
  const translation = useTranslation();

  const deathDay = useMemo(() => {
    const splittedDate = params.day.split('-');
    if (splittedDate.length !== 3) {
      return;
    }
    const [year, month, day] = splittedDate;
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
