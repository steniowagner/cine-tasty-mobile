import {useMemo} from 'react';

import {Colors} from 'styled-components/native';

import {Icons} from '@components';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';

type UseResultListItemProps = {
  result: Omit<Types.QuizResult, 'question'>;
};

const useResultListItem = (props: UseResultListItemProps) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      correctAnswer: `${translations.translate(
        Translations.Tags.QUIZ_ANSWER,
      )}: ${props.result.answer}`,
      userAnswer: `${translations.translate(
        Translations.Tags.QUIZ_YOUR_ANSWER,
      )}: ${props.result.userAnswer}`,
    }),
    [translations.translate],
  );

  const icon = useMemo(
    () => ({
      id: props.result.isCorrect
        ? ('checkbox-circle' as Icons)
        : ('close-circle' as Icons),
      colorThemeRef: props.result.isCorrect
        ? ('green' as keyof Colors)
        : ('red' as keyof Colors),
    }),
    [props.result.isCorrect],
  );

  return {texts, icon};
};

export default useResultListItem;
