import React from 'react';

import { ParticipantListItem } from './participants-list-item/ParticipantsListItem';
import * as Styles from './ParticipantsList.styles';

type Participant = {
  subText?: string | null;
  image?: string | null;
  name?: string | null;
  id: number;
};

type ParticipantsListProps = {
  onPress: (participant: Participant) => void;
  participants: Participant[];
};

export const ParticipantsList = (props: ParticipantsListProps) => (
  <Styles.List
    data={props.participants}
    keyExtractor={item => `${item.id}`}
    testID="participants-list"
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
      <ParticipantListItem
        onPress={() => props.onPress(item)}
        subText={item.subText || ''}
        image={item.image || ''}
        name={item.name || '-'}
      />
    )}
  />
);
