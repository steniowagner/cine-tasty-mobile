import React from 'react';

import * as Styles from './PopupAdvice.styles';
import usePopupAdvice from './usePopupAdvice';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

type PopupAdviceProps = {
  onFinishToShow?: () => void;
  text: string;
};

const PopupAdvice = (props: PopupAdviceProps) => {
  const popupAdvice = usePopupAdvice({
    onFinishToShow: props.onFinishToShow,
  });

  return (
    <Styles.Wrapper
      testID="popup-advice-wrapper"
      style={[
        {
          opacity: popupAdvice.opacity,
        },
      ]}>
      <Styles.Message testID="popup-advice-message">
        {props.text}
      </Styles.Message>
    </Styles.Wrapper>
  );
};

export default PopupAdvice;
