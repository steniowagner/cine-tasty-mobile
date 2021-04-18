import React from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './NextButtonStyles';

type NextButtonProps = {
  onPress: () => void;
  isDisabled: boolean;
};

const NextButton = ({ onPress, isDisabled }: NextButtonProps) => {
  const { t } = useTranslation();

  return (
    <Styles.NextTouchable
      disabled={isDisabled}
      testID="next-button"
      onPress={onPress}
    >
      <Styles.NextText>{t(TRANSLATIONS.QUIZ_NEXT)}</Styles.NextText>
    </Styles.NextTouchable>
  );
};

export default NextButton;
