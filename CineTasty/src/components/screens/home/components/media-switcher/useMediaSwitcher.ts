import {
  useCallback, useState, useMemo, useRef,
} from 'react';
import { LayoutChangeEvent, Animated } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import metrics from 'styles/metrics';

export const SWITCH_ANIMATION_DURATION_MS = 300;

export type SwitchItem = {
  titlei18nRef: string;
  onPress: () => void;
};

type EnhancedSwitchItem = {
  onLayout: (event: LayoutChangeEvent) => void;
  textColor: Animated.AnimatedInterpolation;
  onPress: () => void;
  title: string;
};

type State = {
  switchItems: EnhancedSwitchItem[];
  translateX: Animated.Value;
  switchItemWidth: number;
  wrapperOpacity: number;
  isSwitching: boolean;
};

type Props = {
  theme: DefaultTheme;
  items: SwitchItem[];
};

const useMediaSwitcher = ({ theme, items }: Props): State => {
  const [switchItemsWidths, setSwitchItemsWidth] = useState<number[]>([]);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const { t } = useTranslation();

  const translateX = useRef(new Animated.Value(0)).current;
  const textColors = useRef(new Animated.Value(0)).current;

  const onAniamateSwitch = useCallback((index: number, onFinishAnimation: () => void) => {
    // @ts-ignore this only works if "userNativeDriver" is "true"
    // eslint-disable-next-line no-underscore-dangle
    if (textColors.__getValue() === index) {
      return;
    }

    setIsSwitching(true);

    Animated.parallel([
      Animated.timing(translateX, {
        duration: SWITCH_ANIMATION_DURATION_MS,
        useNativeDriver: true,
        toValue: index,
      }),
      Animated.timing(textColors, {
        duration: SWITCH_ANIMATION_DURATION_MS,
        toValue: index,
      }),
    ]).start(() => {
      setIsSwitching(false);
      onFinishAnimation();
    });
  }, []);

  const onSwitchItemLayout = useCallback(
    (event: LayoutChangeEvent, switchItemindex: number) => {
      const isSwitchItemAlreadyMeasured = !!switchItemsWidths[switchItemindex];

      if (isSwitchItemAlreadyMeasured) {
        return;
      }

      const { width } = event.nativeEvent.layout;

      setSwitchItemsWidth((previousSwitchItemsWidths: number[]) => Object.assign([...previousSwitchItemsWidths], { [switchItemindex]: width }));
    },
    [switchItemsWidths],
  );

  const switchItemWidth = useMemo(() => {
    if (switchItemsWidths.length !== items.length) {
      return metrics.width;
    }

    let width = 0;

    for (let i = 0; i < switchItemsWidths.length; i += 1) {
      if (switchItemsWidths[i] > width) {
        width = switchItemsWidths[i];
      }
    }

    return width;
  }, [switchItemsWidths]);

  const switchItems = useMemo(
    () => [
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 0),
        textColor: textColors.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.colors.buttonText, theme.colors.text],
        }),
        onPress: () => onAniamateSwitch(0, items[0].onPress),
        title: t(items[0].titlei18nRef),
      },
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 1),
        textColor: textColors.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.colors.text, theme.colors.buttonText],
        }),
        onPress: () => onAniamateSwitch(1, items[1].onPress),
        title: t(items[1].titlei18nRef),
      },
    ],
    [onSwitchItemLayout, switchItemWidth, textColors, theme, items],
  );

  const wrapperOpacity = useMemo(
    () => (switchItemsWidths.length === switchItems.length ? 1 : 0),
    [switchItemsWidths],
  );

  return {
    switchItemWidth,
    wrapperOpacity,
    isSwitching,
    switchItems,
    translateX,
  };
};

export default useMediaSwitcher;
