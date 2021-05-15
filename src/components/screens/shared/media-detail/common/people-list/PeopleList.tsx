/* eslint-disable camelcase */
import React from 'react';
import { FlatList } from 'react-native';

import Section from '@components/common/section/Section';
import * as SchemaTypes from '@schema-types';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

import PeopleListItem from './people-list-item/PeopleListItem';
import usePeopleList from './usePeopleList';

type PeopleListProps = {
  onPressItem: (id: string, name: string, image: string) => void;
  dataset:
    | Types.CrewDataset
    | Types.CastDataset
    | SchemaTypes.TVShowDetail_tvShow_createdBy[];
  type: 'cast' | 'crew' | 'creator';
  sectionTitle: string;
  withSubtext: boolean;
};

const PeopleList = (props: PeopleListProps) => {
  const peopleList = usePeopleList({ dataset: props.dataset, type: props.type });

  return (
    <Section
      title={props.sectionTitle}
    >
      <FlatList
        keyExtractor={({ id }, index) => `${id}-${index}`}
        contentContainerStyle={{
          paddingHorizontal: CONSTANTS.VALUES.DEFAULT_SPACING,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <PeopleListItem
            onPress={() => props.onPressItem(item.id, item.name, item.image)}
            withSubtext={props.withSubtext}
            subText={item.subText}
            isFirst={index === 0}
            image={item.image}
            name={item.name}
            type={props.type}
          />
        )}
        testID={`people-list-${props.type}`}
        data={peopleList.items}
        horizontal
      />
    </Section>
  );
};

export default PeopleList;
