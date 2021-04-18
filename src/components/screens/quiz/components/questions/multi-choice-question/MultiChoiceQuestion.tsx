import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import MultiChoiceQuestionListItem from './multi-choice-question-list-item/MultiChoiceQuestionListItem';
import NextButton from '../next-button/NextButton';

type MultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
  answers: string[];
};

const MultiChoiceQuestion = ({ onPressNext, answers }: MultiChoiceQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

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
        data={answers}
      />
      <NextButton
        onPress={() => onPressNext(selectedAnswer)}
        isDisabled={!selectedAnswer}
      />
    </>
  );
};

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isFocused || !nextState.isFocused)
  && (!previousState.isFocused || nextState.isFocused);

export default memo(MultiChoiceQuestion, shouldComponentUpdate);
