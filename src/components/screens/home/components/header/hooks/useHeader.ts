import { useCallback, useState, useMemo } from 'react';

import * as TRANSLATIONS from '@i18n/tags';

import useHeaderAnimatedOpacity from './useHeaderAnimatedOpacity';

type UseHeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
};

const useHeader = (props: UseHeaderProps) => {
  const [isSwitchWidthCalculated, setIsSwitchWidthCalculated] = useState<boolean>(false);

  const headerAnimatedOpacity = useHeaderAnimatedOpacity({
    shouldDisableActions: props.shouldDisableActions,
  });

  const items = useMemo(
    () => [
      {
        onPress: props.onPressSwitchMovies,
        titlei18nRef: TRANSLATIONS.HOME_MOVIES,
      },
      {
        onPress: props.onPresSwitchTVShows,
        titlei18nRef: TRANSLATIONS.HOME_TV_SHOWS,
      },
    ],
    [props.onPressSwitchMovies, props.onPresSwitchTVShows],
  );

  const onCalcuateSwitchWidth = useCallback(() => setIsSwitchWidthCalculated(true), []);

  const headerOpacity = useMemo(
    () => (isSwitchWidthCalculated ? headerAnimatedOpacity.opacity : 0),
    [isSwitchWidthCalculated, headerAnimatedOpacity.opacity],
  );

  return {
    opacity: headerOpacity,
    onCalcuateSwitchWidth,
    items,
  };
};

export default useHeader;
