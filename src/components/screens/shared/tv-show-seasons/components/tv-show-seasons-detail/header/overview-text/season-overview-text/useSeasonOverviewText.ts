import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {TVShowSeasonsNavigationProp} from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

export const MAX_NUMBER_LINES = 5;

type UseSeasonOverviewTextProps = {
  tvShowTitle: string;
  overview: string;
  season: number;
};

const useSeasonOverviewText = ({
  tvShowTitle,
  overview,
  season,
}: UseSeasonOverviewTextProps) => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>();
  const [shouldShowReadMoreButton, setShouldShowReadMoreButton] =
    useState(false);

  const navigation = useNavigation<TVShowSeasonsNavigationProp>();
  const {t} = useTranslation();

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
    if (!overview) {
      return 0;
    }

    const overviewAverageNumLines = Math.floor(overview.length / 50);

    if (overviewAverageNumLines < 10) {
      return metrics.getHeightFromDP('50%');
    }

    return metrics.getHeightFromDP('70%');
  }, [overview]);

  const onPressReadMore = useCallback(() => {
    const headerText = `${tvShowTitle}\n${t(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON,
    )} ${season}`;

    navigation.navigate(Routes.CustomModal.CUSTOM_MODAL_STACK, {
      type: Types.CustomizedModalChildrenType.TV_SHOW_READ_MORE_DETAILS,
      modalHeight,
      extraData: {
        dataset: [
          {
            overview,
          },
        ],
      },
      headerText,
    });
  }, [tvShowTitle, overview, season, modalHeight, navigation, t]);

  return {
    readMoreButtonText: t(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
    ),
    shouldShowReadMoreButton,
    onPressReadMore,
    onGetTextLayout,
    numberOfLines,
  };
};

export default useSeasonOverviewText;
