import React from 'react';

import {SimplifiedMediaListItem, Section} from '@components';

import {FlatListSection} from '../scrollable-section/ScrollableSection.styles';
import {
  UseMediaHorizontalListProps,
  useMediaHorizontalList,
  MediaItem,
} from './useMediaHorizontalList';

type MediaHorizontalListProps = UseMediaHorizontalListProps & {
  title: string;
};

export const MediaHorizontalList = (props: MediaHorizontalListProps) => {
  const mediaHorizontalList = useMediaHorizontalList(props);

  return (
    <Section title={props.title}>
      <FlatListSection
        showsHorizontalScrollIndicator={false}
        data={mediaHorizontalList.dataset}
        renderItem={({item}) => {
          const mediaItem = item as MediaItem;
          return (
            <SimplifiedMediaListItem
              onPress={() => mediaHorizontalList.onPressItem(mediaItem)}
              voteAverage={mediaItem.voteAverage}
              voteCount={mediaItem.voteCount}
              image={mediaItem.posterPath}
              title={mediaItem.title}
              key={mediaItem.id}
            />
          );
        }}
        testID={`media-horizontal-list-${props.type}`}
        horizontal
      />
    </Section>
  );
};
