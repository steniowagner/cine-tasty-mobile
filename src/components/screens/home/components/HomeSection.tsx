import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import SectionViewAll from 'components/common/SectionViewAll';
import { SimplifiedMedia } from 'types';
import CONSTANTS from 'utils/constants';

export const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const SectionTextContentWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

type Props = {
  onPressItem: (mediaItem: SimplifiedMedia) => void;
  onPressViewAll: () => void;
  items: SimplifiedMedia[];
  sectionTitle: string;
};

const HomeSection = ({
  onPressViewAll, sectionTitle, onPressItem, items,
}: Props) => (
  <Wrapper
    testID="section-wrapper"
  >
    <SectionViewAll
      onPressViewAll={onPressViewAll}
      sectionTitle={sectionTitle}
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
      showsHorizontalScrollIndicator={false}
      data={items}
      testID="movies-cast"
      horizontal
    />
  </Wrapper>
);

export default HomeSection;
