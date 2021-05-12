import React from 'react';

import StarsVotes from '@components/common/stars-votes/StarsVotes';

import * as Styles from './FullMediaListItem.styles';
import MediaImage from './media-image/MediaImage';

type FullMediaListItemProps = {
  onPressDetails: () => void;
  voteCount?: number;
  genres: string[];
  image: string;
  title: string;
  votes: number;
};

const FullMediaListItem = (props: FullMediaListItemProps) => (
  <Styles.Wrapper
    onPress={props.onPressDetails}
    testID="full-media-list-item"
  >
    <MediaImage
      image={props.image}
    />
    <Styles.TextContentWrapper>
      <Styles.TitleText>{props.title}</Styles.TitleText>
      <StarsVotes
        votes={props.votes}
        withText
        voteCount={props.voteCount}
      />
      <Styles.GenresText>{props.genres?.join('  \u2022  ')}</Styles.GenresText>
    </Styles.TextContentWrapper>
  </Styles.Wrapper>
);

export default FullMediaListItem;
