import React, { useLayoutEffect, useEffect, useState } from 'react';
import { FlatList, Alert, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import RoundedButton from 'components/common/RoundedButton';
import metrics from 'styles/metrics';
import { QuizResult } from 'types';

import { QuizStackParams } from '../../routes/route-params-types';
import ResultListItem from './ResultListItem';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const PlayAgainButtonWrapper = styled(View)`
  position: absolute;
  bottom: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'RESULTS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'RESULTS'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const Results = ({ navigation, route }: Props) => {
  const [results, setResults] = useState<QuizResult[]>([]);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const scores = results.reduce(
      (total, current) => total + Number(current.isCorrect),
      0,
    );

    navigation.setOptions({
      title: `${t('translations:quiz:scores')} ${scores}/${results.length}!`,
    });
  }, [results]);

  useEffect(() => {
    const { questions, answers } = route.params;

    const result = questions.map((dataItem, index) => ({
      isCorrect:
        dataItem.correct_answer.toLocaleLowerCase()
        === answers[index].toLocaleLowerCase(),
      answer: dataItem.correct_answer,
      userAnswer: answers[index],
      question: dataItem.question,
    }));

    setResults(result);
  }, []);

  const onPressPlayAgain = (): void => {
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
  };

  return (
    <Wrapper>
      <FlatList
        renderItem={({ item }) => (
          <ResultListItem
            result={item}
          />
        )}
        contentContainerStyle={{
          paddingBottom: metrics.getWidthFromDP('20%'),
          paddingHorizontal: metrics.largeSize,
          paddingTop: metrics.largeSize,
        }}
        keyExtractor={(item) => item.question}
        data={results}
      />
      <PlayAgainButtonWrapper>
        <RoundedButton
          text={t('translations:quiz:playAgain')}
          onPress={onPressPlayAgain}
        />
      </PlayAgainButtonWrapper>
    </Wrapper>
  );
};

export default Results;
