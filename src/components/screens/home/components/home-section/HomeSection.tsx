import React from 'react';

import * as Types from '@local-types';
import {
  SimplifiedMediaListItem,
  SectionViewAll,
  FlatListSection,
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
      renderItem={({item}) => {
        const simplifiedMediaListItem = item as Types.SimplifiedMedia;
        return (
          <SimplifiedMediaListItem
            onPress={() => props.onPressItem(simplifiedMediaListItem)}
            voteAverage={simplifiedMediaListItem.voteAverage}
            voteCount={simplifiedMediaListItem.voteCount}
            image={simplifiedMediaListItem.posterPath}
            title={simplifiedMediaListItem.title}
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
