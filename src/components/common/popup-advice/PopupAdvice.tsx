import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import * as Styles from './PopupAdvice.styles';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

type Props = {
  onFinishToShow?: () => void;
  text: string;
};

const PopupAdvice = ({ onFinishToShow = () => {}, text }: Props) => {
  const wrapperOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const onHidePopup = () => {
      Animated.timing(wrapperOpacity, {
        duration: DEFAULT_ANIMATION_DURATION,
        useNativeDriver: true,
        toValue: 0,
      }).start(onFinishToShow);
    };

    Animated.timing(wrapperOpacity, {
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true,
      toValue: 1,
    }).start(() => {
      setTimeout(() => {
        onHidePopup();
      }, HIDE_POPUP_DELAY);
    });
  }, []);

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
