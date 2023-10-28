import { useMemo } from 'react';

import { Colors } from 'styled-components/native';

import { Icons } from '@common-components';
import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

import { QuizResult } from '../../use-results';

type UseResultListItemParams = {
  result: Omit<QuizResult, 'question'>;
};

export const useResultListItem = (params: UseResultListItemParams) => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      correctAnswer: `${translation.translate(
        Translations.Quiz.QUIZ_ANSWER,
      )}: ${params.result.answer}`,
      userAnswer: `${translation.translate(
        Translations.Quiz.QUIZ_YOUR_ANSWER,
      )}: ${params.result.userAnswer}`,
    }),
    [translation.translate],
  );

  const icon = useMemo(
    () => ({
      id: params.result.isCorrect
        ? ('checkbox-circle' as Icons)
        : ('close-circle' as Icons),
      colorThemeRef: params.result.isCorrect
        ? ('green' as keyof Colors)
        : ('red' as keyof Colors),
    }),
    [params.result.isCorrect],
  );

  return { texts, icon };
};
