import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import metrics from '@styles/metrics';

import {SeasonsDetailsParams} from '../../../routes/route-params-types';

export const useSeasonsDetailsTabs = (props: SeasonsDetailsParams) => {
  const translations = useTranslations();

  const tabItemWidth = useMemo(() => {
    if (props.numberOfSeasons === 2) {
      return metrics.width / 2;
    }
    return metrics.width / 3;
  }, [props.numberOfSeasons]);

  const texts = useMemo(
    () => ({
      tabBarLabel: translations.translate(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON,
      ),
    }),
    [translations],
  );

  return {
    tabItemWidth,
    texts,
  };
};
