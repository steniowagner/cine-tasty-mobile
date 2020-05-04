import React from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { QuizStackParams } from '../../routes/route-params-types';
import useQuestions from './useQuestions';

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUESTIONS'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const Questions = ({ route }: Props) => {
  useQuestions(route);

  return (
    <View
      style={{ width: '100%', height: '100%', backgroundColor: '#f0f ' }}
    />
  );
};

export default Questions;
