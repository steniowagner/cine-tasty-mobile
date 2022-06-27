import {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import {Animated, LayoutChangeEvent} from 'react-native';
import {useTheme} from 'styled-components/native';

import metrics from '@styles/metrics';

export const SWITCH_ANIMATION_DURATION_MS = 300;

export type SwitchItem = {
  title: string;
  onPress: () => void;
};

type UseMediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  items: SwitchItem[];
};

const useMediaSwitcher = (props: UseMediaSwitcherProps) => {
  const [switchItemsWidths, setSwitchItemsWidth] = useState<number[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;

  const theme = useTheme();

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
      const {width} = event.nativeEvent.layout;
      setSwitchItemsWidth((previousSwitchItemsWidths: number[]) =>
        Object.assign([...previousSwitchItemsWidths], {
          [switchItemindex]: width,
        }),
      );
    },
    [switchItemsWidths],
  );

  const width = useMemo(() => {
    if (switchItemsWidths.length !== props.items.length) {
      return metrics.width;
    }
    let switchItemWidth = 0;
    for (let i = 0; i < switchItemsWidths.length; i += 1) {
      if (switchItemsWidths[i] > switchItemWidth) {
        switchItemWidth = switchItemsWidths[i];
      }
    }
    return switchItemWidth;
  }, [switchItemsWidths, props.items]);

  const items = useMemo(
    () => [
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 0),
        textColor:
          indexSelected === 0 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(0, props.items[0].onPress),
        title: props.items[0].title,
      },
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 1),
        textColor:
          indexSelected === 1 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(1, props.items[1].onPress),
        title: props.items[1].title,
      },
    ],
    [onSwitchItemLayout, indexSelected, theme, props.items],
  );

  useEffect(() => {
    if (width !== metrics.width) {
      props.onCalcuateSwitchWidth();
    }
  }, [width]);

  return {
    isSwitching,
    translateX,
    width,
    items,
  };
};

export default useMediaSwitcher;
