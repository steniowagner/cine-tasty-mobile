import React from 'react';
import { FlatList } from 'react-native';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import SectionViewAll from '@components/common/section-view-all/SectionViewAll';
import * as Types from '@local-types';

import * as Styles from './HomeSection.styles';

type HomeSectionProps = {
  onPressItem: (mediaItem: Types.SimplifiedMedia) => void;
  items: Types.SimplifiedMedia[];
  onPressViewAll: () => void;
  sectionTitle: string;
};

const HomeSection = (props: HomeSectionProps) => (
  <Styles.Wrapper
    testID="section-wrapper"
  >
    <SectionViewAll
      onPressViewAll={props.onPressViewAll}
      sectionTitle={props.sectionTitle}
      id={props.sectionTitle}
      withViewAll
    />
    <FlatList
      renderItem={({ item, index }) => (
        <SimplifiedMediaListItem
          onPress={() => props.onPressItem(item)}
          voteAverage={item.voteAverage}
          voteCount={item.voteCount}
          image={item.posterPath}
          isFirst={index === 0}
          title={item.title}
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      testID={`home-section-${props.sectionTitle}`}
      showsHorizontalScrollIndicator={false}
      data={props.items}
      horizontal
    />
  </Styles.Wrapper>
);

export default HomeSection;
