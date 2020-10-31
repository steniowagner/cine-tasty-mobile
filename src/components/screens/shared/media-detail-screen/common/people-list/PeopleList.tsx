import React from 'react';
import { FlatList } from 'react-native';

import { CrewDataset, CastDataset } from 'types';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';

import PeopleListItem from './PeopleListItem';
import usePeopleList from './usePeopleList';

type Props = {
  onPressItem: (id: string, name: string, image: string) => void;
  dataset: CrewDataset | CastDataset;
  type: 'cast' | 'crew' | 'creator';
  sectionTitle: string;
  noSubtext?: boolean;
};

const PERSON_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

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
            image={`${PERSON_IMAGE_URI}${item.image}`}
            onPress={() => onPressItem(item.id, item.name, item.image)}
            withSubtext={noSubtext}
            subText={item.subText}
            isFirst={index === 0}
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
