import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import RoundedButton from 'components/common/RoundedButton';

import { QuizStackParams } from '../routes/route-params-types';
import LOCAL_ROUTES from '../routes/route-names';

export const I18N_CHOOSE_QUESTIONS_REF = 'translations:quiz:chooseQuestions';
export const I18N_DESCRIPTION_REF = 'translations:quiz:decription';
export const I18N_CHALLENGE_REF = 'translations:quiz:challenge';
export const I18N_WELCOME_REF = 'translations:quiz:welcome';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
`;

const LargeText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

const SubText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: CircularStd-Bold;
  text-align: center;
`;

type QuizScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUIZ'>;

type Props = {
  navigation: QuizScreenNavigationProp;
};

const Quiz = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LargeText>{t(I18N_WELCOME_REF)}</LargeText>
      <SubText>{t(I18N_DESCRIPTION_REF)}</SubText>
      <LargeText>{t(I18N_CHALLENGE_REF)}</LargeText>
      <RoundedButton
        onPress={() => navigation.navigate(LOCAL_ROUTES.SETUP_QUESTIONS.id)}
        text={t(I18N_CHOOSE_QUESTIONS_REF)}
      />
    </Wrapper>
  );
};

export default Quiz;
