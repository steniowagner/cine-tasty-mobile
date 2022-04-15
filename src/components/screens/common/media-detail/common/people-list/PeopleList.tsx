import React from 'react';
import {FlatList} from 'react-native';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import {Section} from '@components';

import {PeopleListItem} from './people-list-item/PeopleListItem';
import usePeopleList from './usePeopleList';

type PeopleListProps = {
  onPressItem: (id: string, name: string, image: string) => void;
  dataset:
    | Types.CrewDataset
    | Types.CastDataset
    | SchemaTypes.TVShowDetail_tvShow_createdBy[];
  type: 'cast' | 'crew' | 'creator';
  sectionTitle: string;
  noSubtext?: boolean;
};

const PeopleList = ({
  sectionTitle,
  onPressItem,
  noSubtext,
  dataset,
  type,
}: PeopleListProps) => {
  const {items} = usePeopleList({dataset, type});

  return (
    <Section title={sectionTitle}>
      <FlatList
        keyExtractor={({id}, index) => `${id}-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({index, item}) => (
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
