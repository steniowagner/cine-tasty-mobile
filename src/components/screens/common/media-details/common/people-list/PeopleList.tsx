import React from 'react';

import {ScrollViewSection, FlatListSection, Section} from '@components';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import {usePeopleList, PeopleListItemType} from './usePeopleList';
import {PeopleListItem} from './people-list-item/PeopleListItem';

export type PressItemParams = {
  id: string;
  name: string;
  image: string;
};

type PeopleListProps = {
  onPressItem: (params: PressItemParams) => void;
  dataset:
    | Types.CrewDataset
    | Types.CastDataset
    | SchemaTypes.TVShowDetail_tvShow_createdBy[];
  type: 'cast' | 'crew' | 'creator';
  sectionTitle: string;
};

export const LIST_BATCH_ITEMS_COUNT = 25;

export const PeopleList = (props: PeopleListProps) => {
  const peopleList = usePeopleList({dataset: props.dataset, type: props.type});

  if (props.dataset.length <= LIST_BATCH_ITEMS_COUNT) {
    return (
      <Section title={props.sectionTitle}>
        <ScrollViewSection
          showsHorizontalScrollIndicator={false}
          horizontal
          testID={`people-list-${props.type}`}>
          {peopleList.items.map((item, index) => (
            <PeopleListItem
              onPress={() =>
                props.onPressItem({
                  id: item.id,
                  name: item.name,
                  image: item.image,
                })
              }
              withSubtext={props.type !== 'creator'}
              key={`${item.id}-${index}`}
              subText={item.subText}
              image={item.image}
              name={item.name}
              type={props.type}
            />
          ))}
        </ScrollViewSection>
      </Section>
    );
  }

  return (
    <Section title={props.sectionTitle}>
      <FlatListSection
        showsHorizontalScrollIndicator={false}
        testID={`people-list-${props.type}`}
        data={peopleList.items}
        horizontal
        initialNumToRender={LIST_BATCH_ITEMS_COUNT}
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
