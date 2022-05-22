import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {TVShowSeasonsNavigationProp} from '@src/components/screens/common/tv-show-seasons/routes/route-params-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import metrics from '@styles/metrics';

export const MAX_NUMBER_LINES = 5;

type UseSeasonOverviewTextProps = {
  overview: string;
  season: number;
};

export const useSeasonOverviewText = (props: UseSeasonOverviewTextProps) => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>();
  const [shouldShowReadMoreButton, setShouldShowReadMoreButton] =
    useState(false);

  const navigation = useNavigation<TVShowSeasonsNavigationProp>();
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

  const modalHeight = useMemo(() => {
    if (!props.overview) {
      return 0;
    }
    const overviewAverageNumLines = Math.floor(props.overview.length / 50);
    if (overviewAverageNumLines < 10) {
      return metrics.getHeightFromDP('50%');
    }
    return metrics.getHeightFromDP('70%');
  }, [props.overview]);

  const texts = useMemo(
    () => ({
      readMoreButtonText: translations.translate(
        Translations.Tags
          .MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
      ),
    }),
    [translations.translate, props.season],
  );

  const onPressReadMore = useCallback(() => {
    console.warn('todo');
  }, [texts, props.overview, modalHeight, navigation]);

  return {
    readMoreButtonText: texts.readMoreButtonText,
    shouldShowReadMoreButton,
    onPressReadMore,
    onGetTextLayout,
    numberOfLines,
  };
};
