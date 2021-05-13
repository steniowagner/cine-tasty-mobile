import {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import { LayoutChangeEvent } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import metrics from '@styles/metrics';

import useMediaSwitcherAnimation from './useMediaSwitcherAnimation';

export type SwitchItem = {
  titlei18nRef: string;
  onPress: () => void;
};

type UseMediaSwitcherProps = {
  onCalcuateSwitchWidth: () => void;
  theme: DefaultTheme;
  items: SwitchItem[];
};

const useMediaSwitcher = (props: UseMediaSwitcherProps) => {
  const [switchItemsWidths, setSwitchItemsWidth] = useState<number[]>([]);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [indexSelected, setIndexSelected] = useState<number>(0);

  const { t } = useTranslation();

  const mediaSwitcher = useMediaSwitcherAnimation({
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

      const { width } = event.nativeEvent.layout;

      setSwitchItemsWidth((previousSwitchItemsWidths: number[]) => Object.assign([...previousSwitchItemsWidths], { [switchItemindex]: width }));
    },
    [switchItemsWidths],
  );

  const switchItemWidth = useMemo(() => {
    if (switchItemsWidths.length !== props.items.length) {
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
          indexSelected === 0 ? props.theme.colors.buttonText : props.theme.colors.text,
        onPress: () => mediaSwitcher.onAniamateSwitch(0, props.items[0].onPress),
        title: t(props.items[0].titlei18nRef),
      },
      {
        onLayout: (event: LayoutChangeEvent) => onSwitchItemLayout(event, 1),
        textColor:
          indexSelected === 1 ? props.theme.colors.buttonText : props.theme.colors.text,
        onPress: () => mediaSwitcher.onAniamateSwitch(1, props.items[1].onPress),
        title: t(props.items[1].titlei18nRef),
      },
    ],
    [onSwitchItemLayout, switchItemWidth, indexSelected, props.theme, props.items],
  );

  useEffect(() => {
    if (switchItemWidth !== metrics.width) {
      props.onCalcuateSwitchWidth();
    }
  }, [switchItemWidth]);

  return {
    translateX: mediaSwitcher.translateX,
    switchItemWidth,
    isSwitching,
    switchItems,
  };
};

export default useMediaSwitcher;
