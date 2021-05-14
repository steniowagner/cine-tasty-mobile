import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type UseSetupQuestionsOptionsListProps = {
  indexLastOptionSelected: number;
};

const useSetupQuestionsOptionsList = (props: UseSetupQuestionsOptionsListProps) => {
  const [indexOptionSelected, setIndexOptionSelected] = useState<number>(
    props.indexLastOptionSelected,
  );

  const { t } = useTranslation();

  return {
    onSelectOption: setIndexOptionSelected,
    indexOptionSelected,
    t,
  };
};

export default useSetupQuestionsOptionsList;
