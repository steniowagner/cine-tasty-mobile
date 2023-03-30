import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useTheme} from 'styled-components/native';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseDefineSwitchersProps = {
  animateSwitcher: (index: number, onFinishAnimation: () => void) => void;
  setSwitchItemsWidth: Dispatch<SetStateAction<number[]>>;
  onPressSwitchMovies: () => void;
  onPresSwitchTVShows: () => void;
  switchItemsWidth: number[];
  indexSelected: number;
};

export const useDefineSwitchers = (props: UseDefineSwitchersProps) => {
  const translations = useTranslations();
  const theme = useTheme();

  const handleOnLayout = useCallback(
    (event: LayoutChangeEvent, switcherIndex: number) => {
      const isSwitcherAlreadyMeasured = !!props.switchItemsWidth[switcherIndex];
      if (isSwitcherAlreadyMeasured) {
        return;
      }
      props.setSwitchItemsWidth((previousSwitchItemsWidths: number[]) =>
        Object.assign([...previousSwitchItemsWidths], {
          [switcherIndex]: event.nativeEvent?.layout?.width,
        }),
      );
    },
    [props.switchItemsWidth, props.setSwitchItemsWidth],
  );

  const items = useMemo(
    () => [
      {
        title: translations.translate(Translations.Tags.HOME_MOVIES),
        onLayout: (event: LayoutChangeEvent) => handleOnLayout(event, 0),
        onPress: () => props.animateSwitcher(0, props.onPressSwitchMovies),
        textColor:
          props.indexSelected === 0
            ? theme.colors.buttonText
            : theme.colors.text,
      },
      {
        title: translations.translate(Translations.Tags.HOME_TV_SHOWS),
        onLayout: (event: LayoutChangeEvent) => handleOnLayout(event, 1),
        onPress: () => props.animateSwitcher(1, props.onPresSwitchTVShows),
        textColor:
          props.indexSelected === 1
            ? theme.colors.buttonText
            : theme.colors.text,
      },
    ],
    [
      props.animateSwitcher,
      props.onPressSwitchMovies,
      props.onPresSwitchTVShows,
      props.indexSelected,
      translations.translate,
      handleOnLayout,
    ],
  );

  return {
    items,
  };
};
