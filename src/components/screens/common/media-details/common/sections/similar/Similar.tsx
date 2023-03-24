import React from 'react';

import {SimplifiedMediaListItem, ScrollViewSection, Section} from '@components';

import {useSimilar, ParsedSimilar, Similar as SimilarType} from './useSimilar';

type SimilarSectionProps = {
  onPressItem: (similar: ParsedSimilar) => void;
  similar: SimilarType[];
};

export const Similar = (props: SimilarSectionProps) => {
  const similar = useSimilar({similar: props.similar});

  return (
    <Section title={similar.texts.section}>
      <ScrollViewSection
        showsHorizontalScrollIndicator={false}
        horizontal
        testID="similar-list">
        {similar.dataset.map(similarItem => (
          <SimplifiedMediaListItem
            onPress={() => props.onPressItem(similarItem)}
            voteAverage={similarItem.voteAverage}
            voteCount={similarItem.voteCount}
            image={similarItem.posterPath}
            key={similarItem.id}
            title={similarItem.title}
          />
        ))}
      </ScrollViewSection>
    </Section>
  );
};
