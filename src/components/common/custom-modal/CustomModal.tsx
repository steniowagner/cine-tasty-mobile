import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Modal,
  View,
  Text,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import metrics from 'styles/metrics';

import useLanguageFilter from './useCustomModal';

const CARD_CONTAINER_HEIGHT = metrics.getHeightFromDP('65%');
export const ANIMATION_TIMING = 400;

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const PressAreaClose = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('35%')}px;
`;

const CardWrapper = styled(Animated.View)`
  width: 100%;
  height: ${CARD_CONTAINER_HEIGHT}px;
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

const HeadLineText = styled(Text)`
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.1}px;
  color: rgba(0, 0, 0, 0.8);
`;

const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

const ListHeaderWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const SelectButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => (isEqualsOrLargestThanIphoneX()
    ? theme.metrics.getWidthFromDP('20%')
    : theme.metrics.getWidthFromDP('16%'))}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const SelectButtonText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: white;
`;

type Props = {
  onPressSelect: () => void;
  children: JSX.Element;
  onClose: () => void;
  headerText: string;
  footerText: string;
};

const CustomModal = ({
  onPressSelect,
  headerText,
  footerText,
  children,
  onClose,
}: Props) => {
  const {
    onHandlerStateChange,
    onPressSelectButton,
    shouldHideCard,
    animatedEvent,
    onCloseModal,
    translateY,
  } = useLanguageFilter({
    cardContainerHeight: CARD_CONTAINER_HEIGHT,
    animationTiming: ANIMATION_TIMING,
    onPressSelect,
    onClose,
  });

  return (
    <Modal
      onRequestClose={onCloseModal}
      animationType="fade"
      hardwareAccelerated
      transparent
      visible
    >
      <Wrapper>
        <TouchableWithoutFeedback
          onPress={onCloseModal}
          testID="hide-filter-button"
        >
          <PressAreaClose />
        </TouchableWithoutFeedback>
        {!shouldHideCard && (
          <PanGestureHandler
            onHandlerStateChange={onHandlerStateChange}
            onGestureEvent={animatedEvent}
          >
            <CardWrapper
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [0, CARD_CONTAINER_HEIGHT],
                      outputRange: [0, CARD_CONTAINER_HEIGHT],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            >
              <GripWrapper>
                <Grip />
              </GripWrapper>
              <ListHeaderWrapper>
                <HeadLineText>{headerText}</HeadLineText>
                <LineDivider />
              </ListHeaderWrapper>
              {children}
              <SelectButton
                onPress={onPressSelectButton}
                testID="select-button"
              >
                <SelectButtonText>{footerText}</SelectButtonText>
              </SelectButton>
            </CardWrapper>
          </PanGestureHandler>
        )}
      </Wrapper>
    </Modal>
  );
};

export default CustomModal;
