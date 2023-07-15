import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgCssUri } from 'react-native-svg';

import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

const useOpenSource = () => {
  const { t } = useTranslation();

  const items = useMemo(
    () => [
      {
        description: t(TRANSLATIONS.OPEN_SOURCE_GITHUB_DESCRIPTION),
        title: t(TRANSLATIONS.OPEN_SOURCE_GITHUB_TITLE),
        buttonText: 'steniowagner/cine-tasty',
        url: 'https://github.com/steniowagner/cine-tasty-mobile',
        icon: 'github',
      },
      {
        description: t(TRANSLATIONS.OPEN_SOURCE_TMDB_DESCRIPTION),
        title: t(TRANSLATIONS.OPEN_SOURCE_TMDB_TITLE),
        buttonText: 'TMDB Api',
        url: 'https://www.themoviedb.org/',
        icon: 'video-vintage',
        IconComponent: (
          <SvgCssUri
            width={metrics.getWidthFromDP('50%')}
            height={metrics.getWidthFromDP('50%')}
            uri="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          />
        ),
      },

      {
        description: t(TRANSLATIONS.OPEN_SOURCE_OPEN_TRIVIA_API_DESCRIPTION),
        title: t(TRANSLATIONS.OPEN_SOURCE_OPEN_TRIVIA_API_TITLE),
        buttonText: 'OpenTriviaDB API',
        url: 'https://opentdb.com/',
        icon: 'quiz-active',
      },
      {
        description: t(TRANSLATIONS.OPEN_SOURCE_NEWS_API_DESCRIPTION),
        title: t(TRANSLATIONS.OPEN_SOURCE_NEWS_API_TITLE),
        buttonText: 'News API',
        url: 'https://newsapi.org/',
        icon: 'news-active',
      },
    ],
    [],
  );

  return {
    items,
  };
};

export default useOpenSource;
