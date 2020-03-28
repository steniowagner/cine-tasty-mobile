import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity, Animated, FlatList, Modal, View, Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../../../../utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import LanguageListItem, { ITEM_LIST_HEIGHT } from './LanguageListItem';
import { ArticleLanguage } from '../../../../../types/schema';
import metrics from '../../../../../styles/metrics';
import languages from './languages';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const CardWrapper = styled(Animated.View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('65%')}px;
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
  onSelect: (language: ArticleLanguage) => void;
  lastFilterSelected: ArticleLanguage;
};

const LanguageFilter = ({ lastFilterSelected, onSelect }: Props) => {
  const [filterSelected, setFilterSelected] = useState<ArticleLanguage>(
    lastFilterSelected,
  );
  const [shouldHideCard, setShouldHideCard] = useState<boolean>(false);
  const cardPosition = useRef(new Animated.Value(0)).current;

  const { t } = useTranslation();

  const initialFlatListIndex = languages.findIndex(
    (language) => language.id === lastFilterSelected,
  );

  const onAnimateCard = (toValue: number, callback?: () => void): void => {
    Animated.spring(cardPosition, {
      useNativeDriver: true,
      bounciness: 4,
      toValue,
    }).start(callback);
  };

  useEffect(() => {
    onAnimateCard(1);
  }, []);

  const onCloseModal = (): void => {
    onAnimateCard(0, () => {
      setShouldHideCard(true);
      onSelect(filterSelected);
    });
  };

  return (
    <Modal
      onRequestClose={() => {
        onAnimateCard(0, () => {
          setShouldHideCard(false);
          onSelect(lastFilterSelected);
        });
      }}
      animationType="fade"
      hardwareAccelerated
      transparent
      visible
    >
      <Wrapper>
        {!shouldHideCard && (
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
            <ListHeaderWrapper>
              <HeadLineText>{t('translations:newsFilterChooseLanguage')}</HeadLineText>
              <LineDivider />
            </ListHeaderWrapper>
            <FlatList
              ItemSeparatorComponent={() => <LineDivider />}
              initialScrollIndex={initialFlatListIndex}
              getItemLayout={(_, index) => ({
                length: ITEM_LIST_HEIGHT,
                offset: ITEM_LIST_HEIGHT * index,
                index,
              })}
              keyExtractor={(item) => item.id}
              testID="languages-list"
              data={languages}
              renderItem={({ item }) => (
                <LanguageListItem
                  name={t(`translations:language:${item.name}`)}
                  onPress={() => setFilterSelected(item.id)}
                  isSelected={filterSelected === item.id}
                  Flag={item.Flag}
                />
              )}
            />
            <SelectLanguageButton
              onPress={onCloseModal}
              testID="select-button"
            >
              <SelectLanguageText>SELECT</SelectLanguageText>
            </SelectLanguageButton>
          </CardWrapper>
        )}
      </Wrapper>
    </Modal>
  );
};

export default LanguageFilter;
