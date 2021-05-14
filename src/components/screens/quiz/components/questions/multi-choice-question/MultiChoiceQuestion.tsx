import React, { memo } from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import MultiChoiceQuestionListItem from './multi-choice-question-list-item/MultiChoiceQuestionListItem';
import useMultiChoiceQuestion from './useMultiChoiceQuestion';
import NextButton from '../next-button/NextButton';

type MultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
  answers: string[];
};

const MultiChoiceQuestion = (props: MultiChoiceQuestionProps) => {
  const { setSelectedAnswer, selectedAnswer } = useMultiChoiceQuestion();

  return (
    <>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={{
          paddingHorizontal: metrics.smallSize,
        }}
        testID="multi-choice-options"
        renderItem={({ item }) => (
          <MultiChoiceQuestionListItem
            onSelectAnswer={() => setSelectedAnswer(item)}
            isSelected={selectedAnswer === item}
            answer={item}
          />
        )}
        keyExtractor={(item) => item}
        data={props.answers}
      />
      <NextButton
        onPress={() => props.onPressNext(selectedAnswer)}
        isDisabled={!selectedAnswer}
      />
    </>
  );
};

const shouldComponentUpdate = (
  previousState: MultiChoiceQuestionProps,
  nextState: MultiChoiceQuestionProps,
): boolean => (previousState.isFocused || !nextState.isFocused)
  && (!previousState.isFocused || nextState.isFocused);

export default memo(MultiChoiceQuestion, shouldComponentUpdate);
