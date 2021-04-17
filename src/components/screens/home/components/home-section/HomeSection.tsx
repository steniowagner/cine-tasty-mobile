import React from 'react';
import { FlatList } from 'react-native';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import SectionViewAll from '@components/common/section-view-all/SectionViewAll';
import * as Types from '@local-types';

import * as Styles from './HomeSection.styles';

type Props = {
  onPressItem: (mediaItem: Types.SimplifiedMedia) => void;
  onPressViewAll: () => void;
  items: Types.SimplifiedMedia[];
  sectionTitle: string;
};

const HomeSection = ({
  onPressViewAll, sectionTitle, onPressItem, items,
}: Props) => (
  <Styles.Wrapper
    testID="section-wrapper"
  >
    <SectionViewAll
      onPressViewAll={onPressViewAll}
      sectionTitle={sectionTitle}
      id={sectionTitle}
    />
    <FlatList
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
      keyExtractor={(item, index) => `${item.id}-${index}`}
      testID={`home-section-${sectionTitle}`}
      showsHorizontalScrollIndicator={false}
      data={items}
      horizontal
    />
  </Styles.Wrapper>
);

export default HomeSection;
