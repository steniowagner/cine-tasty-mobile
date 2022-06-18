import {useCallback, useState, useMemo, useEffect} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import metrics from '@styles/metrics';

import useMediaSwitcherAnimation from './useMediaSwitcherAnimation';

export type SwitchItem = {
  title: string;
  onPress: () => void;
};

type UseMediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  theme: DefaultTheme;
  items: SwitchItem[];
};

const useMediaSwitcher = ({
  onCalcuateSwitchWidth,
  theme,
  items,
}: UseMediaSwitcherProps) => {
  const [switchItemsWidths, setSwitchItemsWidth] = useState<number[]>([]);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [indexSelected, setIndexSelected] = useState<number>(0);

  const {t} = useTranslation();

  const {onAniamateSwitch, translateX} = useMediaSwitcherAnimation({
    setIndexSelected,
    setIsSwitching,
    indexSelected,
  });

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
        textColor:
          indexSelected === 0 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(0, items[0].onPress),
        title: items[0].title,
      },
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 1),
        textColor:
          indexSelected === 1 ? theme.colors.buttonText : theme.colors.text,
        onPress: () => onAniamateSwitch(1, items[1].onPress),
        title: items[1].title,
      },
    ],
    [onSwitchItemLayout, switchItemWidth, indexSelected, theme, items],
  );

  useEffect(() => {
    if (switchItemWidth !== metrics.width) {
      onCalcuateSwitchWidth();
    }
  }, [switchItemWidth]);

  return {
    switchItemWidth,
    isSwitching,
    switchItems,
    translateX,
  };
};

export default useMediaSwitcher;
