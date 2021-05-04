import { useMemo } from 'react';

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

  return {
    opacity,
    items,
  };
};

export default useHeader;
