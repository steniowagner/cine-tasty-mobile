import React from 'react';

import * as Types from '@local-types';
import {
  MediaListItem,
  SectionViewAll,
  FlatListSection,
  MediaListItemSeparator,
} from '@components';

import * as Styles from './HomeSection.styles';

type HomeSectionProps = {
  onPressItem: (mediaItem: Types.SimplifiedMedia) => void;
  onPressViewAll: () => void;
  items: Types.SimplifiedMedia[];
  sectionTitle: string;
  id: string;
};

export const HomeSection = (props: HomeSectionProps) => (
  <Styles.Wrapper testID="section-wrapper">
    <SectionViewAll
      onPressViewAll={props.onPressViewAll}
      sectionTitle={props.sectionTitle}
      id={props.id}
    />
    <FlatListSection
      ItemSeparatorComponent={MediaListItemSeparator}
      ListFooterComponent={MediaListItemSeparator}
      renderItem={({item}) => {
        const mediaListItem = item as Types.SimplifiedMedia;
        return (
          <MediaListItem
            layoutSize="large"
            onPress={() => props.onPressItem(mediaListItem)}
            voteAverage={mediaListItem.voteAverage}
            voteCount={mediaListItem.voteCount}
            image={mediaListItem.posterPath}
            title={mediaListItem.title}
            testID={props.sectionTitle}
          />
        );
      }}
      keyExtractor={(item, index) =>
        `${(item as Types.SimplifiedMedia).id}-${index}`
      }
      testID={`home-section-${props.sectionTitle}`}
      showsHorizontalScrollIndicator={false}
      data={props.items}
      horizontal
    />
  </Styles.Wrapper>
);
