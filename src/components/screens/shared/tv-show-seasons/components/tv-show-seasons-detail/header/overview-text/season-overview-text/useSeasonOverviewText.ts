import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {TVShowSeasonsNavigationProp} from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

export const MAX_NUMBER_LINES = 5;

const INITIAL_STATE: InternalState = {
  shouldShowReadMoreButton: undefined,
  numberOfLines: undefined,
};

type InternalState = {
  shouldShowReadMoreButton: boolean | undefined;
  numberOfLines: number | undefined;
};

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
  const [state, setState] = useState<InternalState>(INITIAL_STATE);

  const navigation = useNavigation<TVShowSeasonsNavigationProp>();
  const {t} = useTranslation();

  const onGetTextLayout = useCallback(
    (linesLength: number) => {
      if (state.numberOfLines) {
        return;
      }

      const shouldShowReadMoreButton = linesLength > MAX_NUMBER_LINES;
      const numberOfLines = shouldShowReadMoreButton
        ? MAX_NUMBER_LINES
        : linesLength;

      setState({
        shouldShowReadMoreButton,
        numberOfLines,
      });
    },
    [state.numberOfLines],
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
  }, [metrics.getHeightFromDP, state.numberOfLines]);

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
  }, [tvShowTitle, overview, season, modalHeight]);

  return {
    readMoreButtonText: t(
      TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW,
    ),
    shouldShowReadMoreButton: state.shouldShowReadMoreButton,
    numberOfLines: state.numberOfLines,
    onPressReadMore,
    onGetTextLayout,
  };
};

export default useSeasonOverviewText;
