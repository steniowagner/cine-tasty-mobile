import React from 'react';

import {usePopupAdvice} from './useAlertMessage';
import * as Styles from './AlertMessage.styles';

type AlertMessageProps = {
  onFinishToShow?: () => void;
  message: string;
};

export const AlertMessage = (props: AlertMessageProps) => {
  const popupAdvice = usePopupAdvice({
    onFinishToShow: props.onFinishToShow,
  });
  return (
    <Styles.MessageWrapper
      testID="alert-message-wrapper"
      style={[
        {
          opacity: popupAdvice.opacity,
        },
      ]}>
      <Styles.Message testID="alert-message-text">
        {props.message}
      </Styles.Message>
    </Styles.MessageWrapper>
  );
};
