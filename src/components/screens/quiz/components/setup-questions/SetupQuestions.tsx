import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';

import { QuizStackParams } from '../../routes/route-params-types';
import NumberOfQuestions from './number-of-questions/NumberOfQuestionts';
import DropdownOption from './drop-down-option/DropdownOption';
import useSetupQuestions from './useSetupQuestions';
import * as Styles from './SetupQuestions.styles';

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
    <Styles.Wrapper>
      <View>
        <Styles.Label>{t(TRANSLATIONS.QUIZ_DIFFICULTY)}</Styles.Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('DIFFICULTY')}
          selectedOption={t(`${TRANSLATIONS.QUIZ}:${questionDifficulty.id}`)}
        />
        <Styles.Label>{t(TRANSLATIONS.QUIZ_CATEGORY)}</Styles.Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('CATEGORY')}
          selectedOption={t(`${TRANSLATIONS.QUIZ}:${questionCategory.id}`)}
        />
        <Styles.Label>{t(TRANSLATIONS.QUIZ_TYPE)}</Styles.Label>
        <DropdownOption
          onPress={() => onPressOptionDropdown('TYPE')}
          selectedOption={t(`${TRANSLATIONS.QUIZ}:${questionType.id}`)}
        />
        <Styles.Label>{t(TRANSLATIONS.QUIZ_NUMBER_OF_QUESTIONS)}</Styles.Label>
        <NumberOfQuestions
          onSetNumberQuestions={setNumberOfQuestions}
          numberOfQuestions={numberOfQuestions}
        />
      </View>
      <SafeAreaView>
        <Styles.RoundedButtonWrapper>
          <RoundedButton
            text={t(TRANSLATIONS.QUIZ_START_BUTTON)}
            onPress={onPressStartQuiz}
          />
        </Styles.RoundedButtonWrapper>
      </SafeAreaView>
    </Styles.Wrapper>
  );
};

export default SetupQuestions;
