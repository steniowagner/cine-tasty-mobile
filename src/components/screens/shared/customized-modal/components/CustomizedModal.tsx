import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import SeasonFullOverview from '@components/screens/shared/tv-show-seasons/components/tv-show-seasons-detail/header/overview-text/season-full-overview/SeasonFullOverview';
import SetupQuestionsOptionsList from '@components/screens/quiz/components/setup-questions/setup-options-list/SetupQuestionsOptionsList';
import LanguageFilter from '@components/screens/news/components/language-filter/LanguageFilter';
import * as Types from '@local-types';

import { CustomModalStackProps } from '../routes/route-params-types';
import useCustomizedModal from './useCustomizedModal';
import * as Styles from './CustomizedModal.styles';

const CustomizedModal = ({ navigation, route }: CustomModalStackProps) => {
  const {
    onHandlerStateChange,
    cardContainerHeight,
    shouldHideCard,
    animatedEvent,
    onCloseModal,
    translateY,
  } = useCustomizedModal({
    modalHeight: route.params.modalHeight,
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
              height: cardContainerHeight,
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, cardContainerHeight],
                    outputRange: [0, cardContainerHeight],
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
            {route.params.type
              === Types.CustomizedModalChildrenType.TV_SHOW_READ_MORE_DETAILS && (
              <SeasonFullOverview
                overview={route.params.extraData.dataset[0].overview}
              />
            )}
          </Styles.CardWrapper>
        </PanGestureHandler>
      )}
    </Styles.Wrapper>
  );
};

export default CustomizedModal;
