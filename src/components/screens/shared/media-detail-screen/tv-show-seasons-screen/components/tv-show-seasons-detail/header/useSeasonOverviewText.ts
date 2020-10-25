import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_NUMBER_LINES = 5;

const INITIAL_STATE: InternalState = {
  shouldShowReadMoreButton: undefined,
  numberOfLines: undefined,
};

type InternalState = {
  shouldShowReadMoreButton: boolean | undefined;
  numberOfLines: number | undefined;
};

type State = {
  onGetTextLayout: (linesLength: number) => void;
  t: (key: string) => string;
} & InternalState;

const useSeasonOverviewText = (): State => {
  const [state, setState] = useState<InternalState>(INITIAL_STATE);

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
    numberOfLines: state.numberOfLines,
    onGetTextLayout,
    t,
  };
};

export default useSeasonOverviewText;
