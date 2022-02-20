import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import metrics from '@styles/metrics';

import {ResultsStackProps} from '../../routes/route-params-types';
import ResultListItem from './result-list-item/ResultListItem';
import * as Styles from './Results.styles';
import useResults from './useResults';

const Results = (props: ResultsStackProps) => {
  const results = useResults(props);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: results.texts.headerText,
    });
  }, [results.texts.headerText, props.navigation]);

  return (
    <Styles.Wrapper>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: metrics.getWidthFromDP('20%'),
          paddingHorizontal: metrics.largeSize,
          paddingTop: metrics.largeSize,
        }}
        testID="results-list">
        {results.quizResults.map((result, index) => (
          <ResultListItem key={`${index}`} result={result} />
        ))}
      </ScrollView>
      <Styles.PlayAgainButtonWrapper>
        <RoundedButton
          onPress={results.onPressPlayAgain}
          text={results.texts.playAgain}
        />
      </Styles.PlayAgainButtonWrapper>
    </Styles.Wrapper>
  );
};

export default Results;
