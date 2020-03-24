import React, { useRef, useEffect } from 'react';
import {
  Animated, FlatList, Modal, View,
} from 'react-native';
import styled from 'styled-components';

import metrics from '../../../../../styles/metrics';
import LanguageListItem from './LanguageListItem';
import langauges from './items';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const CardWrapper = styled(Animated.View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('50%')}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.mediumSize}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: white;
`;

const GripWrapper = styled(View)`
  width: 100%;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Grip = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('1.2%')}px;
  border-radius: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: ${({ theme }) => theme.colors.inactiveWhite};
`;

type Props = {
  isVisible: boolean;
};

const LanguageFilter = ({ isVisible }: Props) => {
  const cardPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(cardPosition, {
      toValue: 1,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent
    >
      <Wrapper>
        <CardWrapper
          style={{
            transform: [
              {
                translateY: cardPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [metrics.height, 0],
                }),
              },
            ],
          }}
        >
          <GripWrapper>
            <Grip />
          </GripWrapper>
          <FlatList
            keyExtractor={(item) => item.id}
            data={langauges}
            renderItem={({ item }) => (
              <LanguageListItem
                name={item.name}
                Flag={item.Flag}
              />
            )}
          />
        </CardWrapper>
      </Wrapper>
    </Modal>
  );
};

export default LanguageFilter;
