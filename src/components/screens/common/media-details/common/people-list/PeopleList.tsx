import React from 'react';

import {FlatListSection, Section} from '@components';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import {usePeopleList, PeopleListItemType} from './usePeopleList';
import {PeopleListItem} from './people-list-item/PeopleListItem';

export type PressItemParams = {
  id: string;
  name: string;
  image: string;
};

export type Type = 'cast' | 'crew' | 'creator';

type PeopleListProps = {
  onPressItem: (params: PressItemParams) => void;
  dataset:
    | Types.CrewDataset
    | Types.CastDataset
    | SchemaTypes.TVShowDetail_tvShow_createdBy[];
  type: Type;
  sectionTitle: string;
};

export const PeopleList = (props: PeopleListProps) => {
  const peopleList = usePeopleList({dataset: props.dataset, type: props.type});

  return (
    <Section title={props.sectionTitle}>
      <FlatListSection
        showsHorizontalScrollIndicator={false}
        testID={`people-list-${props.type}`}
        data={peopleList.items}
        horizontal
        renderItem={({item, index}) => {
          const peopleListItem = item as PeopleListItemType;
          return (
            <PeopleListItem
              onPress={() =>
                props.onPressItem({
                  id: peopleListItem.id,
                  name: peopleListItem.name,
                  image: peopleListItem.image,
                })
              }
              withSubtext={props.type !== 'creator'}
              key={`${peopleListItem.id}-${index}`}
              subText={peopleListItem.subText}
              image={peopleListItem.image}
              name={peopleListItem.name}
              type={props.type}
            />
          );
        }}
      />
    </Section>
  );
};
