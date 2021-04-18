import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import { QuizStackParams } from '../../routes/route-params-types';
import ResultListItem from './result-list-item/ResultListItem';
import * as Styles from './Results.styles';
import useResults from './useResults';

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'RESULTS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'RESULTS'>;

type ResultsProps = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const Results = ({ navigation, route }: ResultsProps) => {
  const { onPressPlayAgain, results, t } = useResults({ navigation, route });

  useLayoutEffect(() => {
    const scores = results.reduce(
      (total, current) => total + Number(current.isCorrect),
      0,
    );

    navigation.setOptions({
      title: `${t(TRANSLATIONS.QUIZ_SCORES)} ${scores}/${results.length}!`,
    });
  }, [results]);

  return (
    <Styles.Wrapper>
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
      <Styles.PlayAgainButtonWrapper>
        <RoundedButton
          text={t(TRANSLATIONS.QUIZ_PLAY_AGAIN)}
          onPress={onPressPlayAgain}
        />
      </Styles.PlayAgainButtonWrapper>
    </Styles.Wrapper>
  );
};

export default Results;
