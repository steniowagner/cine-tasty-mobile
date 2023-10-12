import React from 'react';

import { Icons } from '@/components/common';
import { dark } from '@styles/themes';

import { useAlertMessage } from './use-alert-message';
import * as Styles from './AlertMessage.styles';

type AlertMessageProps = {
  onFinishToShow?: () => void;
  icon?: Icons;
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
      {props.icon && (
        <Styles.Icon size={0} id={props.icon} testID="alert-message-icon" />
      )}
      <Styles.Message testID="alert-message-text">
        {props.message}
      </Styles.Message>
    </Styles.Wrapper>
  );
};
