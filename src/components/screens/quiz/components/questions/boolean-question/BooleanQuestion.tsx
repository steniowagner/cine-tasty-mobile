import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './BooleanQuestion.styles';
import NextButton from '../next-button/NextButton';

type BooleanQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
};

const BooleanQuestion = ({ onPressNext }: BooleanQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>(undefined);
  const { t } = useTranslation();

  return (
    <>
      <Styles.Wrapper
        testID="boolean-question"
      >
        <Styles.OptionButton
          onPress={() => setSelectedAnswer(true)}
          isSelected={selectedAnswer === true}
          testID={
            selectedAnswer === true ? 'true-option-button-selected' : 'true-option-button'
          }
        >
          <Styles.OptionText>{t(TRANSLATIONS.QUIZ_TRUE)}</Styles.OptionText>
        </Styles.OptionButton>
        <Styles.OptionButton
          onPress={() => setSelectedAnswer(false)}
          isSelected={selectedAnswer === false}
          testID={
            selectedAnswer === false
              ? 'false-option-button-selected'
              : 'false-option-button'
          }
        >
          <Styles.OptionText>{t(TRANSLATIONS.QUIZ_FALSE)}</Styles.OptionText>
        </Styles.OptionButton>
      </Styles.Wrapper>
      <NextButton
        onPress={() => onPressNext(String(selectedAnswer))}
        isDisabled={selectedAnswer === undefined}
      />
    </>
  );
};

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isFocused || !nextState.isFocused)
  && (!previousState.isFocused || nextState.isFocused);

export default memo(BooleanQuestion, shouldComponentUpdate);
