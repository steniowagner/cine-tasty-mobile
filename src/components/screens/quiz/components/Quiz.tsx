import React from 'react';
import { useTranslation } from 'react-i18next';

import RoundedButton from '@components/common/rounded-button/RoundedButton';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { QuizStackProps } from '../routes/route-params-types';
import * as Styles from './Quiz.styles';

const Quiz = ({ navigation }: QuizStackProps) => {
  const { t } = useTranslation();

  return (
    <Styles.Wrapper>
      <Styles.LargeText>{t(TRANSLATIONS.QUIZ_WELCOME)}</Styles.LargeText>
      <Styles.SubText>{t(TRANSLATIONS.QUIZ_DESCRIPTION)}</Styles.SubText>
      <Styles.LargeText>{t(TRANSLATIONS.QUIZ_CHALLENGE)}</Styles.LargeText>
      <RoundedButton
        onPress={() => navigation.navigate(Routes.Quiz.SETUP_QUESTIONS)}
        text={t(TRANSLATIONS.QUIZ_CHOOSE_QUESTIONS)}
      />
    </Styles.Wrapper>
  );
};

export default Quiz;
