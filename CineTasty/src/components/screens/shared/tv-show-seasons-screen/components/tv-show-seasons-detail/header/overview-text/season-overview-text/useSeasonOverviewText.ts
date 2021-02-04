import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const READ_MORE_I18N_REF = 'translations:mediaDetail:tvShow:seasonEpisode:readMoreSeasonOverview';
export const MAX_NUMBER_LINES = 5;

const INITIAL_STATE: InternalState = {
  shouldShowReadMoreButton: undefined,
  numberOfLines: undefined,
};

type InternalState = {
  shouldShowReadMoreButton: boolean | undefined;
  numberOfLines: number | undefined;
};

type ModalState = {
  onPressReadMore: () => void;
  onCloseModal: () => void;
  isModalOpen: boolean;
};

type State = {
  onGetTextLayout: (linesLength: number) => void;
  readMoreButtonText: string;
} & InternalState &
  ModalState;

const useSeasonOverviewText = (): State => {
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
    readMoreButtonText: t(READ_MORE_I18N_REF),
    numberOfLines: state.numberOfLines,
    onGetTextLayout,
    isModalOpen,
  };
};

export default useSeasonOverviewText;
