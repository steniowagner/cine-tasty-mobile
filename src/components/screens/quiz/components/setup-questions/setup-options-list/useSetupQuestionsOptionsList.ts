import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';

type UseSetupQuestionsOptionsListProps = {
  options: Types.QuizFilterOption[];
};

export const useSetupQuestionsOptionsList = (
  props: UseSetupQuestionsOptionsListProps,
) => {
  const translations = useTranslations();

  const options = useMemo(
    () =>
      props.options.map(option => ({
        ...option,
        title: translations.translate(
          `${
            Translations.Tags.QUIZ
          }:${`${option.option}_${option.id}`}` as Translations.Tags,
        ),
      })),
    [translations.translate, props.options],
  );

  return {
    options,
  };
};
