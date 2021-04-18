import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import SetupQuestionsOptionsList from '@components/screens/quiz/components/setup-questions/setup-options-list/SetupQuestionsOptionsList';
import LanguageFilter from '@components/screens/news/components/language-filter/LanguageFilter';
import * as Types from '@local-types';

import { CustomModalStackParams } from '../routes/route-params-types';
import useCustomizedModal from './useCustomizedModal';
import * as Styles from './CustomizedModal.styles';

type QuestionsScreenNavigationProp = StackNavigationProp<
  CustomModalStackParams,
  'CUSTOM_MODAL'
>;

type QuestionsScreenRouteProp = RouteProp<CustomModalStackParams, 'CUSTOM_MODAL'>;

type CustomizedModalProps = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const CustomizedModal = ({ navigation, route }: CustomizedModalProps) => {
  const {
    onHandlerStateChange,
    shouldHideCard,
    animatedEvent,
    onCloseModal,
    translateY,
  } = useCustomizedModal({
    cardContainerHeight: Styles.CARD_CONTAINER_HEIGHT,
    onClose: () => navigation.goBack(),
  });

  return (
    <Styles.Wrapper
      testID="customized-modal"
    >
      <TouchableWithoutFeedback
        onPress={onCloseModal}
        testID="closeable-area"
      >
        <Styles.PressAreaClose />
      </TouchableWithoutFeedback>
      {!shouldHideCard && (
        <PanGestureHandler
          onHandlerStateChange={onHandlerStateChange}
          onGestureEvent={animatedEvent}
        >
          <Styles.CardWrapper
            testID="card-wrapper"
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, Styles.CARD_CONTAINER_HEIGHT],
                    outputRange: [0, Styles.CARD_CONTAINER_HEIGHT],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <Styles.GripWrapper>
              <Styles.Grip />
            </Styles.GripWrapper>
            <Styles.ListHeaderWrapper>
              <Styles.HeadLineText>{route.params.headerText}</Styles.HeadLineText>
              <Styles.LineDivider />
            </Styles.ListHeaderWrapper>
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
          </Styles.CardWrapper>
        </PanGestureHandler>
      )}
    </Styles.Wrapper>
  );
};

export default CustomizedModal;
