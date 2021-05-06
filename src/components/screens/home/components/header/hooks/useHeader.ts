import { useCallback, useState, useMemo } from 'react';

import * as TRANSLATIONS from '@i18n/tags';

import useHeaderAnimatedOpacity from './useHeaderAnimatedOpacity';

type UseHeaderProps = {
  onPresSwitchTVShows: () => void;
  onPressSwitchMovies: () => void;
  shouldDisableActions: boolean;
};

const useHeader = ({
  shouldDisableActions,
  onPresSwitchTVShows,
  onPressSwitchMovies,
}: UseHeaderProps) => {
  const [isSwitchWidthCalculated, setIsSwitchWidthCalculated] = useState<boolean>(false);

  const { opacity } = useHeaderAnimatedOpacity({ shouldDisableActions });

  const items = useMemo(
    () => [
      {
        onPress: onPressSwitchMovies,
        titlei18nRef: TRANSLATIONS.HOME_MOVIES,
      },
      {
        onPress: onPresSwitchTVShows,
        titlei18nRef: TRANSLATIONS.HOME_TV_SHOWS,
      },
    ],
    [onPressSwitchMovies, onPresSwitchTVShows],
  );

  const onCalcuateSwitchWidth = useCallback(() => setIsSwitchWidthCalculated(true), []);

  const headerOpacity = useMemo(() => (isSwitchWidthCalculated ? opacity : 0), [
    isSwitchWidthCalculated,
    opacity,
  ]);

  return {
    opacity: headerOpacity,
    onCalcuateSwitchWidth,
    items,
  };
};

export default useHeader;
