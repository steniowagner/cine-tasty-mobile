import { useState } from 'react';

const useMultiChoiceQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  return {
    setSelectedAnswer,
    selectedAnswer,
  };
};

export default useMultiChoiceQuestion;
