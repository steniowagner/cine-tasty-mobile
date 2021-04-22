/* eslint-disable camelcase */
import React from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import Section from '@components/common/section/Section';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

type SimilarSectionProps = {
  onPressItem: (similar: SchemaTypes.MovieDetail_movie_similar) => void;
  movie: SchemaTypes.MovieDetail_movie;
};

const SimilarSection = ({ onPressItem, movie }: SimilarSectionProps) => {
  const { t } = useTranslation();

  return (
    <Section
      title={
        movie.similar.length
          ? t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)
          : `${t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_SIMILAR)} (0)`
      }
    >
      <FlatList
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <SimplifiedMediaListItem
            onPress={() => onPressItem(item)}
            voteAverage={item.voteAverage}
            voteCount={item.voteCount}
            image={item.posterPath}
            isFirst={index === 0}
            title={item.title}
          />
        )}
        showsHorizontalScrollIndicator={false}
        data={movie.similar}
        horizontal
      />
    </Section>
  );
};

export default SimilarSection;
