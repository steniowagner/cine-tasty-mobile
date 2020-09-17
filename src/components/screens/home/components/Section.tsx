import React from 'react';
import {
  TouchableOpacity, FlatList, Text, View,
} from 'react-native';
import styled from 'styled-components';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';
import { SimplifiedMedia } from 'types';

const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const SectionTextContentWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const SectionTitle = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

const ViewAllWrapper = styled(TouchableOpacity)`
  padding-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.width}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ViewAllText = styled(Text)`
  margin-left: 12px;
  margin-right: -4px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: #262626;
`;

const ReloadIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: '#262626',
  name: 'chevron-right',
}))``;

type Props = {
  onPressItem: (id: number) => void;
  onPressViewAll: () => void;
  items: SimplifiedMedia[];
  sectionTitle: string;
};

const Section = ({
  onPressViewAll, sectionTitle, onPressItem, items,
}: Props) => (
  <Wrapper>
    <SectionTextContentWrapper>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <ViewAllWrapper
        onPress={onPressViewAll}
      >
        <ViewAllText>View all</ViewAllText>
        <ReloadIcon />
      </ViewAllWrapper>
    </SectionTextContentWrapper>
    <FlatList
      renderItem={({ item, index }) => (
        <SimplifiedMediaListItem
          onPress={() => onPressItem(item.id)}
          voteAverage={item.voteAverage}
          voteCount={item.voteCount}
          isFirst={index === 0}
          image={item.image}
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

export default Section;
