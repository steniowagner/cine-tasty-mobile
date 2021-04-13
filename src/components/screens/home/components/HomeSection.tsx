import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import SectionViewAll from '@components/common/SectionViewAll';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

export const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
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
  onPressItem: (mediaItem: Types.SimplifiedMedia) => void;
  onPressViewAll: () => void;
  items: Types.SimplifiedMedia[];
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
  </Wrapper>
);

export default HomeSection;
