import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { RoundedButton } from '@common-components';
import { HeaderTitle } from '@navigation';

import { ResultListItem } from './components/result-list-item/ResultListItem';
import { ResultsProps } from '../../routes/route-params-types';
import { useResults } from './use-results';
import * as Styles from './Results.styles';

export const Results = (props: ResultsProps) => {
  const results = useResults(props);

  useEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => <HeaderTitle text={results.texts.headerText} />,
    });
  }, [results.texts.headerText]);

  return (
    <Styles.Wrapper>
      <FlatList
        renderItem={({ item }) => <ResultListItem result={item} />}
        keyExtractor={(item, index) => `${item.question}-${index}`}
        data={results.quizResults}
        contentContainerStyle={Styles.sheet.list}
        testID="results-list"
      />
      <Styles.PlayAgainButtonWrapper>
        <RoundedButton
          onPress={results.onPressPlayAgain}
          text={results.texts.playAgain}
        />
      </Styles.PlayAgainButtonWrapper>
    </Styles.Wrapper>
  );
};
