import {
  useCallback, useEffect, useState, useMemo, useRef,
} from 'react';
import { Animated } from 'react-native';
import {
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

import { ArticleLanguage } from 'types/schema';

import languages from './languages';

type Props = {
  onSelectLanguage: (language: string) => void;
  lastLanguageSelected: ArticleLanguage;
  cardContainerHeight: number;
  onCloseModal: () => void;
  animationTiming: number;
};

type HookState = {
  onHandlerStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
  animatedEvent: (event: PanGestureHandlerGestureEvent) => void;
  setLanguageSelected: (language: ArticleLanguage) => void;
  onCloseWithoutChanges: () => void;
  onPressSelectButton: () => void;
  initialFlatListIndex: number;
  translateY: Animated.Value;
  languageSelected: string;
  shouldHideCard: boolean;
};

const useLanguageFilter = ({
  lastLanguageSelected,
  cardContainerHeight,
  onSelectLanguage,
  animationTiming,
  onCloseModal,
}: Props): HookState => {
  let offset = 0;

  const translateY = useRef(new Animated.Value(cardContainerHeight)).current;

  const [languageSelected, setLanguageSelected] = useState<ArticleLanguage>(
    lastLanguageSelected,
  );

  const [shouldHideCard, setShouldHideCard] = useState<boolean>(false);

  const initialFlatListIndex = languages.findIndex(
    (language) => language.id === lastLanguageSelected,
  );

  const animatedEvent = useMemo(
    () => Animated.event(
      [
        {
          nativeEvent: {
            translationY: translateY,
          },
        },
      ],
      {
        useNativeDriver: true,
      },
    ),
    [translateY],
  );

  const onAnimateCard = useCallback((toValue: number, callback?: () => void): void => {
    Animated.timing(translateY, {
      duration: toValue === 0 ? animationTiming : animationTiming / 2,
      useNativeDriver: true,
      toValue,
    }).start(callback);
  }, []);

  useEffect(() => {
    onAnimateCard(0);
  }, []);

  const onPressSelectButton = (): void => {
    onAnimateCard(cardContainerHeight, () => {
      setShouldHideCard(true);

      if (lastLanguageSelected !== languageSelected) {
        onSelectLanguage(languageSelected);
      }

      onCloseModal();
    });
  };

  const setTranslationValues = (
    translationOffset: number,
    translationValue: number,
    offsetValue: number,
  ): void => {
    translateY.setOffset(translationOffset);
    translateY.setValue(translationValue);
    offset = offsetValue;
  };

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent): void => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let isFilterOpen = false;

      offset += translationY;

      if (translationY >= cardContainerHeight / 2) {
        isFilterOpen = true;
      } else {
        setTranslationValues(0, offset, 0);
      }

      const nextCardPosition = isFilterOpen ? cardContainerHeight : 0;

      onAnimateCard(nextCardPosition, () => {
        setTranslationValues(nextCardPosition, 0, nextCardPosition);

        if (isFilterOpen) {
          setShouldHideCard(true);
          onCloseModal();
        }
      });
    }
  };

  const onCloseWithoutChanges = () => {
    onAnimateCard(cardContainerHeight, () => {
      setShouldHideCard(true);

      onCloseModal();
    });
  };

  return {
    onCloseWithoutChanges,
    onHandlerStateChange,
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    shouldHideCard,
    animatedEvent,
    translateY,
  };
};

export default useLanguageFilter;
