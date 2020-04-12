import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(Animated.View)`
  position: absolute;
  align-self: center;
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

const PopupAdvice = ({ onFinishToShow, text }) => {
  const wrapperOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const onHidePopup = () => Animated.timing(wrapperOpacity, {
      useNativeDriver: true,
      duration: 400,
      toValue: 0,
    }).start(onFinishToShow);

    Animated.timing(wrapperOpacity, {
      useNativeDriver: true,
      duration: 400,
      toValue: 1,
    }).start(() => {
      setTimeout(() => {
        onHidePopup();
      }, 3000);
    });
  }, []);

  return (
    <Wrapper
      style={[
        {
          opacity: wrapperOpacity,
        },
      ]}
    >
      <Message>{text}</Message>
    </Wrapper>
  );
};

export default PopupAdvice;
