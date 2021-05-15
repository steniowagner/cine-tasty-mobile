import React from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@utils/formatters';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import GeneralInfo from '../../common/sections/general-info/GeneralInfo';

type TVShowDetailsSectionProps = {
  // eslint-disable-next-line camelcase
  tvShow: SchemaTypes.TVShowDetail_tvShow;
};

const TVShowDetailsSection = (props: TVShowDetailsSectionProps) => {
  const { t } = useTranslation();

  return (
    <GeneralInfo
      infoItems={[
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE),
          value: props.tvShow.name || '-',
        },
        {
          value: props.tvShow.originalLanguage,
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES),
          value: props.tvShow.numberOfEpisodes
            ? String(props.tvShow.numberOfEpisodes)
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS),
          value: props.tvShow.numberOfSeasons
            ? String(props.tvShow.numberOfSeasons)
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME),
          value: props.tvShow.episodeRunTime.length
            ? props.tvShow.episodeRunTime.join(', ')
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY),
          value: props.tvShow.originCountry ? props.tvShow.originCountry.join(', ') : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE),
          value: formatDate(props.tvShow.firstAirDate),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE),
          value: formatDate(props.tvShow.lastAirDate),
        },
      ]}
    />
  );
};

export default TVShowDetailsSection;
