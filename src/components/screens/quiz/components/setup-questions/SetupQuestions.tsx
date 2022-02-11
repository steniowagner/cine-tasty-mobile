import React from 'react';
import {SafeAreaView, View} from 'react-native';

import RoundedButton from '@components/common/rounded-button/RoundedButton';

import NumberOfQuestions from './number-of-questions/NumberOfQuestionts';
import {SetupQuestionsStackProps} from '../../routes/route-params-types';
import DropdownOption from './drop-down-option/DropdownOption';
import useSetupQuestions from './useSetupQuestions';
import * as Styles from './SetupQuestions.styles';

const SetupQuestions = ({navigation}: SetupQuestionsStackProps) => {
  const setupQuestions = useSetupQuestions({navigation});
  return (
    <Styles.Wrapper>
      <View>
        <Styles.Label>{setupQuestions.texts.difficulties}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('difficulty')}
          selectedOption={setupQuestions.texts.difficultyDropdown}
          option="difficulty"
        />
        <Styles.Label>{setupQuestions.texts.categories}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('category')}
          selectedOption={setupQuestions.texts.categoryDropdown}
          option="category"
        />
        <Styles.Label>{setupQuestions.texts.types}</Styles.Label>
        <DropdownOption
          onPress={() => setupQuestions.onPressOptionDropdown('type')}
          selectedOption={setupQuestions.texts.typeDropdown}
          option="type"
        />
        <Styles.Label>{setupQuestions.texts.numberOfQuestions}</Styles.Label>
        <NumberOfQuestions
          onSetNumberQuestions={setupQuestions.setNumberOfQuestions}
          numberOfQuestions={setupQuestions.numberOfQuestions}
        />
      </View>
      <SafeAreaView>
        <Styles.RoundedButtonWrapper>
          <RoundedButton
            onPress={setupQuestions.onPressStartQuiz}
            text={setupQuestions.texts.startQuiz}
          />
        </Styles.RoundedButtonWrapper>
      </SafeAreaView>
    </Styles.Wrapper>
  );
};

export default SetupQuestions;
