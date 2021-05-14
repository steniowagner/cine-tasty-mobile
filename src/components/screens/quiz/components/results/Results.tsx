import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import { ResultsStackProps } from '../../routes/route-params-types';
import ResultListItem from './result-list-item/ResultListItem';
import * as Styles from './Results.styles';
import useResults from './useResults';

const Results = (props: ResultsStackProps) => {
  const results = useResults({
    navigation: props.navigation,
    route: props.route,
  });

  useLayoutEffect(() => {
    const scores = results.results.reduce(
      (total, current) => total + Number(current.isCorrect),
      0,
    );

    props.navigation.setOptions({
      title: `${results.t(TRANSLATIONS.QUIZ_SCORES)} ${scores}/${
        results.results.length
      }!`,
    });
  }, [results.results]);

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
        data={results.results}
      />
      <Styles.PlayAgainButtonWrapper>
        <RoundedButton
          text={results.t(TRANSLATIONS.QUIZ_PLAY_AGAIN)}
          onPress={results.onPressPlayAgain}
        />
      </Styles.PlayAgainButtonWrapper>
    </Styles.Wrapper>
  );
};

export default Results;
