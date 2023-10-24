import React from 'react';
import { View } from 'react-native';

import { RoundedButton } from '@common-components';

import { ChooseOptionSection } from './components/choose-option-section/ChooseOptionSection';
import { SetupQuestionsModal } from './components/setup-questions-modal/SetupQuestionModal';
import { useSetupQuestions } from './use-setup-questions/use-setup-questions';
import { SetupQuestionsProps } from '../../routes/route-params-types';
import { NumberOfQuestions } from './components/number-of-questions/NumberOfQuestionts';
import { SectionTitle } from './components/choose-option-section/ChooseOptionSection.styles';
import * as Styles from './SetupQuestions.styles';

export const SetupQuestions = (props: SetupQuestionsProps) => {
  const setupQuestions = useSetupQuestions({
    navigation: props.navigation,
  });

  return (
    <>
      <SetupQuestionsModal
        onConfirmSelectedOption={setupQuestions.onPressConfirmSelectedOption}
        options={setupQuestions.options}
        optionSelected={setupQuestions.optionForSectionSelected}
        onClose={setupQuestions.onCloseSetupQuestionsModal}
        isOpen={setupQuestions.isSetupQuestionsModalOpen}
        modalTitle={setupQuestions.texts.modalTitle}
      />
      <Styles.Wrapper>
        <View>
          <Styles.SectionWrapper>
            <ChooseOptionSection
              onPressOption={setupQuestions.onPressSectionOption}
              section="difficulty"
              title={setupQuestions.texts.sections.difficulty}
              selectedOption={
                setupQuestions.optionsDatasetForSectionSelected.difficulty
              }
            />
          </Styles.SectionWrapper>
          <Styles.SectionWrapper>
            <ChooseOptionSection
              onPressOption={setupQuestions.onPressSectionOption}
              section="category"
              title={setupQuestions.texts.sections.category}
              selectedOption={
                setupQuestions.optionsDatasetForSectionSelected.category
              }
            />
          </Styles.SectionWrapper>
          <Styles.SectionWrapper>
            <ChooseOptionSection
              onPressOption={setupQuestions.onPressSectionOption}
              section="type"
              title={setupQuestions.texts.sections.type}
              selectedOption={
                setupQuestions.optionsDatasetForSectionSelected.type
              }
            />
          </Styles.SectionWrapper>
          <Styles.SectionWrapper>
            <SectionTitle testID="section-title">
              {setupQuestions.texts.sections.numberOfQuestions}
            </SectionTitle>
            <NumberOfQuestions
              onSetNumberQuestions={setupQuestions.setNumberOfQuestions}
              numberOfQuestions={setupQuestions.numberOfQuestions}
            />
          </Styles.SectionWrapper>
        </View>
        <RoundedButton
          onPress={setupQuestions.onPressStartQuiz}
          text={setupQuestions.texts.startQuiz}
        />
      </Styles.Wrapper>
    </>
  );
};
