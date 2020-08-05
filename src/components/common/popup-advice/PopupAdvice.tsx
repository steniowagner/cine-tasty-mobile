import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import styled from 'styled-components';

export const DEFAULT_ANIMATION_DURATION = 400;
export const HIDE_POPUP_DELAY = 3000;

const Wrapper = styled(Animated.View)`
  position: absolute;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('35%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.popup};
`;

const Message = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: #fff;
`;

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
    <Wrapper
      testID="popup-advice-wrapper"
      style={[
        {
          opacity: wrapperOpacity,
        },
      ]}>
      <Message testID="popup-advice-message">{text}</Message>
    </Wrapper>
  );
};

export default PopupAdvice;
