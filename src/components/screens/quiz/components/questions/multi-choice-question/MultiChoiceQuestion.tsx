import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import MultiChoiceQuestionListItem from './MultiChoiceQuestionListItem';

const Wrapper = styled(View)`
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('47%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  onSelectAnswer: (answer: string) => void;
  answerSelected: string;
  answers: string[];
};

const MultiChoiceQuestion = ({ onSelectAnswer, answerSelected, answers }: Props) => (
  <Wrapper>
    <FlatList
      alwaysBounceVertical={false}
      testID="multi-choice-options"
      renderItem={({ item }) => (
        <MultiChoiceQuestionListItem
          isSelected={answerSelected === item}
          onSelectAnswer={onSelectAnswer}
          answer={item}
        />
      )}
      keyExtractor={(item) => item}
      data={answers}
    />
  </Wrapper>
);

export default MultiChoiceQuestion;
