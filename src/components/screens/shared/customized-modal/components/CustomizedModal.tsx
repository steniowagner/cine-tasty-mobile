import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import SetupQuestionsOptionsList from '@components/screens/quiz/components/setup-questions/setup-options-list/SetupQuestionsOptionsList';
import LanguageFilter from '@components/screens/news/components/language-filter/LanguageFilter';
import * as Types from '@local-types';

import { CustomModalStackProps } from '../routes/route-params-types';
import useCustomizedModal from './useCustomizedModal';
import * as Styles from './CustomizedModal.styles';

const CustomizedModal = (props: CustomModalStackProps) => {
  const customizedModal = useCustomizedModal({
    cardContainerHeight: Styles.CARD_CONTAINER_HEIGHT,
    onClose: () => props.navigation.goBack(),
  });

  return (
    <Styles.Wrapper
      testID="customized-modal"
    >
      <TouchableWithoutFeedback
        onPress={customizedModal.onCloseModal}
        testID="closeable-area"
      >
        <Styles.PressAreaClose />
      </TouchableWithoutFeedback>
      {!customizedModal.shouldHideCard && (
        <PanGestureHandler
          onHandlerStateChange={customizedModal.onHandlerStateChange}
          onGestureEvent={customizedModal.animatedEvent}
        >
          <Styles.CardWrapper
            testID="card-wrapper"
            style={{
              transform: [
                {
                  translateY: customizedModal.translateY.interpolate({
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
              <Styles.HeadLineText>{props.route.params.headerText}</Styles.HeadLineText>
              <Styles.LineDivider />
            </Styles.ListHeaderWrapper>
            {props.route.params.type === Types.CustomizedModalChildrenType.LANGUAGE && (
              <LanguageFilter
                lastLanguageSelected={props.route.params.extraData.lastItemSelected}
                onSelectLanguage={props.route.params.extraData.onPressSelect}
                closeModal={customizedModal.onCloseModal}
              />
            )}
            {props.route.params.type
              === Types.CustomizedModalChildrenType.MEDIA_FILTER && (
              <SetupQuestionsOptionsList
                indexLastOptionSelected={props.route.params.extraData.lastItemSelected}
                onPressSelect={props.route.params.extraData.onPressSelect}
                options={props.route.params.extraData.dataset}
                closeModal={customizedModal.onCloseModal}
              />
            )}
          </Styles.CardWrapper>
        </PanGestureHandler>
      )}
    </Styles.Wrapper>
  );
};

export default CustomizedModal;
