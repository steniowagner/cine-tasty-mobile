import React from 'react';

import * as Styles from './PopupAdvice.styles';
import usePopupAdvice from './usePopupAdvice';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

type PopupAdviceProps = {
  onFinishToShow?: () => void;
  text: string;
};

const PopupAdvice = ({ onFinishToShow = () => {}, text }: PopupAdviceProps) => {
  const { wrapperOpacity } = usePopupAdvice({ onFinishToShow });

  return (
    <Styles.Wrapper
      testID="popup-advice-wrapper"
      style={[
        {
          opacity: wrapperOpacity,
        },
      ]}
    >
      <Styles.Message
        testID="popup-advice-message"
      >
        {text}
      </Styles.Message>
    </Styles.Wrapper>
  );
};

export default PopupAdvice;
