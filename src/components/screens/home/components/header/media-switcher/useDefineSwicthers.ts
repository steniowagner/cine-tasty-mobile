import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {useTheme} from 'styled-components/native';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseDefineSwitchersProps = {
  onPressSwitcher: (index: number, onFinishAnimation: () => void) => void;
  setSwitchItemsWidth: Dispatch<SetStateAction<number[]>>;
  onPressSwitchMovies: () => void;
  onPresSwitchTVShows: () => void;
  switchItemsWidth: number[];
  indexSelected: number;
};

export const useDefineSwitchers = (props: UseDefineSwitchersProps) => {
  const translations = useTranslations();
  const theme = useTheme();

  const setSwitcherWidth = useCallback(
    (itemWidth: number, switcherIndex: number) => {
      const isSwitcherAlreadyMeasured = !!props.switchItemsWidth[switcherIndex];
      if (isSwitcherAlreadyMeasured) {
        return;
      }
      props.setSwitchItemsWidth((previousSwitchItemsWidths: number[]) =>
        Object.assign([...previousSwitchItemsWidths], {
          [switcherIndex]: itemWidth,
        }),
      );
    },
    [props.switchItemsWidth, props.setSwitchItemsWidth],
  );

  const items = useMemo(
    () => [
      {
        title: translations.translate(Translations.Tags.HOME_MOVIES),
        onLayout: (itemWidth: number) => setSwitcherWidth(itemWidth, 0),
        onPress: () => props.onPressSwitcher(0, props.onPressSwitchMovies),
        textColor:
          props.indexSelected === 0
            ? theme.colors.buttonText
            : theme.colors.text,
      },
      {
        title: translations.translate(Translations.Tags.HOME_TV_SHOWS),
        onLayout: (itemWidth: number) => setSwitcherWidth(itemWidth, 1),
        onPress: () => props.onPressSwitcher(1, props.onPresSwitchTVShows),
        textColor:
          props.indexSelected === 1
            ? theme.colors.buttonText
            : theme.colors.text,
      },
    ],
    [
      props.onPressSwitcher,
      props.onPressSwitchMovies,
      props.onPresSwitchTVShows,
      props.indexSelected,
      translations.translate,
      setSwitcherWidth,
    ],
  );

  return {
    items,
  };
};
