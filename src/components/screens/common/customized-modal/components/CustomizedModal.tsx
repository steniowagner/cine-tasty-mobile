import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

import SeasonFullOverview from '@src/components/screens/common/tv-show-seasons/components/tv-show-seasons-detail/header/overview-text/season-full-overview/SeasonFullOverview';
import EpisodeDetail from '@src/components/screens/common/tv-show-seasons/components/tv-show-seasons-detail/tv-show-list-item/episode-detail/EpisodeDetail';
import SetupQuestionsOptionsList from '@src/components/screens/quiz/components/setup-questions/setup-options-list/SetupQuestionsOptionsList';
import LanguageFilter from '@src/components/screens/news/components/language-filter/LanguageFilter';
import * as Types from '@local-types';

import {CustomModalStackProps} from '../routes/route-params-types';
import useCustomizedModal from './useCustomizedModal';
import * as Styles from './CustomizedModal.styles';

export const CustomizedModal = ({navigation, route}: CustomModalStackProps) => {
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
    <Styles.Wrapper testID="customized-modal">
      <TouchableWithoutFeedback onPress={onCloseModal} testID="closeable-area">
        <Styles.PressAreaClose />
      </TouchableWithoutFeedback>
      {!shouldHideCard && (
        <PanGestureHandler
          onHandlerStateChange={onHandlerStateChange}
          onGestureEvent={animatedEvent}>
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
            }}>
            <Styles.GripWrapper>
              <Styles.Grip />
            </Styles.GripWrapper>
            {route.params.headerText && (
              <Styles.ListHeaderWrapper>
                <Styles.HeadLineText>
                  {route.params.headerText}
                </Styles.HeadLineText>
                <Styles.LineDivider />
              </Styles.ListHeaderWrapper>
            )}
            {route.params.type ===
              Types.CustomizedModalChildrenType.LANGUAGE && (
              <LanguageFilter
                lastLanguageSelected={route.params.extraData.lastItemSelected}
                onSelectLanguage={route.params.extraData.onPressSelect}
                closeModal={onCloseModal}
              />
            )}
            {route.params.type ===
              Types.CustomizedModalChildrenType.MEDIA_FILTER && (
              <SetupQuestionsOptionsList
                indexLastOptionSelected={
                  route.params.extraData.lastItemSelected
                }
                onPressSelect={route.params.extraData.onPressSelect}
                options={route.params.extraData.dataset}
                closeModal={onCloseModal}
              />
            )}
            {route.params.type ===
              Types.CustomizedModalChildrenType.TV_SHOW_READ_MORE_DETAILS && (
              <SeasonFullOverview
                overview={route.params.extraData.dataset[0].overview}
              />
            )}
            {route.params.type ===
              Types.CustomizedModalChildrenType.TV_SHOW_EPISODE_DETAILS && (
              <EpisodeDetail episode={route.params.extraData.dataset[0]} />
            )}
          </Styles.CardWrapper>
        </PanGestureHandler>
      )}
    </Styles.Wrapper>
  );
};