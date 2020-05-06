import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import MultiChoiceListItem from './MultiChoiceListItem';

const Wrapper = styled(View)`
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('47%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  onSelectAnswer: (answer: string) => void;
  answerSelected: string;
  answers: string[];
};

const MultiChoiceAnswer = ({ onSelectAnswer, answerSelected, answers }: Props) => (
  <Wrapper>
    <FlatList
      alwaysBounceVertical={false}
      renderItem={({ item }) => (
        <MultiChoiceListItem
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

export default MultiChoiceAnswer;
