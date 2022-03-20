import React from 'react';
import {useTranslation} from 'react-i18next';

import {formatCurrency, formatDate} from '@utils';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import GeneralInfo from '../../common/sections/general-info/GeneralInfo';

type DetailsSection = {
  // eslint-disable-next-line camelcase
  movie: SchemaTypes.MovieDetail_movie;
};

const DetailsSection = ({movie}: DetailsSection) => {
  const {t} = useTranslation();

  return (
    <GeneralInfo
      infoItems={[
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE),
          value: movie.originalTitle || '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_RELEASE_DATE),
          value: formatDate(movie.releaseDate),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_BUDGET),
          value: formatCurrency(movie.budget),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_REVENUE),
          value: formatCurrency(movie.revenue),
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES),
          value: movie.productionCountries.length
            ? movie.productionCountries.join(', ')
            : '-',
        },
        {
          title: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES),
          value: movie.spokenLanguages.length
            ? movie.spokenLanguages.join(', ')
            : '-',
        },
      ]}
    />
  );
};

export default DetailsSection;
