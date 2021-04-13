import React from 'react';
import {
  TouchableWithoutFeedback, Animated, View, Text,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import SetupQuestionsOptionsList from '@components/screens/quiz/components/setup-questions/setup-options-list/SetupQuestionsOptionsList';
import LanguageFilter from '@components/screens/news/components/language-filter/LanguageFilter';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import { CustomModalStackParams } from '../routes/route-params-types';
import useCustomizedModal from './useCustomizedModal';

const CARD_CONTAINER_HEIGHT = metrics.getHeightFromDP('75%');

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
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
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
`;

const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

const ListHeaderWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

type QuestionsScreenNavigationProp = StackNavigationProp<
  CustomModalStackParams,
  'CUSTOM_MODAL'
>;

type QuestionsScreenRouteProp = RouteProp<CustomModalStackParams, 'CUSTOM_MODAL'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const CustomizedModal = ({ navigation, route }: Props) => {
  const {
    onHandlerStateChange,
    shouldHideCard,
    animatedEvent,
    onCloseModal,
    translateY,
  } = useCustomizedModal({
    cardContainerHeight: CARD_CONTAINER_HEIGHT,
    onClose: () => navigation.goBack(),
  });

  return (
    <Wrapper
      testID="customized-modal"
    >
      <TouchableWithoutFeedback
        onPress={onCloseModal}
        testID="closeable-area"
      >
        <PressAreaClose />
      </TouchableWithoutFeedback>
      {!shouldHideCard && (
        <PanGestureHandler
          onHandlerStateChange={onHandlerStateChange}
          onGestureEvent={animatedEvent}
        >
          <CardWrapper
            testID="card-wrapper"
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
              <HeadLineText>{route.params.headerText}</HeadLineText>
              <LineDivider />
            </ListHeaderWrapper>
            {route.params.type === Types.CustomizedModalChildrenType.LANGUAGE && (
              <LanguageFilter
                lastLanguageSelected={route.params.extraData.lastItemSelected}
                onSelectLanguage={route.params.extraData.onPressSelect}
                closeModal={onCloseModal}
              />
            )}
            {route.params.type === Types.CustomizedModalChildrenType.MEDIA_FILTER && (
              <SetupQuestionsOptionsList
                indexLastOptionSelected={route.params.extraData.lastItemSelected}
                onPressSelect={route.params.extraData.onPressSelect}
                options={route.params.extraData.dataset}
                closeModal={onCloseModal}
              />
            )}
          </CardWrapper>
        </PanGestureHandler>
      )}
    </Wrapper>
  );
};

export default CustomizedModal;
