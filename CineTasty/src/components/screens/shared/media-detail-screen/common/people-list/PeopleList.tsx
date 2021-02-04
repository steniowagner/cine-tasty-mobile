import React from 'react';
import { FlatList } from 'react-native';

import { TVShowDetail_tvShow_createdBy as TVShowCreatedBy } from 'types/schema';
import { CrewDataset, CastDataset } from 'types';
import Section from 'components/common/Section';

import PeopleListItem from './PeopleListItem';
import usePeopleList from './usePeopleList';

type Props = {
  onPressItem: (id: string, name: string, image: string) => void;
  dataset: CrewDataset | CastDataset | TVShowCreatedBy[];
  type: 'cast' | 'crew' | 'creator';
  sectionTitle: string;
  noSubtext?: boolean;
};

const PeopleList = ({
  sectionTitle, onPressItem, noSubtext, dataset, type,
}: Props) => {
  const { items } = usePeopleList({ dataset, type });

  return (
    <Section
      title={sectionTitle}
    >
      <FlatList
        keyExtractor={({ id }, index) => `${id}-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <PeopleListItem
            onPress={() => onPressItem(item.id, item.name, item.image)}
            withSubtext={noSubtext}
            subText={item.subText}
            isFirst={index === 0}
            image={item.image}
            name={item.name}
            type={type}
          />
        )}
        testID={`people-list-${type}`}
        data={items}
        horizontal
      />
    </Section>
  );
};

export default PeopleList;
