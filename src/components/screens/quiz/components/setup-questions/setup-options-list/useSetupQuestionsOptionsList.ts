import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type UseSetupQuestionsOptionsListProps = {
  indexLastOptionSelected: number;
};

const useSetupQuestionsOptionsList = ({
  indexLastOptionSelected,
}: UseSetupQuestionsOptionsListProps) => {
  const [indexOptionSelected, setIndexOptionSelected] = useState<number>(
    indexLastOptionSelected,
  );

  const { t } = useTranslation();

  return {
    onSelectOption: setIndexOptionSelected,
    indexOptionSelected,
    t,
  };
};

export default useSetupQuestionsOptionsList;
