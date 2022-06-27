import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {Animated} from 'react-native';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {CONSTANTS} from '@utils';

type UseHeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
};

export const useHeader = (props: UseHeaderProps) => {
  const [isSwitchWidthCalculated, setIsSwitchWidthCalculated] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translations = useTranslations();

  const items = useMemo(
    () => [
      {
        title: translations.translate(Translations.Tags.HOME_MOVIES),
        onPress: props.onPressSwitchMovies,
      },
      {
        title: translations.translate(Translations.Tags.HOME_TV_SHOWS),
        onPress: props.onPresSwitchTVShows,
      },
    ],
    [
      props.onPressSwitchMovies,
      props.onPresSwitchTVShows,
      translations.translate,
    ],
  );

  const onCalcuateSwitchWidth = useCallback(
    () => setIsSwitchWidthCalculated(true),
    [],
  );

  const headerOpacity = useMemo(
    () => (isSwitchWidthCalculated ? opacity : 0),
    [isSwitchWidthCalculated, opacity],
  );

  const animateHeaderOpacity = useCallback(() => {
    const currentOpacity = props.shouldDisableActions ? 0.5 : 1;
    Animated.timing(opacity, {
      duration: CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION,
      toValue: currentOpacity,
      useNativeDriver: true,
    }).start();
  }, [props.shouldDisableActions]);

  useEffect(() => {
    animateHeaderOpacity();
  }, [props.shouldDisableActions]);

  return {
    opacity: headerOpacity,
    onCalcuateSwitchWidth,
    items,
  };
};
