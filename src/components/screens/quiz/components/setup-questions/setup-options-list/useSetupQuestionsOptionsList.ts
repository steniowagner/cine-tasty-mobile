import {useCallback, useState} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseSetupQuestionsOptionsListProps = {
  onPressSelect: (indexOptionSelected: number) => void;
  indexLastOptionSelected: number;
  closeModal: () => void;
};

const useSetupQuestionsOptionsList = (
  props: UseSetupQuestionsOptionsListProps,
) => {
  const [indexOptionSelected, setIndexOptionSelected] = useState<number>(
    props.indexLastOptionSelected,
  );

  const translations = useTranslations();

  const makeItemTitle = useCallback(
    (id: string) =>
      translations.translate(
        `${Translations.Tags.QUIZ}:${id}` as Translations.Tags,
      ),
    [translations.translate],
  );

  const handlePressSelectButton = useCallback(() => {
    props.onPressSelect(indexOptionSelected);
    props.closeModal();
  }, [indexOptionSelected, props.onPressSelect, props.closeModal]);

  return {
    selectText: translations.translate(Translations.Tags.SELECT),
    onSelectOption: setIndexOptionSelected,
    handlePressSelectButton,
    indexOptionSelected,
    makeItemTitle,
  };
};

export default useSetupQuestionsOptionsList;
