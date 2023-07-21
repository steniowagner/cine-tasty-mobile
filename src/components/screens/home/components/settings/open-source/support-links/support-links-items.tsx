import React from 'react';
import {SvgCssUri} from 'react-native-svg';

import {Icons} from '@components';
import {Translations} from '@i18n/tags';
import {CONSTANTS} from '@utils';
import metrics from '@styles/metrics';

export const supportLinksItems = [
  {
    description: Translations.Tags.SETTINGS_OPEN_SOURCE_GITHUB_DESCRIPTION,
    title: Translations.Tags.SETTINGS_OPEN_SOURCE_GITHUB_TITLE,
    buttonText: 'steniowagner/cine-tasty',
    url: CONSTANTS.VALUES.LINKS.GITHUB_REPOSITORY,
    icon: 'github' as Icons,
  },
  {
    description:
      Translations.Tags.SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_DESCRIPTION,
    title: Translations.Tags.SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_TITLE,
    buttonText: 'OpenTriviaDB API',
    url: CONSTANTS.VALUES.LINKS.OPEN_TRIVIA_API,
    icon: 'quiz-active' as Icons,
  },
  {
    description: Translations.Tags.SETTINGS_OPEN_SOURCE_NEWS_API_DESCRIPTION,
    title: Translations.Tags.SETTINGS_OPEN_SOURCE_NEWS_API_TITLE,
    buttonText: 'News API',
    url: CONSTANTS.VALUES.LINKS.NEWS_API,
    icon: 'news-active' as Icons,
  },
  {
    description: Translations.Tags.SETTINGS_OPEN_SOURCE_TMDB_DESCRIPTION,
    title: Translations.Tags.SETTINGS_OPEN_SOURCE_TMDB_TITLE,
    buttonText: 'TMDB API',
    url: CONSTANTS.VALUES.LINKS.TMBD,
    icon: 'video-vintage' as Icons,
    IconComponent: (
      <SvgCssUri
        testID="tmdb-api-logo"
        width={metrics.getWidthFromDP('40%')}
        height={metrics.getWidthFromDP('40%')}
        uri={CONSTANTS.VALUES.LINKS.TMDB_LOGO}
      />
    ),
  },
];
