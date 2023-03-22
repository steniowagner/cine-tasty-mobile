import {useCallback, useMemo, useState} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const MAX_NUMBER_LINES = 5;

type UseSeasonOverviewTextProps = {
  openSeasonOverviewDetailsModal: () => void;
  overview: string;
  season: number;
};

export const useSeasonOverviewText = (props: UseSeasonOverviewTextProps) => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>();
  const [shouldShowReadMoreButton, setShouldShowReadMoreButton] =
    useState(false);

  const translations = useTranslations();

  const onGetTextLayout = useCallback(
    (linesLength: number) => {
      if (numberOfLines) {
        return;
      }
      const hasTooMuchLines = linesLength > MAX_NUMBER_LINES;
      setShouldShowReadMoreButton(hasTooMuchLines);
      const linesCount = hasTooMuchLines ? MAX_NUMBER_LINES : linesLength;
      setNumberOfLines(linesCount);
    },
    [numberOfLines],
  );

  const texts = useMemo(
    () => ({
      readMoreButtonText: translations.translate(
        Translations.Tags
          .MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
      ),
    }),
    [translations.translate, props.season],
  );

  return {
    readMoreButtonText: texts.readMoreButtonText,
    shouldShowReadMoreButton,
    onGetTextLayout,
    numberOfLines,
  };
};
