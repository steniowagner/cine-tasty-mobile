import { useCallback, useMemo, useState } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

export const DEFAULT_NUMBER_OF_LINES = 5;

export const useMediaItemDescription = () => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>();
  const [textNumberOfLines, setTextNumberOfLines] = useState(0);

  const translation = useTranslation();

  const handleOnLayout = useCallback(
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

  const handleColapseText = useCallback(() => {
    const nextNumberOfLines =
      numberOfLines === DEFAULT_NUMBER_OF_LINES
        ? textNumberOfLines
        : DEFAULT_NUMBER_OF_LINES;
    setNumberOfLines(nextNumberOfLines);
  }, [numberOfLines]);

  const expandableReadButtonText = useMemo(() => {
    const tag =
      numberOfLines === DEFAULT_NUMBER_OF_LINES
        ? Translations.Miscellaneous.READ_MORE
        : Translations.Miscellaneous.READ_LESS;
    return translation.translate(tag);
  }, [numberOfLines]);

  return {
    isReadExpandableButtonVisible: textNumberOfLines > DEFAULT_NUMBER_OF_LINES,
    onPressReadExpandable: handleColapseText,
    expandableReadButtonText,
    onTextLayout: handleOnLayout,
    numberOfLines,
  };
};
