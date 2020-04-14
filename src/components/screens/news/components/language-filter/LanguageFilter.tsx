import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
  Modal,
  View,
  Text,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../../../../utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import LanguageListItem, { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem';
import { ArticleLanguage } from '../../../../../types/schema';
import metrics from '../../../../../styles/metrics';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

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

const SelectLanguageButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => (isEqualsOrLargestThanIphoneX()
    ? theme.metrics.getWidthFromDP('20%')
    : theme.metrics.getWidthFromDP('16%'))}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const SelectLanguageText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: white;
`;

type Props = {
  onSelectLanguage: (language: ArticleLanguage) => void;
  lastLanguageSelected: ArticleLanguage;
  onCloseModal: () => void;
};

const LanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  onCloseModal,
}: Props) => {
  const {
    onCloseWithoutChanges,
    onHandlerStateChange,
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    shouldHideCard,
    animatedEvent,
    translateY,
  } = useLanguageFilter({
    cardContainerHeight: CARD_CONTAINER_HEIGHT,
    animationTiming: ANIMATION_TIMING,
    lastLanguageSelected,
    onSelectLanguage,
    onCloseModal,
  });

  const { t } = useTranslation();

  return (
    <Modal
      onRequestClose={onCloseWithoutChanges}
      animationType="fade"
      hardwareAccelerated
      transparent
      visible
    >
      <Wrapper>
        <TouchableWithoutFeedback
          onPress={onCloseWithoutChanges}
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
                <HeadLineText>{t('translations:newsFilterChooseLanguage')}</HeadLineText>
                <LineDivider />
              </ListHeaderWrapper>
              <FlatList
                renderItem={({ item }) => (
                  <LanguageListItem
                    name={t(`translations:language:${item.name}`)}
                    isSelected={languageSelected === item.id}
                    onPress={() => {
                      setLanguageSelected(item.id);
                    }}
                    Flag={item.Flag}
                  />
                )}
                ItemSeparatorComponent={() => <LineDivider />}
                initialScrollIndex={initialFlatListIndex}
                getItemLayout={(_, index) => ({
                  offset: ITEM_LIST_HEIGHT * index,
                  length: ITEM_LIST_HEIGHT,
                  index,
                })}
                keyExtractor={(item) => item.id}
                testID="languages-list"
                data={languages}
              />
              <SelectLanguageButton
                onPress={onPressSelectButton}
                testID="select-button"
              >
                <SelectLanguageText>SELECT</SelectLanguageText>
              </SelectLanguageButton>
            </CardWrapper>
          </PanGestureHandler>
        )}
      </Wrapper>
    </Modal>
  );
};

export default LanguageFilter;
