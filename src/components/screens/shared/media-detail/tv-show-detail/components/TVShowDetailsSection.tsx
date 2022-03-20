import React from 'react';
import {useTranslation} from 'react-i18next';

import {formatDate} from '@utils';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import GeneralInfo from '../../common/sections/general-info/GeneralInfo';

type TVShowDetailsSectionProps = {
  // eslint-disable-next-line camelcase
  tvShow: SchemaTypes.TVShowDetail_tvShow;
};

const TVShowDetailsSection = ({tvShow}: TVShowDetailsSectionProps) => {
  const {t} = useTranslation();

  return (
    <GeneralInfo
      infoItems={[
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE),
          value: tvShow.name || '-',
        },
        {
          value: tvShow.originalLanguage,
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES),
          value: tvShow.numberOfEpisodes
            ? String(tvShow.numberOfEpisodes)
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS),
          value: tvShow.numberOfSeasons ? String(tvShow.numberOfSeasons) : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME),
          value: tvShow.episodeRunTime.length
            ? tvShow.episodeRunTime.join(', ')
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY),
          value: tvShow.originCountry ? tvShow.originCountry.join(', ') : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE),
          value: formatDate(tvShow.firstAirDate),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE),
          value: formatDate(tvShow.lastAirDate),
        },
      ]}
    />
  );
};

export default TVShowDetailsSection;
