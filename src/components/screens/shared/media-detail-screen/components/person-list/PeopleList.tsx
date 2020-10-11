import React from 'react';
import { FlatList } from 'react-native';

import { CrewDataset, CastDataset } from 'types';
import Section from 'components/common/Section';

import PeopleListItem from './PeopleListItem';
import usePeopleList from './usePeopleList';

type Props = {
  dataset: CrewDataset | CastDataset;
  onPressItem: (id: string) => void;
  type: 'cast' | 'crew';
  sectionTitle: string;
};

const PeopleList = ({
  sectionTitle, onPressItem, dataset, type,
}: Props) => {
  const { items } = usePeopleList({ dataset, type });

  return (
    <Section
      title={sectionTitle}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <PeopleListItem
            image={`https://image.tmdb.org/t/p/w780${item.image}`}
            onPress={() => onPressItem(item.id)}
            subText={item.subText}
            isFirst={index === 0}
            name={item.name}
          />
        )}
        keyExtractor={({ id }) => id}
        testID="people-list"
        data={items}
        horizontal
      />
    </Section>
  );
};

export default PeopleList;
