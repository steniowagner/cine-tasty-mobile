import React from 'react';
import {useMemo} from 'react';
import {SvgCssUri} from 'react-native-svg';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import {CONSTANTS} from '@utils';
import metrics from '@styles/metrics';

export const useSupportLinks = () => {
  const translations = useTranslations();

  const items = useMemo(
    () => [
      {
        description: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_GITHUB_DESCRIPTION,
        ),
        title: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_GITHUB_TITLE,
        ),
        buttonText: 'steniowagner/cine-tasty',
        url: CONSTANTS.VALUES.LINKS.GITHUB_REPOSITORY,
        icon: 'github',
      },
      {
        description: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_TMDB_DESCRIPTION,
        ),
        title: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_TMDB_TITLE,
        ),
        buttonText: 'TMDB Api',
        url: CONSTANTS.VALUES.LINKS.TMBD,
        icon: 'video-vintage',
        IconComponent: (
          <SvgCssUri
            width={metrics.getWidthFromDP('50%')}
            height={metrics.getWidthFromDP('50%')}
            uri={CONSTANTS.VALUES.LINKS.TMDB_LOGO}
          />
        ),
      },
      {
        description: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_DESCRIPTION,
        ),
        title: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_TITLE,
        ),
        buttonText: 'OpenTriviaDB API',
        url: CONSTANTS.VALUES.LINKS.OPEN_TRIVIA_API,
        icon: 'quiz-active',
      },
      {
        description: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_NEWS_API_DESCRIPTION,
        ),
        title: translations.translate(
          Translations.Tags.SETTINGS_OPEN_SOURCE_NEWS_API_TITLE,
        ),
        buttonText: 'News API',
        url: CONSTANTS.VALUES.LINKS.NEWS_API,
        icon: 'news-active',
      },
    ],
    [],
  );

  return {
    items,
  };
};
