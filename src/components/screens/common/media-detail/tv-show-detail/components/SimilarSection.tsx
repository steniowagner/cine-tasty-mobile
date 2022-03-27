/* eslint-disable camelcase */
import React from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import {SimplifiedMediaListItem, Section} from '@components';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

type SimilarSectionProps = {
  onPressItem: (similar: SchemaTypes.TVShowDetail_tvShow_similar) => void;
  tvShow: SchemaTypes.TVShowDetail_tvShow;
};

const SimilarSection = ({onPressItem, tvShow}: SimilarSectionProps) => {
  const {t} = useTranslation();

  return (
    <Section
      title={
        tvShow?.similar.length
          ? t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)
          : `${t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)} (0)`
      }>
      <FlatList
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item, index}) => (
          <SimplifiedMediaListItem
            onPress={() => onPressItem(item)}
            voteAverage={item.voteAverage}
            voteCount={item.voteCount}
            image={item.posterPath}
            isFirst={index === 0}
            title={item.name}
          />
        )}
        showsHorizontalScrollIndicator={false}
        data={tvShow.similar}
        horizontal
      />
    </Section>
  );
};

export default SimilarSection;