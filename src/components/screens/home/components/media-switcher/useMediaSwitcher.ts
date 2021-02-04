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
  onPress: () => void;
  textColor: string;
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
  const [indexSelected, setIndexSelected] = useState<number>(0);

  const { t } = useTranslation();

  const translateX = useRef(new Animated.Value(0)).current;

  const onAniamateSwitch = useCallback(
    (index: number, onFinishAnimation: () => void) => {
      if (indexSelected === index) {
        return;
      }

      setIndexSelected(index);

      setIsSwitching(true);

      Animated.timing(translateX, {
        duration: SWITCH_ANIMATION_DURATION_MS,
        useNativeDriver: true,
        toValue: index,
      }).start(() => {
        setIsSwitching(false);
        onFinishAnimation();
      });
    },
    [indexSelected],
  );

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
        textColor: indexSelected === 0 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(0, items[0].onPress),
        title: t(items[0].titlei18nRef),
      },
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 1),
        textColor: indexSelected === 1 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(1, items[1].onPress),
        title: t(items[1].titlei18nRef),
      },
    ],
    [onSwitchItemLayout, switchItemWidth, indexSelected, theme, items],
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
