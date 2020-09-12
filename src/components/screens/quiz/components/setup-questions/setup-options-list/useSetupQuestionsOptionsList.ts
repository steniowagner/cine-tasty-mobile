import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type State = {
  onSelectOption: (index: number) => void;
  indexOptionSelected: number;
  t: (key: string) => string;
};

type Props = {
  indexLastOptionSelected: number;
};

const useSetupQuestionsOptionsList = ({ indexLastOptionSelected }: Props): State => {
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
