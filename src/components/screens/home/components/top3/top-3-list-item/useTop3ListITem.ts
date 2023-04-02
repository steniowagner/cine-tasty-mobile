import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import * as Styles from './Top3ListItem.styles';

type UseTop3ListItemProps = {
  scrollViewPosition: SharedValue<number>;
  index: number;
};

export const useTop3ListItem = (props: UseTop3ListItemProps) => {
  const translations = useTranslations();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          props.scrollViewPosition.value,
          [
            (props.index - 1) * Styles.ITEM_WIDTH,
            props.index * Styles.ITEM_WIDTH,
            (props.index + 1) * Styles.ITEM_WIDTH,
          ],
          [Styles.ITEM_MARGING_TOP, 0, Styles.ITEM_MARGING_TOP],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const texts = useMemo(
    () => ({
      learnMore: translations.translate(Translations.Tags.HOME_LEARN_MORE),
    }),
    [translations],
  );

  const style = useMemo(() => {
    const indexStyleMapping = {
      0: [animatedStyle, Styles.sheet.left],
      1: [animatedStyle, Styles.sheet.middle],
      2: [animatedStyle, Styles.sheet.right],
    };
    return indexStyleMapping[props.index];
  }, [props.index]);

  return {
    style,
    texts,
  };
};
