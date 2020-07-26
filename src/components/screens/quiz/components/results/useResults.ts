import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { QuizResult } from 'types';

import { QuizStackParams } from '../../routes/route-params-types';

type State = {
  onPressPlayAgain: () => void;
  t: (key: string) => string;
  results: QuizResult[];
};

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'RESULTS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'RESULTS'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const useResults = ({ navigation, route }: Props): State => {
  const [results, setResults] = useState<QuizResult[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const { questions, answers } = route.params;

    const result = questions.map((dataItem, index) => ({
      isCorrect:
        dataItem.correctAnswer.toLocaleLowerCase() === answers[index].toLocaleLowerCase(),
      answer: dataItem.correctAnswer,
      userAnswer: answers[index],
      question: dataItem.question,
    }));

    setResults(result);
  }, []);

  const onPressPlayAgain = useCallback((): void => {
    Alert.alert(
      t('translations:quiz:playAgain'),
      t('translations:quiz:playAgainDescription'),
      [
        {
          text: t('translations:quiz:no'),
          style: 'cancel',
          onPress: () => navigation.pop(3),
        },
        { text: t('translations:quiz:yes'), onPress: () => navigation.pop(2) },
      ],
      { cancelable: false },
    );
  }, []);

  return {
    onPressPlayAgain,
    results,
    t,
  };
};

export default useResults;
