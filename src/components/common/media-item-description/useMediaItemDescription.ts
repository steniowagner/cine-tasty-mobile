import {useCallback, useMemo, useState} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

export const DEFAULT_NUMBER_OF_LINES = 5;

const useMediaItemDescription = () => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>();
  const [textNumberOfLines, setTextNumberOfLines] = useState(0);

  const translations = useTranslations();

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
      return translations.translate(
        translations.translate(Translations.Tags.FAMOUS_DETAIL_READ_MORE),
      );
    }
    return translations.translate(
      translations.translate(Translations.Tags.FAMOUS_DETAIL_READ_LESS),
    );
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
