import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from 'i18n/tags';

export const DEFAULT_NUMBER_OF_LINES = 5;

type State = {
  onGetTextLayout: (linesLength: number) => void;
  isReadExpandableButtonVisible: boolean;
  onPressReadExpandable: () => void;
  expandableReadButtonText: string;
  numberOfLines: number;
};

const useMediaItemDescription = (): State => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(undefined);
  const [textNumberOfLines, setTextNumberOfLines] = useState<number>(0);

  const { t } = useTranslation();

  const onGetTextLayout = useCallback(
    (linesLength: number) => {
      if (textNumberOfLines === 0 && linesLength > DEFAULT_NUMBER_OF_LINES) {
        setNumberOfLines(DEFAULT_NUMBER_OF_LINES);
        setTextNumberOfLines(linesLength);
      }

      if (textNumberOfLines === 0 && linesLength <= DEFAULT_NUMBER_OF_LINES) {
        setNumberOfLines(linesLength);
      }
    },
    [textNumberOfLines],
  );

  const onPressReadExpandable = useCallback(() => {
    if (numberOfLines === DEFAULT_NUMBER_OF_LINES) {
      setNumberOfLines(textNumberOfLines);
    }

    if (numberOfLines !== DEFAULT_NUMBER_OF_LINES) {
      setNumberOfLines(DEFAULT_NUMBER_OF_LINES);
    }
  }, [numberOfLines]);

  const expandableReadButtonText = useMemo(() => {
    const isReadMoreActive = numberOfLines === DEFAULT_NUMBER_OF_LINES;

    if (isReadMoreActive) {
      return t(TRANSLATIONS.FAMOUS_DETAIL_READ_MORE);
    }

    return t(TRANSLATIONS.FAMOUS_DETAIL_READ_LESS);
  }, [numberOfLines]);

  return {
    isReadExpandableButtonVisible: textNumberOfLines > DEFAULT_NUMBER_OF_LINES,
    expandableReadButtonText,
    onPressReadExpandable,
    onGetTextLayout,
    numberOfLines,
  };
};

export default useMediaItemDescription;
