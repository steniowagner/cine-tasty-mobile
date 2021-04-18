import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';

import { QuizStackParams } from '../routes/route-params-types';
import LOCAL_ROUTES from '../routes/route-names';
import * as Styles from './Quiz.styles';

type QuizScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUIZ'>;

type QuizProps = {
  navigation: QuizScreenNavigationProp;
};

const Quiz = ({ navigation }: QuizProps) => {
  const { t } = useTranslation();

  return (
    <Styles.Wrapper>
      <Styles.LargeText>{t(TRANSLATIONS.QUIZ_WELCOME)}</Styles.LargeText>
      <Styles.SubText>{t(TRANSLATIONS.QUIZ_DESCRIPTION)}</Styles.SubText>
      <Styles.LargeText>{t(TRANSLATIONS.QUIZ_CHALLENGE)}</Styles.LargeText>
      <RoundedButton
        onPress={() => navigation.navigate(LOCAL_ROUTES.SETUP_QUESTIONS.id)}
        text={t(TRANSLATIONS.QUIZ_CHOOSE_QUESTIONS)}
      />
    </Styles.Wrapper>
  );
};

export default Quiz;
