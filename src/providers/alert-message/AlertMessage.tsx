import React from 'react';

import * as Styles from './AlertMessage.styles';
import usePopupAdvice from './useAlertMessage';

type AlertMessageProps = {
  onFinishToShow?: () => void;
  message: string;
};

const AlertMessage = (props: AlertMessageProps) => {
  const popupAdvice = usePopupAdvice({
    onFinishToShow: props.onFinishToShow,
  });
  return (
    <Styles.Wrapper>
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
    </Styles.Wrapper>
  );
};

export default AlertMessage;
