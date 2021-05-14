import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useBooleanQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>(undefined);
  const { t } = useTranslation();

  return {
    setSelectedAnswer,
    selectedAnswer,
    t,
  };
};

export default useBooleanQuestion;
