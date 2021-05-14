import React from 'react';
import { SafeAreaView, View } from 'react-native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';

import { SetupQuestionsStackProps } from '../../routes/route-params-types';
import NumberOfQuestions from './number-of-questions/NumberOfQuestionts';
import DropdownOption from './drop-down-option/DropdownOption';
import useSetupQuestions from './useSetupQuestions';
import * as Styles from './SetupQuestions.styles';

const SetupQuestions = (props: SetupQuestionsStackProps) => {
  const setupQuestions = useSetupQuestions({ navigation: props.navigation });

  return (
    <Styles.Wrapper>
      <View>
        <Styles.Label>{setupQuestions.t(TRANSLATIONS.QUIZ_DIFFICULTY)}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('DIFFICULTY')}
          selectedOption={setupQuestions.t(
            `${TRANSLATIONS.QUIZ}:${setupQuestions.questionDifficulty.id}`,
          )}
        />
        <Styles.Label>{setupQuestions.t(TRANSLATIONS.QUIZ_CATEGORY)}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('CATEGORY')}
          selectedOption={setupQuestions.t(
            `${TRANSLATIONS.QUIZ}:${setupQuestions.questionCategory.id}`,
          )}
        />
        <Styles.Label>{setupQuestions.t(TRANSLATIONS.QUIZ_TYPE)}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('TYPE')}
          selectedOption={setupQuestions.t(
            `${TRANSLATIONS.QUIZ}:${setupQuestions.questionType.id}`,
          )}
        />
        <Styles.Label>
          {setupQuestions.t(TRANSLATIONS.QUIZ_NUMBER_OF_QUESTIONS)}
        </Styles.Label>
        <NumberOfQuestions
          onSetNumberQuestions={setupQuestions.setNumberOfQuestions}
          numberOfQuestions={setupQuestions.numberOfQuestions}
        />
      </View>
      <SafeAreaView>
        <Styles.RoundedButtonWrapper>
          <RoundedButton
            text={setupQuestions.t(TRANSLATIONS.QUIZ_START_BUTTON)}
            onPress={setupQuestions.onPressStartQuiz}
          />
        </Styles.RoundedButtonWrapper>
      </SafeAreaView>
    </Styles.Wrapper>
  );
};

export default SetupQuestions;
