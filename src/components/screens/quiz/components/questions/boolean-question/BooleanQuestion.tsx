import React, { useState, memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import NextButton from '../NextButton';

export const TRUE_TEXT_I18N_REF = 'translations:quiz:true';
export const FALSE_TEXT_I18N_REF = 'translations:quiz:false';

interface OptionSelectedStyleProps {
  readonly isSelected: boolean;
}

const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const OptionButton = styled(TouchableOpacity)<OptionSelectedStyleProps>`
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : '#CCC')};
`;

const OptionText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
  text-transform: uppercase;
`;

type Props = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
};

const BooleanQuestion = ({ onPressNext }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>(undefined);
  const { t } = useTranslation();

  return (
    <>
      <Wrapper
        testID="boolean-question"
      >
        <OptionButton
          onPress={() => setSelectedAnswer(true)}
          isSelected={selectedAnswer === true}
          testID={
            selectedAnswer === true ? 'true-option-button-selected' : 'true-option-button'
          }
        >
          <OptionText>{t(TRUE_TEXT_I18N_REF)}</OptionText>
        </OptionButton>
        <OptionButton
          onPress={() => setSelectedAnswer(false)}
          isSelected={selectedAnswer === false}
          testID={
            selectedAnswer === false
              ? 'false-option-button-selected'
              : 'false-option-button'
          }
        >
          <OptionText>{t(FALSE_TEXT_I18N_REF)}</OptionText>
        </OptionButton>
      </Wrapper>
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
