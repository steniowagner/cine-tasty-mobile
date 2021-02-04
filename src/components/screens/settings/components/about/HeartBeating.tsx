import React, { useCallback, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const Wrapper = styled(View)`
  align-items: center;
  margin: 0 ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const HeartIcon = Animated.createAnimatedComponent(View);

const HeartBeating = () => {
  const heartSize = useRef(new Animated.Value(20)).current;

  const beatHeart = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 25,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(heartSize, {
          toValue: 25,
          duration: 200,
        }),

        Animated.delay(700),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    beatHeart();
  }, []);

  return (
    <Wrapper>
      <HeartIcon
        name="heart"
        style={{
          // fontSize: heartSize,
          backgroundColor: '#EF010B',
        }}
        size={heartSize}
      />
    </Wrapper>
  );
};

export default HeartBeating;
