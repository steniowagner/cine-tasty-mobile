import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

type State = {
  onPressTVShows: () => void;
  t: (key: string) => string;
  onPressMovies: () => void;
  isMovieSelected: boolean;
};

type Props = {
  onSwitchToTVShows: () => void;
  onSwitchToMovies: () => void;
};

const useMediaSwitcher = ({ onSwitchToTVShows, onSwitchToMovies }: Props): State => {
  const [isMovieSelected, setIsMovieSelected] = useState<boolean>(true);

  const { t } = useTranslation();

  const onPressMovies = useCallback(() => {
    setIsMovieSelected(true);
    onSwitchToMovies();
  }, []);

  const onPressTVShows = useCallback(() => {
    setIsMovieSelected(false);
    onSwitchToTVShows();
  }, []);

  return {
    isMovieSelected,
    onPressTVShows,
    onPressMovies,
    t,
  };
};

export default useMediaSwitcher;
