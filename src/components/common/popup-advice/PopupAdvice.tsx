import React from 'react';

import * as Styles from './PopupAdvice.styles';
import usePopupAdvice from './usePopupAdvice';

type PopupAdviceProps = {
  onFinishToShow?: () => void;
  text: string;
};

const PopupAdvice = (props: PopupAdviceProps) => {
  const popupAdvice = usePopupAdvice({ onFinishToShow: props.onFinishToShow });

  return (
    <Styles.Wrapper
      testID="popup-advice-wrapper"
      style={[
        {
          opacity: popupAdvice.wrapperOpacity,
        },
      ]}
    >
      <Styles.Message
        testID="popup-advice-message"
      >
        {props.text}
      </Styles.Message>
    </Styles.Wrapper>
  );
};

export default PopupAdvice;
