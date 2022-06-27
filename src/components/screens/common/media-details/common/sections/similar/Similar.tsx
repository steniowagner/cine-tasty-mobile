import React from 'react';

import {SimplifiedMediaListItem, ScrollViewSection, Section} from '@components';
import * as SchemaTypes from '@schema-types';

import {useSimilar} from './useSimilar';

type Similar =
  | SchemaTypes.MovieDetail_movie_similar
  | SchemaTypes.TVShowDetail_tvShow_similar;

type SimilarSectionProps = {
  onPressItem: (similar: Similar) => void;
  similar: Similar[];
};

export const Similar = (props: SimilarSectionProps) => {
  const similar = useSimilar({similarLength: props.similar.length});
  return (
    <Section title={similar.texts.section}>
      <ScrollViewSection
        showsHorizontalScrollIndicator={false}
        horizontal
        testID="similar-list">
        {props.similar.map(similarItem => {
          const title =
            similarItem.__typename === 'BaseMovie'
              ? similarItem.title
              : similarItem.name;
          return (
            <SimplifiedMediaListItem
              onPress={() => props.onPressItem(similarItem)}
              voteAverage={similarItem.voteAverage}
              voteCount={similarItem.voteCount}
              image={similarItem.posterPath}
              key={similarItem.id}
              title={title}
            />
          );
        })}
      </ScrollViewSection>
    </Section>
  );
};
