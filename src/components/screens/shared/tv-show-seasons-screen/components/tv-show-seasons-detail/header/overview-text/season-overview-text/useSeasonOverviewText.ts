import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';

export const MAX_NUMBER_LINES = 5;

const INITIAL_STATE: InternalState = {
  shouldShowReadMoreButton: undefined,
  numberOfLines: undefined,
};

type InternalState = {
  shouldShowReadMoreButton: boolean | undefined;
  numberOfLines: number | undefined;
};

const useSeasonOverviewText = () => {
  const [state, setState] = useState<InternalState>(INITIAL_STATE);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const onGetTextLayout = useCallback(
    (linesLength: number) => {
      if (state.numberOfLines) {
        return;
      }

      const shouldShowReadMoreButton = linesLength > MAX_NUMBER_LINES;
      const numberOfLines = shouldShowReadMoreButton ? MAX_NUMBER_LINES : linesLength;

      setState({
        shouldShowReadMoreButton,
        numberOfLines,
      });
    },
    [state.numberOfLines],
  );

  return {
    shouldShowReadMoreButton: state.shouldShowReadMoreButton,
    onPressReadMore: () => setIsModalOpen(true),
    onCloseModal: () => setIsModalOpen(false),
    readMoreButtonText: t(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
    ),
    numberOfLines: state.numberOfLines,
    onGetTextLayout,
    isModalOpen,
  };
};

export default useSeasonOverviewText;
