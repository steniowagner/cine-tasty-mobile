import React from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import {ScrollViewSection, Section} from '@components';

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
};

export const PeopleList = (props: PeopleListProps) => {
  const peopleList = usePeopleList({dataset: props.dataset, type: props.type});
  return (
    <Section title={props.sectionTitle}>
      <ScrollViewSection
        showsHorizontalScrollIndicator={false}
        testID={`people-list-${props.type}`}
        horizontal>
        {peopleList.items.map((peopleListItem, index) => (
          <PeopleListItem
            onPress={() =>
              props.onPressItem(
                peopleListItem.id,
                peopleListItem.name,
                peopleListItem.image,
              )
            }
            withSubtext={props.type !== 'creator'}
            key={`${peopleListItem.id}-${index}`}
            subText={peopleListItem.subText}
            image={peopleListItem.image}
            name={peopleListItem.name}
            type={props.type}
          />
        ))}
      </ScrollViewSection>
    </Section>
  );
};
