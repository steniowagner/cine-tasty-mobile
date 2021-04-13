import React, { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import RoundedButton from '@components/common/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import { QuizStackParams } from '../../routes/route-params-types';
import ResultListItem from './ResultListItem';
import useResults from './useResults';

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
          text={t(TRANSLATIONS.QUIZ_PLAY_AGAIN)}
          onPress={onPressPlayAgain}
        />
      </PlayAgainButtonWrapper>
    </Wrapper>
  );
};

export default Results;
