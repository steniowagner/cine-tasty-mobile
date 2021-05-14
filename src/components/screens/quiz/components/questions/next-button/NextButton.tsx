import React from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

import * as Styles from './NextButtonStyles';

type NextButtonProps = {
  onPress: () => void;
  isDisabled: boolean;
};

const NextButton = (props: NextButtonProps) => {
  const { t } = useTranslation();

  return (
    <Styles.NextTouchable
      disabled={props.isDisabled}
      testID="next-button"
      onPress={props.onPress}
    >
      <Styles.NextText>{t(TRANSLATIONS.QUIZ_NEXT)}</Styles.NextText>
    </Styles.NextTouchable>
  );
};

export default NextButton;
