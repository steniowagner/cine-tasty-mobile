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

const FullMediaListItem = ({
  onPressDetails,
  genres = [],
  voteCount,
  image,
  title,
  votes,
}: FullMediaListItemProps) => (
  <Styles.Wrapper
    onPress={onPressDetails}
    testID="full-media-list-item"
  >
    <MediaImage
      image={image}
    />
    <Styles.TextContentWrapper>
      <Styles.TitleText>{title}</Styles.TitleText>
      <StarsVotes
        votes={votes}
        withText
        voteCount={voteCount}
      />
      <Styles.GenresText>{genres.join('  \u2022  ')}</Styles.GenresText>
    </Styles.TextContentWrapper>
  </Styles.Wrapper>
);

export default FullMediaListItem;
