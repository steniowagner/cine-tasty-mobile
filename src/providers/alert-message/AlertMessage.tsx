import React from 'react';

import {dark} from '@styles/themes';

import {useAlertMessage} from './useAlertMessage';
import * as Styles from './AlertMessage.styles';

type AlertMessageProps = {
  onFinishToShow?: () => void;
  message: string;
};

export const AlertMessage = (props: AlertMessageProps) => {
  const alertMessage = useAlertMessage({
    onFinishToShow: props.onFinishToShow,
  });
  return (
    <Styles.Wrapper
      testID="alert-message-wrapper"
      style={[alertMessage.animatedStyle, dark.colors.defaultShadow]}>
      <Styles.Message testID="alert-message-text">
        {props.message}
      </Styles.Message>
    </Styles.Wrapper>
  );
};
