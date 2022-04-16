import React from 'react';

import {SimplifiedMediaListItem, Section} from '@components';

import {ScrollViewSection} from '..';
import {
  UseMediaHorizontalListProps,
  useMediaHorizontalList,
} from './useMediaHorizontalList';

type MediaHorizontalListProps = UseMediaHorizontalListProps & {
  title: string;
};

export const MediaHorizontalList = (props: MediaHorizontalListProps) => {
  const mediaHorizontalList = useMediaHorizontalList(props);
  return (
    <Section title={props.title}>
      <ScrollViewSection
        showsHorizontalScrollIndicator={false}
        testID={`media-horizontal-list-${props.type}`}
        horizontal>
        {mediaHorizontalList.dataset.map(item => (
          <SimplifiedMediaListItem
            onPress={() => mediaHorizontalList.handlePressItem(item)}
            voteAverage={item.voteAverage}
            voteCount={item.voteCount}
            image={item.posterPath}
            title={item.title}
            key={item.id}
          />
        ))}
      </ScrollViewSection>
    </Section>
  );
};
