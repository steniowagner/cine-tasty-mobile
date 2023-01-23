import React from 'react';
import {View} from 'react-native';

import {RoundedButton} from '@components';

import {NumberOfQuestions} from './components/number-of-questions/NumberOfQuestionts';
import {SetupQuestionsStackProps} from '../../routes/route-params-types';
import {ChooseOptionSection} from './components/choose-option-section/ChooseOptionSection';
import {SetupQuestionsOptionsList} from './components/selectable-options-modal/SelectableOptionsModal';
import {useSetupQuestions} from './useSetupQuestions';
import * as Styles from './SetupQuestions.styles';

export const SetupQuestions = (props: SetupQuestionsStackProps) => {
  const setupQuestions = useSetupQuestions({navigation: props.navigation});

  return (
    <Styles.Wrapper>
      <SetupQuestionsOptionsList
        onCloseSetupQuestionModal={setupQuestions.onCloseSetupQuestionsModal}
        isSetupQuestionModalOpen={setupQuestions.isModalOptionsListOpen}
      />
      <View>
        <Styles.SectionWrapper>
          <ChooseOptionSection
            onOpenSetupQuestionsModal={setupQuestions.onOpenSetupQuestionsModal}
            section="difficulty"
          />
        </Styles.SectionWrapper>
        <Styles.SectionWrapper>
          <ChooseOptionSection
            onOpenSetupQuestionsModal={setupQuestions.onOpenSetupQuestionsModal}
            section="category"
          />
        </Styles.SectionWrapper>
        <Styles.SectionWrapper>
          <ChooseOptionSection
            onOpenSetupQuestionsModal={setupQuestions.onOpenSetupQuestionsModal}
            section="type"
          />
        </Styles.SectionWrapper>
        <Styles.SectionWrapper>
          <Styles.SectionTitle>
            {setupQuestions.texts.numberOfQuestions}
          </Styles.SectionTitle>
          <NumberOfQuestions
            onSetNumberQuestions={setupQuestions.setNumberOfQuestions}
            numberOfQuestions={setupQuestions.numberOfQuestions}
          />
        </Styles.SectionWrapper>
      </View>
      <Styles.RoundedButtonWrapper>
        <RoundedButton
          onPress={setupQuestions.onPressStartQuiz}
          text={setupQuestions.texts.startQuiz}
        />
      </Styles.RoundedButtonWrapper>
    </Styles.Wrapper>
  );
};
