import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import RoundedButton from 'components/common/RoundedButton';

import { QuizStackParams } from '../../routes/route-params-types';
import NumberOfQuestions from './NumberOfQuestionts';
import useSetupQuestions from './useSetupQuestions';
import DropdownOption from './DropdownOption';

export const QUIZ_NUMBER_OF_QUESTIONS_I18N_REF = 'translations:quiz:numberOfQuestions';
export const QUIZ_DIFFICULTY_I18N_REF = 'translations:quiz:difficulty';
export const QUIZ_CATEGORY_I18N_REF = 'translations:quiz:category';
export const QUIZ_TYPE_I18N_REF = 'translations:quiz:type';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const RoundedButtonWrapper = styled(View)`
  align-items: center;
`;

const Label = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
  navigation: StackNavigationProp<QuizStackParams, 'SETUP_QUESTIONS'>;
};

const SetupQuestions = ({ navigation }: Props) => {
  const {
    onPressOptionDropdown,
    setNumberOfQuestions,
    questionDifficulty,
    numberOfQuestions,
    questionCategory,
    onPressStartQuiz,
    questionType,
    t,
  } = useSetupQuestions({ navigation });

  return (
    <Wrapper>
      <View>
        <Label>{t(QUIZ_DIFFICULTY_I18N_REF)}</Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('DIFFICULTY')}
          selectedOption={t(`translations:quiz:${questionDifficulty.id}`)}
        />
        <Label>{t(QUIZ_CATEGORY_I18N_REF)}</Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('CATEGORY')}
          selectedOption={t(`translations:quiz:${questionCategory.id}`)}
        />
        <Label>{t(QUIZ_TYPE_I18N_REF)}</Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('TYPE')}
          selectedOption={t(`translations:quiz:${questionType.id}`)}
        />
        <Label>{t(QUIZ_NUMBER_OF_QUESTIONS_I18N_REF)}</Label>
        <NumberOfQuestions
          onSetNumberQuestions={setNumberOfQuestions}
          numberOfQuestions={numberOfQuestions}
        />
      </View>
      <SafeAreaView>
        <RoundedButtonWrapper>
          <RoundedButton
            text={t('translations:quiz:startButton')}
            onPress={onPressStartQuiz}
          />
        </RoundedButtonWrapper>
      </SafeAreaView>
    </Wrapper>
  );
};

export default SetupQuestions;
