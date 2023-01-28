import React, {useEffect} from 'react';

import {RoundedButton} from '@components';

import {ResultsStackProps} from '../../routes/route-params-types';
import {ResultListItem} from './result-list-item/ResultListItem';
import * as Styles from './Results.styles';
import {useResults} from './useResults';

export const Results = (props: ResultsStackProps) => {
  const results = useResults(props);

  useEffect(() => {
    props.navigation.setOptions({
      title: results.texts.headerText,
    });
  }, [results.texts.headerText]);

  return (
    <Styles.Wrapper>
      <Styles.ResultsList testID="results-list">
        {results.quizResults.map((result, index) => (
          <ResultListItem key={`${index}`} result={result} />
        ))}
      </Styles.ResultsList>
      <Styles.PlayAgainButtonWrapper>
        <RoundedButton
          onPress={results.onPressPlayAgain}
          text={results.texts.playAgain}
        />
      </Styles.PlayAgainButtonWrapper>
    </Styles.Wrapper>
  );
};
